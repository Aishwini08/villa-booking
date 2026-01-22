# Secret Management Strategy

This document outlines the secret management strategy for the Villa Booking application deployed on Azure.

## Overview

Secrets and sensitive configuration should never be committed to version control. This document describes how to securely manage secrets in both CI/CD pipelines and runtime environments.

## CI/CD Secrets (GitHub Actions)

### GitHub Secrets

Store the following secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

#### Required Secrets

1. **AZURE_CREDENTIALS**
   - Service Principal credentials for Azure authentication
   - Format: JSON with `clientId`, `clientSecret`, `subscriptionId`, `tenantId`
   - How to create:
     ```bash
     az ad sp create-for-rbac --name "villa-booking-sp" \
       --role contributor \
       --scopes /subscriptions/{subscription-id} \
       --sdk-auth
     ```

2. **AZURE_RESOURCE_GROUP**
   - Name of the Azure resource group
   - Example: `villabooking-rg-dev`

3. **AZURE_LOCATION**
   - Azure region (optional, defaults to `eastus`)
   - Example: `eastus`

4. **ACR_NAME**
   - Azure Container Registry name
   - Example: `villabookingacrdev`

5. **AZURE_CLIENT_ID**
   - Service Principal Client ID for ACR authentication

6. **AZURE_CLIENT_SECRET**
   - Service Principal Client Secret for ACR authentication

7. **CONTAINER_APP_ENV**
   - Container Apps Environment name
   - Example: `villabooking-env-dev`

### Usage in GitHub Actions

Secrets are accessed in workflows using:
```yaml
${{ secrets.SECRET_NAME }}
