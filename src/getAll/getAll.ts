import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const params = {
      TableName: process.env.TABLE_NAME || 'personajes-table',
    };

    const result = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Datos recuperados con éxito.',
        data: result.Items,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Error al recuperar los datos.',
        error: error.message,
      }),
    };
  }
};
