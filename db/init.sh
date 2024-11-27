#!/bin/bash

./docker-entrypoint-initdb.d/scripts/run-seed.sh &

# Fim do script
exit 0