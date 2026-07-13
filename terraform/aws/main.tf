terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source     = "./modules/vpc"
  app_name   = var.app_name
  aws_region = var.aws_region
}

module "ecr" {
  source   = "./modules/ecr"
  app_name = var.app_name
}

module "iam" {
  source   = "./modules/iam"
  app_name = var.app_name
}

module "security" {
  source   = "./modules/security"
  app_name = var.app_name
  vpc_id   = module.vpc.vpc_id
}

module "cloudwatch" {
  source   = "./modules/cloudwatch"
  app_name = var.app_name
}

module "ecs" {
  source              = "./modules/ecs"
  app_name            = var.app_name
  aws_region          = var.aws_region
  frontend_url        = var.frontend_url
  execution_role_arn  = module.iam.execution_role_arn
  backend_repo_url    = module.ecr.backend_repo_url
  frontend_repo_url   = module.ecr.frontend_repo_url
  subnet_ids          = module.vpc.subnet_ids
  backend_sg_id       = module.security.backend_sg_id
  frontend_sg_id      = module.security.frontend_sg_id
  backend_log_group   = module.cloudwatch.backend_log_group
  frontend_log_group  = module.cloudwatch.frontend_log_group
}
