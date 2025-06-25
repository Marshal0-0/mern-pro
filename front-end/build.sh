#!/bin/bash

set -e

IMAGE="minac4/frontend:latest"
NAMESPACE="ecommerce-app"
LABEL="app=frontend"
FRONTEND_DIR="./front-end"

# Step 1: Remove old Docker image
echo "Removing old Docker image: $IMAGE..."
docker rmi -f $IMAGE || echo "No previous image to remove or failed to remove. Continuing."

echo "----------------------------------------"

# Step 2: Build new Docker image
echo "Building new Docker image: $IMAGE..."
docker build --no-cache -t $IMAGE $FRONTEND_DIR || { echo "Docker build failed! Exiting."; exit 1; }

echo "----------------------------------------"

# Step 3: Push new Docker image to Docker Hub
echo "Pushing Docker image to Docker Hub: $IMAGE..."
docker push $IMAGE || { echo "Docker push failed! Exiting."; exit 1; }

echo "----------------------------------------"

# Step 4: Delete all frontend pods in Kubernetes
echo "Deleting all frontend pods in namespace $NAMESPACE..."
kubectl delete pods -n $NAMESPACE -l $LABEL || echo "Failed to delete pods or none exist. Continuing."

echo "----------------------------------------"

# Step 5: Print pod status
echo "Current pod status in namespace $NAMESPACE:"
kubectl get pods -n $NAMESPACE

echo "Build and deployment steps completed." 