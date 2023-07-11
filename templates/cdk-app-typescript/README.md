# Welcome to the cdk-app-typescript AWS Cloud Development Kit (CDK) application

This AWS Cloud Development Kit (CDK) application deploys cdk-app-typescript.

- What it does
- What you will build
- How to use it

## What it does

Insert description of what it does.

## 🛠 What you will build

Deploying this repository with default parameters builds the following cdk-app-typescript in the AWS Cloud.

![solutions architecture diagram](resources/architecture/architecture_diagram.png)
Figure 1: Solution Architecture Diagram

As shown in Figure 1: Solution Architecture Diagram, this repository set ups up the following application stacks

1. List the stacks here

## Application Stacks

### Shared Resource Stack

The shared resource stack deploys all cross-stack referenced resources such as S3 buckets and lambda functions that are built as dependencies.

Review the [Shared Resources Stack](lib/stacks/stack-shared-resources/stack-shared-resources.ts) and [Stack Outputs](#shared-resources-stack-outputs)

Insert your other stacks here.

## 💲 Cost and Licenses

You are responsible for the cost of the AWS services used while running this reference deployment. There is no additional cost for using this.

The AWS CDK stacks for this repository include configuration parameters that you can customize. Some of these settings, such as instance type, affect the cost of deployment. For cost estimates, see the pricing pages for each AWS service you use. Prices are subject to change.

Tip: After you deploy the repository, create AWS Cost and Usage Reports to track costs associated with the repository. These reports deliver billing metrics to an S3 bucket in your account. They provide cost estimates based on usage throughout each month and aggregate the data at the end of the month. For more information, see [What are AWS Cost and Usage Reports?](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html)

This application doesn’t require any software license or AWS Marketplace subscription.

## 🚀 How to Deploy

You can deploy the cdk-app-typescript through the manual setup process using AWS CDK. We recommend use of an AWS Cloud9 instance in your AWS account or VS Code and the AWS CLI. We also generally recommend a fresh AWS account that can be integrating with your existing infrastructure using AWS Organizations.

## 🎒 Pre-requisites

- The [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) must be installed -and- configured with an AWS account on the deployment machine (see <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html> for instructions on how to do this on your preferred development platform).
- This project requires [Node.js](http://nodejs.org/). To make sure you have it available on your machine, try running the following command.

  ```sh
  node -v
  ```

- For best experience we recommend installing CDK globally: `npm install -g aws-cdk`

## 🔐 Security Note

This repository has been developed using architectural and security best practices as defined by [AwsSolutions CDK Nag Pack](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#awssolutions). CDK Nag provides integrated tools for automatically reviewing infrastructure for common security, business, and architectural best practices.

This repository comes with [AwsSolutions CDK Nag Pack](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#awssolutions) pre-configured and enabled by default. This means that any changes to existing code or deployments will be automatically checked for architectural and development best practices as defined by the [AwsSolutions CDK Nag Pack](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#awssolutions). You can disable this feature in `cdk.context.json` by switching the `nagEnabled` flag to `false`.

As part of the shared responsibility model for security we recommend taking additional steps within your AWS account to secure this application. We recommend you implement the following AWS services once your application is in production:

- [Amazon Guard Duty](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_settingup.html)
- [AWS WAF](https://docs.aws.amazon.com/waf/latest/developerguide/setting-up-waf.html)
- [Amazon Cloudfront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/setting-up-cloudfront.html)

## 🚀 Setup

### 0/ Use git to clone this repository to your local environment

```sh
git clone #insert-http-or-ssh-for-this-repository
```

### 1/ Set up your AWS environment

- Configure your AWS credentials: `aws configure`
- For more on setting up your AWS Credentials please visit [setting up your aws credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

### 2/ Prepare your CDK environment

1. Navigate to CDK Directory
2. Set up your emissions factor document (see Set up your emissions factor document below)
3. Copy `cdk.context.template.json` or remove .template
4. Enter your parameters in `cdk.context.json` (see Context Parameters below)

#### --Context Parameters--

Before deployment navigate to `cdk.context.json` and update the required context parameters which include: `adminEmail`, and `repoBranch`. Review the optional and required context variables below.

- Required:`adminEmail` The email address for the administrator of the app

INSERT SOME OTHER PARAMETERS HERE

### 3/ Install dependencies, build, and synthesize the CDK app

- Install dependencies

```sh
npm ci
```

- Build your node application and environment

```sh
npm run build
```

- Make sure that you have assumed an AWS Profile or credentials through AWS Configure or some other means
- Get your AWS Account Number `aws sts get-caller-identity`
- Bootstrap CDK so that you can build cdk assets

```sh
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

or

```sh
cdk bootstrap # if you are authenticated through `aws configure`
```

- Synthesize the CDK application

```sh
cdk synth
```

### 4/ Deploy the application

- ✅ Recommended: deploy for local development

```sh
cdk deploy --all
```

## 🗑 How to Destroy

You can destroy all stacks included in cdk-app-typescript guidance with sample code with `cdk destroy --all`. You can destroy individual stacks with `cdk destroy --StackName`. By default using CDK Destroy will destroy EVERYTHING. Use this with caution! We strongly recommend that you modify this functionality by applying no delete defaults within your CDK constructs. Some stacks and constructs that we recommend revising include:

- DynamoDB Tables
- S3 Buckets
- Cognito User Pools

## Work with outputs

The CDK stacks by default export all stack outputs to `cdk-outputs.json` at the top level of the directory. You can disable this feature by removing `"outputsFile": "cdk-outputs.json"` from `cdk.json` but we recommend leaving this feature, as it is a requirement for some other features. By default this file is ignored via `.gitignore` so any outputs will not be committed to a version control repository. Below is a guide to the standard outputs.

### Shared Resources Stack Outputs

Shared resource stack outputs include:

- `exampleAwsRegion`: Region of CDK Application AWS Deployment.

## 🛠 Usage

Follow the steps below to see if everything is working and get familiar with this application.

### 1/ Make sure all the infrastructure deployed properly

In your command line shell you should see confirmation of all resources deploying. Did they deploy successfully? Any errors or issues? If all is successful you should see indication that CDK deployed. You can also verify this by navigating to the Cloudformation service in the AWS console. Visually check the series of stacks that all begin with `CLQS` to see that they deployed successfully. You can also search for the tag:

```json

"application": "cdk-app-typescript"

```

### 2/ Do some other stuff...

Add your own additional steps here

## 🧪 Tests

This application currently includes unit tests, infrastructure tests, deployment tests. We are working on an end to end testing solution as well. Read on for the test details:

### Pipeline Tests

#### Static Tests

- `npm ci` installs all dependencies from `package.lock.json`
- `npm run build` builds the javascript from typescript and makes sure everything works!
- `cdk synth` synthesizes all CDK stacks in the application
- Runs bandit security tests for common vulnerabilities in Python
- Runs ESLint for common formatting issues in Javascript and Typescript

#### Security Tests

- cdk_nag
- git-secrets
- Chechov
- semgrep
- python bandit

#### Deployment Tests

- Runs CDKitten deployment tests -- these deploy your CDK in several major AWS regions, checking that it builds and deploys successfully, and then destroying those stacks after confirming that they build.
- Runs e2e data integration test -- runs an end to end test by dropping data into the pipeline and querying the GraphQL api output. If the test is successful it returns `Success`

### Manual Tests

You can run several of these tests manually on your local machine to check that everything is working as expected.

- `sh test-deployment.sh` Runs CDKitten locally using your assumed AWS role
- `sh test-e2e.sh`runs an end to end test by dropping data into the pipeline and querying the GraphQL api output. If the test is successful it returns `Success`
- `npm run lint` tests your code locally with the prebuilt linter configuration

## Extending cdk-app-typescript

If you are looking to utilize existing features of cdk-app-typescript while integrating your own features, modules, or applications this section provides details for how to ingest your data to the cdk-app-typescript data pipeline, how to connect data outputs, how to integrate other applications, and how to integrate other existing AWS services. As we engage with customers this list of recommendations will grow with customer use-cases. Please feel free to submit issues that describe use-cases you would like to be documented.

### Ingesting data into cdk-app-typescript

To ingest data into cdk-app-typescript you can use various inputs to get data into the cdk-app-typescript landing zone S3 bucket. This bucket can be found via AWS Console or AWS CLI under the name `bucketName`. It can also be accessed as a public readonly stack output via props `stackOutputName`. There are several methods for bringing data into an S3 bucket to start an event-driven pipeline. This article is a helpful resource as you explore options. Once your data is in S3 it will kick off the pipeline and the data quality check will begin.

### Integrating cdk-app-typescript data outputs

### General Guide to adding features

To add additional features to cdk-app-typescript we recommend developing your own stack that integrates with the existing cdk-app-typescript stack inputs and outputs. We recommend starting by reviewing the concepts of application, stack, and construct in AWS CDK. Adding a stack is the best way to add functionality to cdk-app-typescript.

1. Start by adding your own stack directory to `lib/stacks`

   ```sh
   mkdir lib/stacks/stack-title
   ```

2. Add a stack file to this directory

   ```sh
   touch lib/stacks/stack-title/stack-title.ts
   ```

3. Use basic CDK stack starter code to formulate your own stack. See example below:

   ```javascript
   import * as cdk from 'aws-cdk-lib'
   import { Construct } from 'constructs'
   // import * as sqs from 'aws-cdk-lib/aws-sqs';

   export class ExampleStack extends cdk.Stack {
     constructor(scope: Construct, id: string, props?: cdk.StackProps) {
       super(scope, id, props)

       // The code that defines your stack goes here

       // example resource
       // const queue = new sqs.Queue(this, 'ExampleStackQueue', {
       //   visibilityTimeout: cdk.Duration.seconds(300)
       // });
     }
   }
   ```

4. We recommend using a single stack, and integrating additional submodular components as constructs. Constructs are logical groupings of AWS resources with "sane" defaults. In many cases the CDK team has already created a reusable construct and you can simply work with that. But in specific cases you may way to create your own. You can create a construct using the commands and example below:

   ```sh
   mkdir lib/constructs/construct-title
   touch lib/constructs/construct-title/title-construct.ts
   ```

5. If you have integrated your stack successfully you should see it build when you run `cdk synth`. For development purposes we recommend deploying your stack in isolation before you deploy with the full application. You can run `cdk deploy YourStackName` to deploy in isolation.

6. Integrate your stack with the full application by importing it to `bin/main.ts` and `bin/cicd.ts` if you have chosen to deploy it.

   ```sh
   #open the file main.ts
   open main.ts
   ```

   ```javascript
   // Import your stack at the top of the file
   import { YourStackName } from './stacks/stack-title/your-stack'

   // Now create a new stack to deploy within the application
   const stackName = new YourStackName(app, 'YourStackTitle', {
     // these are props that serve as an input to your stack
     // these are optional, but could include things like S3 bucket names or other outputs of other stacks.
     // For more on this see the stack output section above.
     yourStackProp1: prop1,
     yourStackProp2: prop2,
     env: appEnv, // be sure to include this environment prop
   })
   ```

#### Working with Stack Outputs

You can access the outputs of application stacks by adding them as props to your stack inputs. For example, you can access the `myVpc` output by adding `networkStack.myVpc` as props your own stack. It is best practice to add this as props at the application level, and then as an interface at the stack level. Finally, you can access it via `props.myVpc` (or whatever you call it) within your stack. Below is an example.

```javascript

// Start by importing it when you instatiate your stack 👇
new MyFirstStack(app, 'MyFirstStack', {
    vpc: networkStack.myVpc
});

// Now export this as an interface within that stack 👇
export interface MySecondStackProps extends StackProps {
    vpc: Ec2.vpc
}

// Now access it as a prop where you need it within the stack 👇
this.myStackObject = new ec2.SecurityGroup(this, 'ec2SecurityGroup', {
            props.vpc,
            allowAllOutbound: true,
        });

```

The above is a theoretical example. We recommend reviewing the CDK documentation and the existing stacks to see more examples.

### Integrating with existing AWS Services

The model below describes the required schema for input to the cdk-app-typescript calculator microservice. This is Calculator Data Input Model.

## 📚 Reference & Resources

### Helpful Commands for CDK

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests\
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
- `cdk deploy --all` deploy this stack to your default AWS account/region w/o the CICD pipeline

### Data Models

Insert any data models here

## 👀 See also

- [AWS Energy & Utilities](https://aws.amazon.com/energy/)

## 🔐 Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.

## Appendix

### Troubleshooting

For users with an Apple M1 chip, you may run into the following error when executing npm commands: "no matching version found for node-darwin-amd64@16.4.0" or similar terminal error output depending on the version of node you are running. If this happens, execute the following commands from your terminal in order (this fix assumes you have node version manager (nvm) installed). In this example, we will use node version 16.4.0. Replace the node version in these commands with the version you are running:

```sh
nvm uninstall 16.4.0
```

```sh
arch -x86_64 zsh
```

```sh
nvm install 16.4.0
```

```sh
nvm alias default 16.4.0
```
