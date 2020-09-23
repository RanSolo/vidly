resource "aws_s3_bucket" "mybucket" {
  bucket = "vidly-bucket"
  acl    = "private"

  tags = {
    Name = "vidly-bucket"
  }
}