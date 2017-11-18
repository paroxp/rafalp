data "aws_iam_policy_document" "website" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::www.${var.website_name}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "redirect" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.website_name}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "website" {
  bucket = "www.${var.website_name}"
  acl    = "private"
  policy = "${data.aws_iam_policy_document.website.json}"

  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}

resource "aws_s3_bucket" "redirect" {
  bucket = "${var.website_name}"
  acl    = "private"
  policy = "${data.aws_iam_policy_document.redirect.json}"

  website {
    redirect_all_requests_to = "https://www.${var.website_name}"
  }
}
