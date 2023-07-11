#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { GithubActionsAwsAuthCdkStack } from '../lib/github-actions-aws-auth-cdk-stack'

const app = new cdk.App()

new GithubActionsAwsAuthCdkStack(app, 'GithubActionsAwsAuthCdkStack', {
  repositoryConfig: [
    {
      owner: 'aws-solutions-library',
      repo: 'aws-cdl',
      filter: 'main',
    },
  ],
})
