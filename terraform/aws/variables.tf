variable "aws_region" {
  default = "ap-south-1"
}

variable "app_name" {
  default = "villa-booking"
}

variable "frontend_url" {
  description = "Frontend URL for CORS configuration"
  default     = "*"
}
