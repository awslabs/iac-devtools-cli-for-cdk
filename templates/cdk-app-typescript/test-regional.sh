#!/bin/bash

# WELCOME TO CDKitten 🐱
# CDKitten 🐱 is a close cousin of Taskcat 😺
# CDKitten is a simple script to automate test deployment of CDK resources

# to run this script manually navigate to top level directory of the package and sh test-deployment.sh
# this script is a test deployment script for cdk infrastructure
# it accepts a list of regions for test deployment and loops through each region and deploys all cdk infrastructure
# the publish step uses `cdk deploy --all` but this command can be edited to reflect a different stack by editing line 

sh test-generate-context.sh
regions=("us-east-1" "us-east-2" "us-west-2") #list of defined regions to loop through for deployment

declare –a success=() #sets an empty list to record successful deployments

for region in "${regions[@]}"
do
   echo "Setting aws default region to $region"
   export AWS_DEFAULT_REGION=$region #updates local aws config to the region defined for deployment
   echo "🚀 deploying cdk app in test to $region 📍"
   echo "🥾 bootstrapping cdk in $region 📍"
   cdk bootstrap  #bootstraps cdk in the region
   wait
   echo "🚀 deploying all in $region 📍"
   cdk deploy --all #deploys all with the optional region context variable
   wait
   echo "👋 destroying all in $region 📍"
   cdk destroy --all #deploys all with the optional region context variable #destroys all cdk resources in the defined region --force flag prevents the required "y" confirmation
   wait
   success+=("$region") #if the deployment is successful adds the region to the list of successful deployments
done
wait

echo "🥳 Successfully deployed and destroyed all CDK stacks in this testing cycle! 😎"

#loops through list of successful deployments in each region
#prints the list of each region that was successfully deployed
for region in "${success[@]}"
do
     echo "✅ successfully deployed and destroyed cdk app in $region 📍"
done
