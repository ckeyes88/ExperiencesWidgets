provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "us-west-2"
}

terraform {
  backend "s3" {
    bucket         = "widgets-terraform-state"
    dynamodb_table = "widgets-terraform-lock-table"
    key            = "terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
  }
}
