#!/bin/bash

# Função para configurar certificados SSL com base no ambiente
configure_ssl_certificates() {
    echo "Configurando certificados SSL para o ambiente: $ENVIRONMENT"

    if [[ "$ENVIRONMENT" == "local" ]]; then
        echo "Usando certificados locais..."
        export SSL_CERTIFICATE="/etc/ssl/certs/api.innovatenet.local.crt"
        export SSL_CERTIFICATE_KEY="/etc/ssl/private/api.innovatenet.local.key"
    elif [[ "$ENVIRONMENT" == "production" ]]; then
        echo "Usando certificados de produção..."
        export SSL_CERTIFICATE="/etc/letsencrypt/live/www.innovatenet.com.br/fullchain.pem"
        export SSL_CERTIFICATE_KEY="/etc/letsencrypt/live/www.innovatenet.com.br/privkey.pem"
    else
        echo "Ambiente desconhecido, usando certificados padrão..."
        export SSL_CERTIFICATE="/etc/ssl/certs/default.crt"
        export SSL_CERTIFICATE_KEY="/etc/ssl/private/default.key"
    fi

    # Verifique se os arquivos existem
    if [[ ! -f "$SSL_CERTIFICATE" || ! -f "$SSL_CERTIFICATE_KEY" ]]; then
        echo "Erro: Certificados SSL não encontrados! Certificado: $SSL_CERTIFICATE, Chave: $SSL_CERTIFICATE_KEY"
        exit 1
    fi

    if [[ -z "$SSL_CERTIFICATE" || -z "$SSL_CERTIFICATE_KEY" ]]; then
        echo "Erro: Certificados SSL não configurados!"
        exit 1
    fi
}

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
