#!/bin/bash

# Função para iniciar o NGINX
start_nginx() {
    echo "Carregando variáveis do arquivo .env..."

    # Verifica se o arquivo .env existe
    if [ -f /app/.env ]; then
        export $(grep -v '^#' /app/.env | xargs)
        echo "Variáveis carregadas com sucesso."
    else
        echo "Arquivo /app/.env não encontrado! Certifique-se de que ele exista em /app/.env."
        exit 1
    fi

    echo "Substituindo variáveis no template do NGINX..."
    if [ -f /app/nginx.conf ]; then
        # Substitui as variáveis no template e gera o arquivo de configuração final
        envsubst '${WEB_SERVER_NAME} ${GATEWAY_SERVER_NAME} ${SOCKET_HOST} ${SOCKET_PORT} ${GATEWAY_HOST} ${GATEWAY_PORT} ${SSR_SERVER_NAME} ${SSR_HOST} ${SSR_PORT}' </app/nginx.conf >/etc/nginx/nginx.conf
        echo "Arquivo de configuração do NGINX gerado com sucesso."
    else
        echo "Arquivo nginx.conf não encontrado! Certifique-se de que ele exista em /app."
        exit 1
    fi

    echo "Iniciando o NGINX..."
    # Inicia o NGINX em modo foreground
    nginx -g "daemon off;"
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

# Iniciar os serviços
start_nginx
nginx_pid=$!

start_angular_server
angular_pid=$!

# Configurar captura de sinais
trap 'handle_sigterm' SIGTERM SIGINT

# Manter o contêiner ativo
wait
