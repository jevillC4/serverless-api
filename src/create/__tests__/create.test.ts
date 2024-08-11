import { handler } from '../create';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as sinon from 'sinon';

describe('create function', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should successfully store data in DynamoDB', async () => {
    const putStub = sandbox
      .stub(AWS.DynamoDB.DocumentClient.prototype, 'put')
      .returns({
        promise: () => Promise.resolve({}),
      } as any);

    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.py4e.com/api/planets/1/',
        films: [
          'https://swapi.py4e.com/api/films/1/',
          'https://swapi.py4e.com/api/films/2/',
          'https://swapi.py4e.com/api/films/3/',
          'https://swapi.py4e.com/api/films/6/',
          'https://swapi.py4e.com/api/films/7/',
        ],
        species: ['https://swapi.py4e.com/api/species/1/'],
        vehicles: [
          'https://swapi.py4e.com/api/vehicles/14/',
          'https://swapi.py4e.com/api/vehicles/30/',
        ],
        starships: [
          'https://swapi.py4e.com/api/starships/12/',
          'https://swapi.py4e.com/api/starships/22/',
        ],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.py4e.com/api/people/1/',
      }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'POST',
      isBase64Encoded: false,
      path: '',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: '',
    };

    const context: Context = {} as any;

    const response: any = await handler(event, context, () => null);
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).message).toBe('Personaje creado.');
    expect(putStub.calledOnce).toBe(true);
  });

  it('should return validation errors', async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({
        altura: '172',
      }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'POST',
      isBase64Encoded: false,
      path: '',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: '',
    };

    const context: Context = {} as any;

    const response: any = await handler(event, context, () => null);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe(
      'Errores de validación encontrados.'
    );
  });
});
