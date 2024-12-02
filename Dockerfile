# Etapa 1: Construção do Frontend Angular
FROM node:20-alpine as build-frontend

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de dependências para cache
COPY ./frontend/package*.json /app/

# Instalar dependências com cache otimizado
RUN npm install

# Copiar o restante do código após instalar as dependências
COPY . /app/

# Executar o build SSR (browser e server)
RUN npm run build:ssr

# Etapa 2: Configuração do contêiner final
FROM nginx:alpine

# Instalação de Node.js e utilitários
RUN apk add --no-cache nodejs npm openssl bash

# Diretório de trabalho
WORKDIR /app

# Copiar build do Angular (browser e server)
COPY --from=build-frontend /app/dist/web-my-daily/browser /usr/share/nginx/html/browser
COPY --from=build-frontend /app/dist/web-my-daily/server /app/server

# Copiar arquivo de configuração do NGINX
COPY ./nginx.conf /etc/nginx/nginx.conf

# Instalar dependências do Angular Server
COPY ./package*.json /app
RUN npm install --only=production

# Copiar script de inicialização
COPY ./start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expor portas
EXPOSE 80 443

# Comando de inicialização
CMD ["/app/start.sh"]
