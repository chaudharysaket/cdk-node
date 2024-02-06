import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class DockerLambdaAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,    // Runtime
      code: lambda.Code.fromAsset('./image'), // Code loaded from the "path/to/your/code" directory
      handler: 'index.handler'                // File is "app", function is "handler"
    });

    // other resources (like API Gateway) can be defined here
  }
}