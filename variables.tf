variable "aws_access_key" {
  type        = "string"
  description = "The access key for the AWS account you wish to deploy to."
}

variable "aws_secret_key" {
  type        = "string"
  description = "The secret key for the AWS account you wish to deploy to."
}

variable "environment" {
  type = "string"
  description = "The environment where this is being deployed to. Will nest the public assets under `/"
  default = "dev"
}
variable "mime_types" {
  type        = "map"
  description = "The supported mime types for file asset uploads."

  default = {
    htm  = "text/html"
    html = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    map  = "application/javascript"
    json = "application/json"
  }
}