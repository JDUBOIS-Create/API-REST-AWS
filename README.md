# Serverless Users API

Une API REST serverless construite avec AWS Lambda, API Gateway et DynamoDB, conçue pour gérer des utilisateurs de manière scalable et économique dans le Free Tier AWS.

## Fonctionnalités
- **POST /users** : Ajoute un utilisateur (ex. : `{"userId": "123", "name": "Marie", "email": "marie@example.com"}`).
- **GET /users?userId=xxx** : Récupère un utilisateur par `userId`.
- Infrastructure définie avec AWS SAM (IaC).
- Logs surveillés avec CloudWatch.
- Optimisé pour le Free Tier AWS (128 Mo, 25 RCU/WCU).


## Architecture

```mermaid
graph TD
    A[Client] -->|POST /users| B(API Gateway)
    A -->|GET /users?userId=xxx| B
    B -->|Proxy Integration| C(AWS Lambda: UsersFunction)
    C -->|PutItem| D(DynamoDB: Users Table)
    C -->|GetItem| D
    C -->|Logs| E(CloudWatch Logs)
    D -->|Response| C
    C -->|Response| B
    B -->|HTTP Response| A


