#!/bin/bash

# WELCOME TO CDK POWERTOOLS E2E

# to run this script manually navigate to top level directory of the package and sh test-e2e.sh
sh test-generate-context.sh

echo "Welcome to CDK Powertools e2e test. This test deploys the full infrastructure and then performs an e2e test with sample data."
echo "If the test is successful we will destroy the infrastructure and all of it's contents and clean up the account."

regions=("us-east-1") #list of defined regions to loop through for deployment

for region in "${regions[@]}"
do
   echo "Setting aws default region to $region"
   export AWS_DEFAULT_REGION=$region #updates local aws config to the region defined for deployment
   echo "🚀 deploying cdk app in test to $region 📍"
   echo "🥾 bootstrapping cdk in $region 📍"
   cdk bootstrap   #bootstraps cdk in the region
   echo "🚀 deploying all in $region 📍"
   cdk deploy --all  #deploys all with the optional region context variable
   wait
   echo "Beginning e2e test"
   echo "The e2e test uses the AWS CLI to trigger a step function workflow with an e2e test"
   echo "If the lambda returns 'Success' the test was successful"
   echo "If the lambda returns something other than 'Success' the test failed"
   echo "First let's print the cdk-output file to make sure it's there"
   jq . cdk-outputs.json
   echo jq  '.TestStack.e2eTestLambdaFunctionName' cdk-outputs.json
   testlambda=$(jq -r '.TestStack.e2eTestLambdaFunctionName' cdk-outputs.json)
   echo "Running tests on $testlambda please sit tight for a few minutes"
   testoutcome=$(aws lambda invoke --function-name "$testlambda" --cli-binary-format raw-in-base64-out --log-type Tail --cli-read-timeout 0 response.json)
   wait
   jq . response.json
   wait
   echo "$testoutcome"
   testoutcomecode=$(jq -r '.' response.json)
   echo "$testoutcomecode"
   if [ "$testoutcomecode" = "Success" ]; then
      echo "$testoutcomecode"
      echo "Test passed! It works."
      rm response.json
   else
      echo "Test lambda failed. Want to find out why?"
      echo "$testlambda"
      echo "E2E test completed"

      echo "👋 destroying all in $region 📍"
      cdk destroy --all --force
      echo "Test failed. Please read response.json"
      rm response.json
      exit 1
   fi
   echo "E2E test completed and done"

   echo "👋 destroying all in $region 📍"
   cdk destroy --all --force 
   wait
   echo "✅ successfully deployed, tested, and destroyed cdk app in $region 📍"
done
#destroys all cdk resources in the defined region --force flag prevents the required "y" confirmation

echo "🥳 Successfully deployed and destroyed all CDK stacks with TEST! 😎"
