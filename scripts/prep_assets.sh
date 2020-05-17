#! /bin/sh

# This file prepares assets in the public/ folder to be uploaded to S3 using
# Terraform.


# Create a new TF file with the assets that need to be uploaded.

SRC="dist"
TF_FILE="assets.tf"
COUNT=0

echo "Preparing \"$TF_FILE\" for creation"

rm $TF_FILE
touch $TF_FILE

echo "\nWalking shallow contents of \"$SRC\" to start looping"

find $SRC -iname '*.*' | while read path; do

case "$path" in
  *map) continue
  ;;
esac

cat >> $TF_FILE << EOM
resource "aws_s3_bucket_object" "file_$COUNT" {
  bucket = "\${var.s3_bucket}"
  key = "public/\${var.environment}${path#$SRC}"
  acl = "public-read"
  source = "\${path.module}/$path"
  content_type = "\${lookup(var.mime_types, "${path##*.}")}"
  etag = "\${md5(file("\${path.module}/$path"))}"
}

EOM

COUNT=$(expr $COUNT + 1)

done
