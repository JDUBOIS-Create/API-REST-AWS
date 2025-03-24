import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" }); // Remplace par ta région

export const handler = async (event) => {
  const httpMethod = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : null;

  if (httpMethod === "POST") {
    const params = {
      TableName: "Users",
      Item: {
        userId: { S: body.userId },
        name: { S: body.name },
        email: { S: body.email },
      },
    };
    await client.send(new PutItemCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Utilisateur ajouté", user: body }),
    };
  } else if (httpMethod === "GET") {
    const userId = event.queryStringParameters?.userId; // Récupère userId des paramètres
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "userId requis dans les paramètres" }),
      };
    }
    const params = {
      TableName: "Users",
      Key: {
        userId: { S: userId },
      },
    };
    const result = await client.send(new GetItemCommand(params));
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Utilisateur non trouvé" }),
      };
    }
    const user = {
      userId: result.Item.userId.S,
      name: result.Item.name.S,
      email: result.Item.email.S,
    };
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Utilisateur trouvé", user }),
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Méthode non supportée" }),
  };
};