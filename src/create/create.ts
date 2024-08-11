import * as yup from 'yup';
import * as AWS from 'aws-sdk';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { Personaje, personajeSchema } from './character';
import { convertToSpanish, isEnglishData } from './usecase';

// Create DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event: any) => {
  const requestBody = JSON.parse(event.body);

  try {
    // Determine if the data is in English
    const isEnglish = isEnglishData(requestBody);

    // Convert data to Spanish if necessary
    const dataInSpanish: Personaje = isEnglish
      ? convertToSpanish(requestBody)
      : requestBody;

    // Validate the data against the Yup schema
    const validatedData = await personajeSchema.validate(dataInSpanish, {
      abortEarly: false,
    });

    // Save the validated data to DynamoDB
    const params = {
      TableName: process.env.TABLE_NAME || 'personajes-table',
      Item: validatedData,
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Personaje creado.' }),
    };
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      const validationErrors = error.inner.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Errores de validación encontrados.',
          errors: validationErrors,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error interno del servidor.',
        error: error.message,
      }),
    };
  }
};
