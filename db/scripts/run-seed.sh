#!/bin/bash

echo "Esperando o backend estar disponível..."
until curl -s http://backend:8081/actuator/health | grep '"status":"UP"' > /dev/null 2>&1; do
  echo "Backend ainda não disponível, aguardando..."
  sleep 5
done

# Rodar o script de seed
echo "Executando o seed.sql..."
mysql -h db -u admdina -pIodo2023! dina < /docker-entrypoint-initdb.d/scripts/seed.sql
echo "Aplicação Inicializada!"
echo "Acesse via Browser no endereço http://localhost:4200"
exit 0