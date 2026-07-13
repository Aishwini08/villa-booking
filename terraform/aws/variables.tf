variable "aws_region" {
  default = "us-east-1"
}

variable "app_name" {
  default = "villa-booking"
}

variable "mongo_uri" {
  description = "MongoDB Atlas connection string"
  sensitive   = true
}

variable "frontend_url" {
  description = "Frontend URL for CORS configuration"
  default     = "*"
}
