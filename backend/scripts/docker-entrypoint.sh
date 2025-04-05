 #!/bin/sh

# Wait for Neo4j to be ready
# This assumes your Neo4j database URL and port are available via an environment variable.
echo "Waiting for Neo4j to be ready..."
while ! nc -z ${NEO4J_HOST} ${NEO4J_PORT}; do
  sleep 1
done

echo "Neo4j is ready. Starting the Go backend..."
# Execute the command provided to the container (in this case, your Go app)
exec "$@"
