#!/bin/bash

# kill this script if any required command fails
set -e
if ! [ -x "$(command -v terraform)" ]; then
  printf "\\033[34Error: Terraform is not installed. Install from https://terraform.io\\033[39m\\n" >&2
  exit 1
fi

AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"
ENV_NAME="$ENV_NAME"

printf "\\033[34mProvisioning AWS resources...\\033[39m\\n"
terraform init -var="access_key=${AWS_ACCESS_KEY_ID}" \
  -var="secret_key=${AWS_SECRET_ACCESS_KEY}"

printf "\\033[34mDeploying the application...\\033[39m\\n"
terraform workspace select "$ENV_NAME" || terraform workspace new "$ENV_NAME"

# terraform plan
terraform apply  -var="aws_access_key=${AWS_ACCESS_KEY_ID}" \
  -var="aws_secret_key=${AWS_SECRET_ACCESS_KEY}" \
  -var="environment=${ENV_NAME}" --auto-approve

echo "Deployed"