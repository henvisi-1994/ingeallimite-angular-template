# =============================
# Etapa 1: Build del Frontend
# =============================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN ng build --configuration production

# =============================
# Etapa 2: Servir con Apache
# =============================
FROM httpd:2.4-alpine

# Copiar el build de Angular y el .htaccess
COPY --from=build /app/dist/ingeallimite-angular-template1/browser /usr/local/apache2/htdocs/
COPY --from=build /app/.htaccess /usr/local/apache2/htdocs/.htaccess

# Crear carpeta conf.d y habilitar mod_rewrite y .htaccess
RUN mkdir -p /usr/local/apache2/conf/conf.d && \
    echo "LoadModule rewrite_module modules/mod_rewrite.so" > /usr/local/apache2/conf/conf.d/rewrite.conf && \
    echo '<Directory "/usr/local/apache2/htdocs">' >> /usr/local/apache2/conf/conf.d/rewrite.conf && \
    echo '    Options Indexes FollowSymLinks' >> /usr/local/apache2/conf/conf.d/rewrite.conf && \
    echo '    AllowOverride All' >> /usr/local/apache2/conf/conf.d/rewrite.conf && \
    echo '    Require all granted' >> /usr/local/apache2/conf/conf.d/rewrite.conf && \
    echo '</Directory>' >> /usr/local/apache2/conf/conf.d/rewrite.conf

EXPOSE 80
CMD ["httpd-foreground"]
