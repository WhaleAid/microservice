# !bin/sh

buf generate
buf export . --output ../social-api/src/proto
buf export ./auth --output ../auth-api/src/protos