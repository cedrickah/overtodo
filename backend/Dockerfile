# Use the official Golang image to build the Go application
FROM golang:1.23 AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the Go Modules manifests
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum are not changed
RUN go mod tidy

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go build -o app .

# Start a new stage from scratch
FROM debian:bullseye-slim

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/app .

# Expose the port that the app will run on
EXPOSE 8080

# Copy the docker-entrypoint.sh
COPY scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Give permissions to execute docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the entrypoint to the script
ENTRYPOINT ["docker-entrypoint.sh"]

# Command to run the executable
CMD ["./app"]
 
