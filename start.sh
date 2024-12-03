#!/bin/bash

# Função para iniciar o NGINX
start_nginx() {
    echo "Iniciando o NGINX..."
    # Substituir variáveis no template do NGINX
    # envsubst </app/nginx.conf.template >/etc/nginx/nginx.conf
    nginx -g "daemon off;" &
}

# Função para iniciar o Angular Server
start_angular_server() {
    echo "Iniciando o Angular Universal Server..."
    node /app/server/server.mjs &
}

# Função para capturar sinais de interrupção
handle_sigterm() {
    echo "Encerrando serviços..."
    kill -TERM "$nginx_pid" 2>/dev/null
    kill -TERM "$angular_pid" 2>/dev/null
    wait "$nginx_pid"
    wait "$angular_pid"
    exit 0
}

# Configurar certificados antes de iniciar os serviços
# configure_ssl_certificates

# Iniciar os serviços
start_nginx
nginx_pid=$!

start_angular_server
angular_pid=$!

# Configurar captura de sinais
trap 'handle_sigterm' SIGTERM SIGINT

# Manter o contêiner ativo
wait
