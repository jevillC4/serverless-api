import { handler } from '../getAll';
import * as AWS from 'aws-sdk';
import * as sinon from 'sinon';

describe('getAll function', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should successfully retrieve all data from DynamoDB', async () => {
    const scanStub = sandbox
      .stub(AWS.DynamoDB.DocumentClient.prototype, 'scan')
      .returns({
        promise: () =>
          Promise.resolve({
            Items: [{ nombre: 'Luke Skywalker' }],
          }),
      } as any);

    const response: any = await handler({} as any, {} as any, () => null);
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Datos recuperados con éxito.');
    expect(body.data.length).toBeGreaterThan(0);
    expect(scanStub.calledOnce).toBe(true);
  });

  it('should handle errors when retrieving data', async () => {
    const scanStub = sandbox
      .stub(AWS.DynamoDB.DocumentClient.prototype, 'scan')
      .returns({
        promise: () => Promise.reject(new Error('DynamoDB scan failed')),
      } as any);

    const response: any = await handler({} as any, {} as any, () => null);
    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Error al recuperar los datos.');
    expect(scanStub.calledOnce).toBe(true);
  });
});
