# E-Commerce Microservices Kubernetes Deployment

This directory contains Kubernetes manifests for deploying the E-Commerce microservices application.

## Architecture Overview

The application consists of the following microservices:

- **Frontend**: React/Vite application (port 80)
- **User Service**: User management and authentication (port 3001)
- **Product Service**: Product catalog and management (port 3002)
- **Cart Service**: Shopping cart functionality (port 3003)
- **MongoDB**: Database for persistent data
- **Redis**: Caching layer

## Prerequisites

1. Kubernetes cluster (minikube, kind, or cloud provider)
2. kubectl CLI tool
3. Docker images built and available
4. NGINX Ingress Controller installed
5. Metrics Server for HPA functionality

## File Structure

```
k8s/
├── namespace.yaml          # Namespace definition
├── configmap.yaml          # Application configuration
├── secrets.yaml            # Sensitive data (passwords, keys)
├── mongodb.yaml            # MongoDB deployment and service
├── redis.yaml              # Redis deployment and service
├── user-service.yaml       # User microservice
├── product-service.yaml    # Product microservice
├── cart-service.yaml       # Cart microservice
├── frontend.yaml           # Frontend application
├── ingress.yaml            # Ingress configuration
├── hpa.yaml                # Horizontal Pod Autoscalers
├── network-policy.yaml     # Network security policies
├── kustomization.yaml      # Kustomize configuration
└── README.md               # This file
```

## Deployment Steps

### 1. Build Docker Images

First, build the Docker images for each service:

```bash
# Build user service
docker build -t user:latest ./User/

# Build product service
docker build -t product:latest ./Product/

# Build cart service
docker build -t cart:latest ./Cart/

# Build frontend
docker build -t frontend:latest ./front-end/
```

### 2. Deploy to Kubernetes

Using Kustomize (recommended):
```bash
kubectl apply -k .
```

Or deploy individual files:
```bash
# Create namespace
kubectl apply -f namespace.yaml

# Deploy infrastructure
kubectl apply -f configmap.yaml
kubectl apply -f secrets.yaml
kubectl apply -f mongodb.yaml
kubectl apply -f redis.yaml

# Deploy services
kubectl apply -f user-service.yaml
kubectl apply -f product-service.yaml
kubectl apply -f cart-service.yaml
kubectl apply -f frontend.yaml

# Deploy ingress and scaling
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
kubectl apply -f network-policy.yaml
```

### 3. Verify Deployment

```bash
# Check all resources
kubectl get all -n ecommerce-app

# Check pods status
kubectl get pods -n ecommerce-app

# Check services
kubectl get svc -n ecommerce-app

# Check ingress
kubectl get ingress -n ecommerce-app
```

## Configuration

### Environment Variables

Update the following files with your specific values:

1. **secrets.yaml**: Replace base64 encoded secrets with your actual values
2. **configmap.yaml**: Update database URIs and other configuration
3. **ingress.yaml**: Update hostname for your domain

### Secrets Management

For production, consider using:
- Kubernetes Secrets with proper encryption
- External secret management tools (HashiCorp Vault, AWS Secrets Manager)
- Sealed Secrets for GitOps workflows

## Scaling

The application includes Horizontal Pod Autoscalers (HPA) that automatically scale services based on:
- CPU utilization (70% threshold)
- Memory utilization (80% threshold)

Scaling ranges:
- User Service: 2-10 replicas
- Product Service: 2-10 replicas
- Cart Service: 2-10 replicas
- Frontend: 2-8 replicas

## Security

### Network Policies

Network policies restrict traffic between services:
- Frontend can only communicate with backend services
- Backend services can only access MongoDB and Redis
- No direct external access to backend services

### Security Best Practices

1. Use secrets for sensitive data
2. Implement proper RBAC
3. Regular security updates
4. Network policies for traffic control
5. Resource limits and requests

## Monitoring and Logging

### Health Checks

All services include:
- Liveness probes (restart unhealthy pods)
- Readiness probes (ensure pods are ready to serve traffic)

### Resource Management

Each service has defined:
- CPU and memory requests
- CPU and memory limits
- Resource-based autoscaling

## Troubleshooting

### Common Issues

1. **Pods not starting**: Check image availability and resource constraints
2. **Services not accessible**: Verify network policies and service configuration
3. **Database connection issues**: Check MongoDB deployment and credentials
4. **Ingress not working**: Ensure NGINX Ingress Controller is installed

### Debug Commands

```bash
# Check pod logs
kubectl logs <pod-name> -n ecommerce-app

# Describe pod for events
kubectl describe pod <pod-name> -n ecommerce-app

# Check service endpoints
kubectl get endpoints -n ecommerce-app

# Test service connectivity
kubectl run test-pod --image=busybox -it --rm --restart=Never -n ecommerce-app
```

## Accessing the Application

### Local Development

Add to `/etc/hosts`:
```
127.0.0.1 ecommerce.local
```

Access via:
- Frontend: http://ecommerce.local
- API: http://ecommerce.local/api/

### Production

Update the ingress hostname to your actual domain and configure SSL certificates.

## Cleanup

To remove all resources:

```bash
kubectl delete namespace ecommerce-app
```

Or using Kustomize:
```bash
kubectl delete -k .
``` 