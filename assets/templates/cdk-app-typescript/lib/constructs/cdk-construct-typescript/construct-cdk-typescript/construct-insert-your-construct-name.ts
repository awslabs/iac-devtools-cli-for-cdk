import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
// import { NagSuppressions } from "cdk-nag"; uncomment if you need to use CDK_nag suppressions

interface CdkConstructTypescriptProps {
  myExampleProp: string;
}

export class CdkConstructTypescript extends Construct {
  public myExamplePublicProp: any;

  constructor(
    scope: Construct,
    id: string,
    props: CdkConstructTypescriptProps
  ) {
    super(scope, id);
    /**
     * Build your starter construct here
     * When you have built it you can import into a stack
     */
  }
}
