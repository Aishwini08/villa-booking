# Villa Booking — Azure to AWS DevOps Migration

A full-stack Villa Booking application migrated from Azure to AWS, with CI/CD, containerization, IaC, monitoring, and security best practices implemented.

## Live Deployment
- **Frontend:** http://52.66.206.9
- **Backend API:** http://52.66.206.9:5000/api/health

---

## Project Structure

```
villa-booking/
├── app/
│   ├── backend/          # Node.js + Express + MongoDB API
│   └── frontend/         # React.js frontend
├── docker/               # Docker Compose files
├── terraform/
│   ├── main.tf           # Azure Terraform (original)
│   └── aws/              # AWS Terraform (migrated)
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── modules/
│           ├── vpc/
│           ├── ecr/
│           ├── iam/
│           ├── ecs/
│           ├── security/
│           └── cloudwatch/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml         # Azure CI/CD (fixed)
│       └── aws-ci-cd.yml     # AWS CI/CD (migrated)
├── monitoring/           # Prometheus + Grafana config
└── security/             # Hadolint, Trivy config
```

---

## Azure Misconfigurations Identified & Fixed

| # | Category | Issue | Fix |
|---|----------|-------|-----|
| 1 | Terraform | Missing `location` variable | Declared variable with default `eastus` |
| 2 | Terraform | Backend publicly exposed | Should use internal networking |
| 3 | Terraform | `MONGO_URI` not passed to container | Added `secure_environment_variables` block |
| 4 | Terraform | Frontend uses backend IP not DNS | Replaced with stable DNS name |
| 5 | CI/CD | Wrong image name (`gaming-store-app`) | Fixed to `villa-booking` |
| 6 | CI/CD | Wrong Dockerfile paths | Fixed to `app/backend/Dockerfile` |
| 7 | CI/CD | Terraform step runs non-existent script | Fixed to `terraform init && terraform apply` |
| 8 | CI/CD | No job separation or gates | Split into `build → scan → deploy` jobs |
| 9 | CI/CD | Hadolint set to `warning` | Changed to `error` to block pipeline |
| 10 | Dockerfile | Backend runs as root | Added non-root user |
| 11 | Dockerfile | Frontend missing `npm install` | Added before `npm run build` |
| 12 | App Code | CORS middleware not applied | Added `app.use(cors())` in `server.js` |
| 13 | App Code | No input sanitization | Documented as known issue |
| 14 | Monitoring | Backend has no `/metrics` endpoint | Noted for future improvement |
| 15 | Monitoring | Dead Prometheus job config | Cleaned up config |
| 16 | Docker Compose | Wrong port mapping (3000 vs 80) | Fixed to `80:80` |
| 17 | Docker Compose | No shared network | Added `villa-network` bridge network |

---

## AWS Architecture

```
Internet
    │
    ▼
[Frontend ECS Task - Fargate]  ──►  [Backend ECS Task - Fargate]
        │                                       │
        ▼                                       ▼
[Frontend Security Group]           [Backend Security Group]
  (port 80 open)                    (port 5000 - frontend only)
        │                                       │
        └──────────── VPC ───────────────────────┘
                       │
              [2 Public Subnets]
              ap-south-1a / ap-south-1b
                       │
              [Internet Gateway]
```

### AWS Services Used
| Service | Purpose |
|---------|---------|
| ECS Fargate | Run frontend & backend containers |
| ECR | Store Docker images |
| VPC | Isolated network |
| IAM | ECS task execution role |
| CloudWatch | Container logs |
| SSM Parameter Store | Secure MONGO_URI storage |
| MongoDB Atlas | Database (ap-south-1) |

---

## CI/CD Pipeline

```
git push → build → scan → deploy
```

- **build** — Lint Dockerfile, build images, push to ECR
- **scan** — Trivy security scan on images (blocks on CRITICAL)
- **deploy** — Force new ECS deployment

### GitHub Secrets Required
| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | `ap-south-1` |
| `MONGO_URI` | MongoDB Atlas connection string |

---

## Run Locally

**Prerequisites:** Docker Desktop, Node.js

```bash
# Clone the repo
git clone https://github.com/Aishwini08/villa-booking.git
cd villa-booking

# Start all services
docker compose -f docker/docker-compose.yml up --build
```

- Frontend: http://localhost:80
- Backend: http://localhost:5000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

---

## Deploy to AWS

**Prerequisites:** AWS CLI, Terraform

```bash
# Configure AWS CLI
aws configure

# Store MongoDB URI in SSM
aws ssm put-parameter --name "/villa-booking/mongo-uri" \
  --value "your-connection-string" \
  --type SecureString --region ap-south-1

# Deploy infrastructure
cd terraform/aws
terraform init
terraform apply
```

---

## Tech Stack

- **Frontend:** React.js, Redux, Nginx
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Containerization:** Docker, Docker Compose
- **IaC:** Terraform (modular)
- **CI/CD:** GitHub Actions
- **Cloud:** AWS (ECS Fargate, ECR, VPC, IAM, CloudWatch, SSM)
- **Monitoring:** Prometheus, Grafana, CloudWatch
- **Security:** Trivy, Hadolint 
