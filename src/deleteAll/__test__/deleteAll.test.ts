import { handler } from '../deleteAll';
import * as AWS from 'aws-sdk';
import * as sinon from 'sinon';

describe('deleteAll function', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should successfully delete all data from DynamoDB', async () => {
    const scanStub = sandbox
      .stub(AWS.DynamoDB.DocumentClient.prototype, 'scan')
      .returns({
        promise: () =>
          Promise.resolve({
            Items: [{ nombre: 'Luke Skywalker' }],
          }),
      } as any);

    const deleteStub = sandbox
      .stub(AWS.DynamoDB.DocumentClient.prototype, 'delete')
      .returns({
        promise: () => Promise.resolve({}),
      } as any);

    const response: any = await handler({} as any, {} as any, () => null);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe(
      'Todos los datos han sido eliminados con éxito.'
    );
    expect(scanStub.calledOnce).toBe(true);
    expect(deleteStub.called).toBe(true);
  });

  it('should handle errors when deleting data', async () => {
    const scanStub = sandbox
      .stub(AWS.DynamoDB.DocumentClient.prototype, 'scan')
      .returns({
        promise: () => Promise.reject(new Error('DynamoDB scan failed')),
      } as any);

    const response: any = await handler({} as any, {} as any, () => null);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toBe(
      'Error al eliminar los datos.'
    );
    expect(scanStub.calledOnce).toBe(true);
  });
});
