#!/bin/bash

sh test-generate-context.sh
# synthesize cdk with context inputs
cdk synth --context adminEmail="test-email@email.com" --context quicksightUserName="test-email@email.com" --context repoBranch="main" --context deployQuicksightStack=false --context deploySagemakerStack=true --context deployWebStack=true --context nagEnabled=true
