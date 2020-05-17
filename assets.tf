resource "aws_s3_bucket_object" "file_0" {
  bucket = "${var.s3_bucket}"
  key = "public/${var.environment}/expAppListView.js"
  acl = "public-read"
  source = "${path.module}/dist/expAppListView.js"
  content_type = "${lookup(var.mime_types, "js")}"
  etag = "${md5(file("${path.module}/dist/expAppListView.js"))}"
}

resource "aws_s3_bucket_object" "file_1" {
  bucket = "${var.s3_bucket}"
  key = "public/${var.environment}/calendarBookingForm.css"
  acl = "public-read"
  source = "${path.module}/dist/calendarBookingForm.css"
  content_type = "${lookup(var.mime_types, "css")}"
  etag = "${md5(file("${path.module}/dist/calendarBookingForm.css"))}"
}

resource "aws_s3_bucket_object" "file_2" {
  bucket = "${var.s3_bucket}"
  key = "public/${var.environment}/calendarBookingForm.js"
  acl = "public-read"
  source = "${path.module}/dist/calendarBookingForm.js"
  content_type = "${lookup(var.mime_types, "js")}"
  etag = "${md5(file("${path.module}/dist/calendarBookingForm.js"))}"
}

resource "aws_s3_bucket_object" "file_3" {
  bucket = "${var.s3_bucket}"
  key = "public/${var.environment}/widgets.js"
  acl = "public-read"
  source = "${path.module}/dist/widgets.js"
  content_type = "${lookup(var.mime_types, "js")}"
  etag = "${md5(file("${path.module}/dist/widgets.js"))}"
}

resource "aws_s3_bucket_object" "file_4" {
  bucket = "${var.s3_bucket}"
  key = "public/${var.environment}/expAppListView.css"
  acl = "public-read"
  source = "${path.module}/dist/expAppListView.css"
  content_type = "${lookup(var.mime_types, "css")}"
  etag = "${md5(file("${path.module}/dist/expAppListView.css"))}"
}

