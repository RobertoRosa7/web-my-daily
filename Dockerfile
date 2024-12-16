# Etapa 1: Construção do Frontend Angular
FROM node:20.11.1-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de dependências para cache
COPY ./package*.json /app/

# Instalar dependências com cache otimizado
RUN npm install

# Copiar o restante do código após instalar as dependências
COPY . .

ARG DEPLOY_ENVIRONMENT

RUN echo "Deploy environment: $DEPLOY_ENVIRONMENT"

# Definir a variável de ambiente no contêiner após o build
ENV DEPLOY_ENVIRONMENT=${DEPLOY_ENVIRONMENT}

# Executar o build SSR (browser e server)
RUN npm run build:$DEPLOY_ENVIRONMENT

# Etapa 2: Configuração do contêiner final
FROM nginx:alpine

# Instalação de Node.js e utilitários
RUN apk add --no-cache nodejs npm openssl bash

# Copiar build do Angular (browser e server)
COPY --from=builder /app/dist/browser /usr/share/nginx/html
COPY --from=builder /app/dist/browser/index.csr.html /usr/share/nginx/html/index.html
COPY --from=builder /app/dist/server /app/server

# Copiar arquivo de configuração do NGINX
COPY ./nginx.conf /app/nginx.conf

# Instalar dependências do Angular Server
# COPY ./package*.json /app
# RUN npm install --only=production

# Copiar script de inicialização
COPY ./start.sh /app/start.sh
# COPY ./ /app/

RUN chmod +x /app/start.sh

# Expor portas
EXPOSE 80

# Comando de inicialização
CMD ["/app/start.sh"]
