import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class DockerLambdaAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const dockerFunc = new lambda.DockerImageFunction(this, "DockerFunc", {
      code: lambda.DockerImageCode.fromImageAsset( "./image", { 
        cmd: ['newrelic-lambda-wrapper.handler'] // assign cmd override for image config 
      } ), 
      memorySize: 1024, // MB
      timeout: cdk.Duration.seconds(10),
      architecture: lambda.Architecture.ARM_64, // needed for M1 mac
      tracing: lambda.Tracing.ACTIVE, // add xray action to policy
      environment: {
        NEW_RELIC_TRUSTED_ACCOUNT_KEY : "<NEW_RELIC_PARENT_ID>",
        NEW_RELIC_ACCOUNT_ID : "<NEW_RELIC_ACCOUNT_ID>",
        NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS : "true",
        NEW_RELIC_LAMBDA_EXTENSION_ENABLED : "true",
        NEW_RELIC_LAMBDA_HANDLER : "main.handler",
        NEW_RELIC_LICENSE_KEY : "<NEW_RELIC_LICENSE_KEY>",
        NEW_RELIC_LOG_ENDPOINT : "https://log-api.newrelic.com/log/v1" ,
        NEW_RELIC_TELEMETRY_ENDPOINT : "https://cloud-collector.newrelic.com/aws/lambda/v1",
      }
    });

    // other resources (like API Gateway) can be defined here
  }
}