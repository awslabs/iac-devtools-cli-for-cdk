#!/bin/bash

# WELCOME TO CDK-security-scripter 🔐
# CDK-security-scripter is a lightweight automated tool for auditing cdk applications using common security tools

# Security scripter runs local security tests and requires a few dependencies
# git-secrets (brew install git-secrets)
# bandit (pip3 install python-bandit)

# git-secrets
# git secrets --scan-history 2>&1 | tee git_secrets_output.log

# run cdk_nag
cdk synth --context nagEnabled="true" 2>&1 | tee ./cdk_nag_output.log

FIRST_LINE=$(sed -n '1p' cdk_nag_output.log)

sed "/$FIRST_LINE/,/Starting cdk-nag review/d" cdk_nag_output.log > cdk_nag_summary.log

# run python-bandit
bandit ./ -r 2>&1 | tee ./bandit_test_output.log
