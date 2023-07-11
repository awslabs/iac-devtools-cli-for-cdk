#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { Aspects } from 'aws-cdk-lib'
import { SharedResourcesStack } from '../lib/stacks/stack-shared-resources/stack-shared-resources'
import {
  checkAdminEmailSetup,
  checkContextFilePresent,
  checkServerAccessLogsUseBucketPolicy,
} from '../resources/setup-checks/setupCheck'
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag'

/**
 * Instantiate a new CDK app object
 */

const app = new cdk.App()

/**
 * Create the cdk app environment to be used in all stacks
 * Get region from the app context or from environmental variables
 * Get account from local environmental variables defined with AWS CLI
 */

const appEnv = {
  region: app.node.tryGetContext('awsRegion') ? app.node.tryGetContext('awsRegion') : process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
}

/**
 * Check if cdk context is defined either by context file or command line flags
 * If the context file is missing return a
 */

checkContextFilePresent(app)

/**
 * Check if the server access logs bucket policy is true
 * This needs to be set as "true" in cdk.context
 * Or deployment will not function properly.
 */

checkServerAccessLogsUseBucketPolicy(app)

/**
 * Define adminEmail variable from context file
 */
checkAdminEmailSetup(adminEmail)
const adminEmail = app.node.tryGetContext('adminEmail')

/**
 * Create shared resources stack
 */
const sharedResources = new SharedResourcesStack(app, 'SharedResources', { env: appEnv })

/**
 * Enable CDK nag by default if the cdk nag feature flag is set to true
 */
const nagEnabled = app.node.tryGetContext('nagEnabled')
console.log(`CDK Nag enabled option is set to: ${nagEnabled}`)
if (nagEnabled === true) {
  console.log('CDK-nag enabled. Starting cdk-nag review')
  Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }))
}
