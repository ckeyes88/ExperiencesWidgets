resource "aws_s3_bucket_object" "file_0" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/aggregateView.js"
  acl = "public-read"
  source = "${path.module}/dist/aggregateView.js"
  content_type = lookup(var.mime_types, "js")
  etag = md5(file("${path.module}/dist/aggregateView.js"))
}

resource "aws_s3_bucket_object" "file_1" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/expAppListView.js"
  acl = "public-read"
  source = "${path.module}/dist/expAppListView.js"
  content_type = lookup(var.mime_types, "js")
  etag = md5(file("${path.module}/dist/expAppListView.js"))
}

resource "aws_s3_bucket_object" "file_2" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/calendarBookingForm.css"
  acl = "public-read"
  source = "${path.module}/dist/calendarBookingForm.css"
  content_type = lookup(var.mime_types, "css")
  etag = md5(file("${path.module}/dist/calendarBookingForm.css"))
}

resource "aws_s3_bucket_object" "file_3" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/aggregateView.css"
  acl = "public-read"
  source = "${path.module}/dist/aggregateView.css"
  content_type = lookup(var.mime_types, "css")
  etag = md5(file("${path.module}/dist/aggregateView.css"))
}

resource "aws_s3_bucket_object" "file_4" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/calendarBookingForm.js"
  acl = "public-read"
  source = "${path.module}/dist/calendarBookingForm.js"
  content_type = lookup(var.mime_types, "js")
  etag = md5(file("${path.module}/dist/calendarBookingForm.js"))
}

resource "aws_s3_bucket_object" "file_5" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/widgets.js"
  acl = "public-read"
  source = "${path.module}/dist/widgets.js"
  content_type = lookup(var.mime_types, "js")
  etag = md5(file("${path.module}/dist/widgets.js"))
}

resource "aws_s3_bucket_object" "file_6" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Oblique.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Oblique.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Oblique.otf"))
}

resource "aws_s3_bucket_object" "file_7" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Medium.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Medium.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Medium.otf"))
}

resource "aws_s3_bucket_object" "file_8" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Heavy.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Heavy.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Heavy.otf"))
}

resource "aws_s3_bucket_object" "file_9" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Light.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Light.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Light.otf"))
}

resource "aws_s3_bucket_object" "file_10" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Black.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Black.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Black.otf"))
}

resource "aws_s3_bucket_object" "file_11" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Book.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Book.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Book.otf"))
}

resource "aws_s3_bucket_object" "file_12" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Oblique.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Oblique.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Oblique.otf"))
}

resource "aws_s3_bucket_object" "file_13" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Medium.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Medium.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Medium.otf"))
}

resource "aws_s3_bucket_object" "file_14" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Heavy.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Heavy.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Heavy.otf"))
}

resource "aws_s3_bucket_object" "file_15" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Light.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Light.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Light.otf"))
}

resource "aws_s3_bucket_object" "file_16" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Black.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Black.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Black.otf"))
}

resource "aws_s3_bucket_object" "file_17" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Book.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Book.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Book.otf"))
}

resource "aws_s3_bucket_object" "file_18" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/fonts/AvenirLTStd-Roman.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/fonts/AvenirLTStd-Roman.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/fonts/AvenirLTStd-Roman.otf"))
}

resource "aws_s3_bucket_object" "file_19" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/assets/AvenirLTStd-Roman.otf"
  acl = "public-read"
  source = "${path.module}/dist/assets/AvenirLTStd-Roman.otf"
  content_type = lookup(var.mime_types, "otf")
  etag = md5(filebase64("${path.module}/dist/assets/AvenirLTStd-Roman.otf"))
}

resource "aws_s3_bucket_object" "file_20" {
  bucket = "event-list-widget-beta"
  key = "public/${var.environment}/expAppListView.css"
  acl = "public-read"
  source = "${path.module}/dist/expAppListView.css"
  content_type = lookup(var.mime_types, "css")
  etag = md5(file("${path.module}/dist/expAppListView.css"))
}

