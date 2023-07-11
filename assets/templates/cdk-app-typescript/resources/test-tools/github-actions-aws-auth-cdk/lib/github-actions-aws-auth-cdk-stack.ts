import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { aws_iam as iam } from 'aws-cdk-lib'

export interface GithubActionsAwsAuthCdkStackProps extends cdk.StackProps {
  readonly repositoryConfig: { owner: string; repo: string; filter?: string }[]
}

export class GithubActionsAwsAuthCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GithubActionsAwsAuthCdkStackProps) {
    super(scope, id, props)

    const githubDomain = 'token.actions.githubusercontent.com'

    const githubProvider = new iam.OpenIdConnectProvider(this, 'GithubActionsProvider', {
      url: githubDomain,
      clientIds: ['sts.amazonaws.com'],
    })

    const iamRepoDeployAccess = props.repositoryConfig.map(r => `repo:${r.owner}/${r.repo}:${r.filter ?? '*'}`)

    const conditions: iam.Conditions = {
      StringLike: {
        [`${githubDomain}:sub`]: iamRepoDeployAccess,
      },
    }

    const role = new iam.Role(this, 'gitHubDeployRole', {
      assumedBy: new iam.WebIdentityPrincipal(githubProvider.openIdConnectProviderArn, conditions),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
      roleName: 'githubActionsDeployRole',
      description: 'This role is used via GitHub Actions to deploy with AWS CDK or Terraform on the target AWS account',
      maxSessionDuration: cdk.Duration.hours(1),
    })

    new cdk.CfnOutput(this, 'GithubActionOidcIamRoleArn', {
      value: role.roleArn,
      description: `Arn for AWS IAM role with Github oidc auth for ${iamRepoDeployAccess}`,
      exportName: 'GithubActionOidcIamRoleArn',
    })

    cdk.Tags.of(this).add('component', 'CdkGithubActionsOidcIamRole')
  }
}
