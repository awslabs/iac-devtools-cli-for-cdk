import { Stack, StackProps, CfnOutput, Tags } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { aws_s3 as s3 } from 'aws-cdk-lib'

export class SharedResourcesStack extends Stack {
  public readonly mySharedResourcesBucket: s3.Bucket

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    /**
     * Example bucket for a shared resources stack.
     */
    this.mySharedResourcesBucket = new s3.Bucket(this, 'MySharedResourcesBucket', {})

    /**
     * Outputs the bucket name from above
     */
    new CfnOutput(this, 'MySharedResourcesBucketOutput', {
      value: this.mySharedResourcesBucket.bucketName,
      description: 'Bucket name for shared resources bucket.',
      exportName: 'MySharedResourcesBucket',
    })

    Tags.of(this).add('component', 'sharedResources')
  }
}
