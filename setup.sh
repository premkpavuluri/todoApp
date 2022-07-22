#! /bin/bash

mkdir database
echo '{}' > database/todoDb.json
echo '{}' > database/users.json

echo -e "ENV=\"PRODUCTION\"\nSESSION_NAME=\"sessionId\"\nSESSION_KEY=\"samplekey\"" > .env