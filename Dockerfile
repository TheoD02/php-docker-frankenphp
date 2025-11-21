# syntax=docker/dockerfile:1.4

FROM composer:2.9 AS composer-official
FROM node:22-alpine AS node-official

# ==============================================================================
# Base FrankenPHP + Caddy avec PHP 8.4 sous Debian Trixie
# ==============================================================================
FROM dunglas/frankenphp:php8.4.15-trixie AS php-base

ENV SERVER_NAME=":8080"

# Installer les dépendances système essentielles
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN groupmod -g 1000 www-data \
    && usermod -u 1000 -g 1000 www-data \
    && chown -R www-data:www-data /app /var/www

# ==============================================================================
# Base commune pour tous les environnements avec versioning, healthcheck, etc.
# ==============================================================================
FROM php-base AS app-base

ARG BUILD_DATE
ARG BUILD_VERSION=1.0.0
ARG VCS_REF

ENV APP_VERSION=${BUILD_VERSION}
ENV APP_BUILD_DATE=${BUILD_DATE}
ENV APP_BUILD_TIME=${BUILD_DATE}
ENV APP_VCS_REF=${VCS_REF}

EXPOSE 8080

COPY --chmod=644 docker/caddy/Caddyfile /etc/caddy/Caddyfile

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 CMD curl -f http://localhost:2019/metrics || exit 1

CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]

# ==============================================================================
# Stage: composer-base
# ==============================================================================
FROM app-base AS composer-base

COPY --from=composer-official /usr/bin/composer /usr/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME=/tmp/composer
ENV COMPOSER_CACHE_DIR=/tmp/composer/cache

# ==============================================================================
# Stage: composer-prod
# Installation des dépendances de production
# ==============================================================================
FROM composer-base AS composer-prod

COPY --chown=www-data:www-data composer.json composer.lock ./

RUN --mount=type=cache,target=/tmp/composer/cache,uid=1000,gid=1000 \
    composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --classmap-authoritative

COPY --chown=www-data:www-data . .

RUN --mount=type=cache,target=/tmp/composer/cache,uid=1000,gid=1000 \
    composer dump-autoload --optimize --classmap-authoritative

# ==============================================================================
# Installation des dépendances de développement
# ==============================================================================
FROM composer-base AS composer-dev

COPY --chown=www-data:www-data composer.json composer.lock ./

RUN --mount=type=cache,target=/tmp/composer/cache,uid=1000,gid=1000 \
    composer install \
    --no-scripts \
    --no-interaction \
    --prefer-dist

COPY --chown=www-data:www-data . .

RUN --mount=type=cache,target=/tmp/composer/cache,uid=1000,gid=1000 \
    composer dump-autoload --optimize

# ==============================================================================
# Stage: node-build
# ==============================================================================
FROM node-official AS node-build

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY assets ./assets
COPY vite.config.ts tsconfig.json tsconfig.*.json ./

RUN npm run build

# ==============================================================================
# Stage: prod
# ==============================================================================
FROM app-base AS prod

ENV APP_ENV=prod
ENV APP_DEBUG=0

COPY docker/php/php-prod.ini /usr/local/etc/php/conf.d/zzz-app.ini

COPY --chmod=644 docker/caddy/Caddyfile /etc/caddy/Caddyfile

COPY --from=composer-prod --chown=www-data:www-data /app/vendor ./vendor

# COPY --from=node-build --chown=www-data:www-data /app/public/build ./public/build

COPY --chown=www-data:www-data . .

RUN mkdir -p var/cache var/log var/sessions /data/caddy /config/caddy \
    && chown -R www-data:www-data var /data/caddy /config/caddy \
    && chmod -R 775 var

USER www-data

# ==============================================================================
# Stage: staging
# ==============================================================================
FROM prod AS staging

# same for now

# ==============================================================================
# Stage: dev
# ==============================================================================
FROM app-base AS dev

ENV APP_ENV=dev
ENV APP_DEBUG=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer-official /usr/bin/composer /usr/bin/composer

COPY --from=node-official /usr/lib /usr/lib
COPY --from=node-official /usr/local/lib /usr/local/lib
COPY --from=node-official /usr/local/include /usr/local/include
COPY --from=node-official /usr/local/bin /usr/local/bin

COPY docker/php/php-dev.ini /usr/local/etc/php/conf.d/zzz-app.ini

COPY --chown=www-data:www-data . .

RUN mkdir -p var/cache var/log var/sessions /data/caddy /config/caddy \
    && chown -R www-data:www-data var /data/caddy /config/caddy \
    && chmod -R 775 var

USER www-data

EXPOSE 5173
