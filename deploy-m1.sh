echo -----docker-build-----
docker buildx build --platform linux/amd64 -t image --push .

echo -----ssh-server-deploy-----
ssh root@ip sh deploy-bp.sh