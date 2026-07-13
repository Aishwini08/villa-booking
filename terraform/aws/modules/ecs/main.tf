resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"

  tags = {
    Name = "${var.app_name}-cluster"
  }
}

# Backend Task Definition
resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.app_name}-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.execution_role_arn

  container_definitions = jsonencode([{
    name  = "backend"
    image = "${var.backend_repo_url}:latest"
    portMappings = [{
      containerPort = 5000
      protocol      = "tcp"
    }]
    environment = [
      { name = "PORT",         value = "5000" },
      { name = "FRONTEND_URL", value = var.frontend_url }
    ]
    secrets = [{
      name      = "MONGO_URI"
      valueFrom = var.mongo_uri
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = var.backend_log_group
        awslogs-region        = var.aws_region
        awslogs-stream-prefix = "backend"
      }
    }
  }])
}

# Frontend Task Definition
resource "aws_ecs_task_definition" "frontend" {
  family                   = "${var.app_name}-frontend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.execution_role_arn

  container_definitions = jsonencode([{
    name  = "frontend"
    image = "${var.frontend_repo_url}:latest"
    portMappings = [{
      containerPort = 80
      protocol      = "tcp"
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = var.frontend_log_group
        awslogs-region        = var.aws_region
        awslogs-stream-prefix = "frontend"
      }
    }
  }])
}

# Backend ECS Service
resource "aws_ecs_service" "backend" {
  name            = "${var.app_name}-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.backend_sg_id]
    assign_public_ip = true
  }

  depends_on = [aws_ecs_task_definition.backend]
}

# Frontend ECS Service
resource "aws_ecs_service" "frontend" {
  name            = "${var.app_name}-frontend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.frontend_sg_id]
    assign_public_ip = true
  }

  depends_on = [aws_ecs_task_definition.frontend]
}
