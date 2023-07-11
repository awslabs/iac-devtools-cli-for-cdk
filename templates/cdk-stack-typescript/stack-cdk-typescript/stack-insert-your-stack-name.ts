import { Stack } from "aws-cdk-lib";
// import { NagSuppressions } from "cdk-nag"; uncomment if you need to use CDK_nag suppressions

interface CdkStackTypescriptProps {
  myExampleProp: string;
}

export class CdkStackTypescript extends Stack {
  public myExamplePublicProp: any;

  constructor(scope: Construct, id: string, props: CdkStackTypescriptProps) {
    super(scope, id);
    /**
     * Build your starter construct here
     * When you have built it you can import into a stack
     */
  }
}
