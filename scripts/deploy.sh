#!/bin/bash

# kill this script if any required command fails
set -e
if ! [ -x "$(command -v terraform)" ]; then
  printf "\\033[34Error: Terraform is not installed. Install from https://terraform.io\\033[39m\\n" >&2
  exit 1
fi

ENV_NAME="dev"

printf "\\033[34mCleaning old build...\\033[39m\\n"
npm run clean

printf "\\033[34mLinting for code erros...\\033[39m\\n"
npm run lint

printf "\\033[34mBuilding the application...\\033[39m\\n"
npm run build

printf "\\033[34mProvisioning AWS resources...\\033[39m\\n"
terraform init --backend-config=backend_config.tfvars

printf "\\033[34mDeploying the application...\\033[39m\\n"
terraform workspace select "$ENV_NAME" || terraform workspace new "$ENV_NAME"

# terraform plan
terraform apply  -var="environment=${ENV_NAME}" --auto-approve

echo "Deployed"