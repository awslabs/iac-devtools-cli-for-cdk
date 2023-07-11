#!/bin/bash

# generate a sample context from template for test purposes
NEW_CONTEXT=$(jq '.adminEmail = "test@test.com" .quicksightUserName = "test@test.com"' cdk.context.template.json)
echo $NEW_CONTEXT > cdk.context.json

# sets default AWS region for cdk tests
export AWS_DEFAULT_REGION="us-east-1"