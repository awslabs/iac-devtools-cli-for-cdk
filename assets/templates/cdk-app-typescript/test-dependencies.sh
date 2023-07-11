#!/bin/bash

apt install -y unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
aws --version
node --version
echo "Installing typescript as dependency"
npm install typescript@latest -g
echo "succesfully installed typescript"
echo "Installing all package dependencies"
npm install -g aws-cdk
apt install jq -y
npm install -g @aws-amplify/cli
apt install -y unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
aws --version
echo "Installing typescript as dependency"
npm install typescript@latest -g
echo "succesfully installed typescript"
echo "Installing all package dependencies"
apt install jq -y
npm install -g @aws-amplify/cli
