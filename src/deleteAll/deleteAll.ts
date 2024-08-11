import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const scanParams = {
      TableName: process.env.TABLE_NAME || 'personajes-table',
    };

    const scanResult = await dynamoDb.scan(scanParams).promise();

    if (scanResult.Items && scanResult.Items.length > 0) {
      const deletePromises = scanResult.Items.map((item) => {
        const deleteParams = {
          TableName: process.env.TABLE_NAME || 'personajes-table',
          Key: {
            nombre: item.nombre,
          },
        };
        return dynamoDb.delete(deleteParams).promise();
      });

      await Promise.all(deletePromises);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Todos los datos han sido eliminados con éxito.',
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al eliminar los datos.',
        error: error.message,
      }),
    };
  }
};
