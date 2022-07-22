#! /bin/bash

mkdir database

echo -e "ENV=\"PRODUCTION\"\nSESSION_NAME=\"sessionId\"\nSESSION_KEY=\"samplekey\"" > .env