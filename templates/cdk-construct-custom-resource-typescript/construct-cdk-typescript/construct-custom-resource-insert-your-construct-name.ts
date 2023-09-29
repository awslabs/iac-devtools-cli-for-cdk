import { Construct } from "constructs";
import {
  Stack,
  CustomResourceProvider,
  CustomResourceProviderRuntime,
} from "aws-cdk-lib";
// import { NagSuppressions } from "cdk-nag"; uncomment if you need to use CDK_nag suppressions

interface CdkConstructCustomResourceTypescriptProps {
  myExampleProp: string;
}

export class CdkConstructCustomResourceTypescript extends Construct {
  public myExamplePublicProp: any;

  constructor(
    scope: Construct,
    id: string,
    props: CdkConstructCustomResourceTypescriptProps
  ) {
    super(scope, id);
    /**
     * Build your starter construct here
     * When you have built it you can import into a stack
     */
    const crProvider = CustomResourceProvider.getOrCreateProvider(
      this,
      "Custom::MyCustomResourceType",
      {
        codeDirectory: `${__dirname}/handler-directory-name`,
        runtime: CustomResourceProviderRuntime.NODEJS_18_X,
      }
    );
    crProvider.addToRolePolicy({
      Effect: "Allow",
      Action: "s3:GetObject",
      Resource: "*",
    });
  }
}
