#!/bin/bash

# synthesize cdk with context inputs
sh test-generate-context.sh
cdk bootstrap   #bootstraps cdk in the region
cdk synth
wait
echo "🚀 deploying all"
cdk deploy --all 
cdk destroy --all --force  #destroys all cdk resources in the defined region --force flag prevents the required "y" confirmation
