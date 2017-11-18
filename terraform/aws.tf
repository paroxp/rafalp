provider "aws" {
  region = "eu-west-1"
}

provider "aws" {
  alias  = "us-east"
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "www.rafalp.com-tf"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}
