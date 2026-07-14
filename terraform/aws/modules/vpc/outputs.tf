output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_ids" {
  value = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

output "namespace_id" {
  value = aws_service_discovery_private_dns_namespace.main.arn
}

output "namespace_name" {
  value = aws_service_discovery_private_dns_namespace.main.name
}
