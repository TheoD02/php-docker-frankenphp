#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DB_HOST="${DB_HOST:-symfony-perso-database}"
DB_PORT="${DB_PORT:-3306}"
MAX_RETRIES="${MAX_RETRIES:-30}"
RETRY_INTERVAL="${RETRY_INTERVAL:-2}"

echo -e "${YELLOW}Starting container initialization...${NC}"

# Function to wait for database
wait_for_database() {
    echo -e "${YELLOW}Waiting for database to be ready...${NC}"

    local retries=0
    while [ $retries -lt $MAX_RETRIES ]; do
        if php bin/console dbal:run-sql "SELECT 1" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ Database is ready${NC}"
            return 0
        fi

        retries=$((retries + 1))
        if [ $retries -lt $MAX_RETRIES ]; then
            echo -e "${YELLOW}Database not ready yet. Attempt $retries/$MAX_RETRIES. Retrying in ${RETRY_INTERVAL}s...${NC}"
            sleep $RETRY_INTERVAL
        fi
    done

    echo -e "${RED}✗ Database connection failed after $MAX_RETRIES attempts${NC}"
    return 1
}

# Function to run migrations
run_migrations() {
    echo -e "${YELLOW}Running database migrations...${NC}"

    if php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration; then
        echo -e "${GREEN}✓ Migrations completed successfully${NC}"
        return 0
    else
        echo -e "${RED}✗ Migration failed${NC}"
        return 1
    fi
}

# Main initialization for production/staging environments
if [ "$APP_ENV" = "prod" ] || [ "$APP_ENV" = "staging" ]; then
    echo -e "${YELLOW}Running production initialization...${NC}"

    # Wait for database
    wait_for_database || exit 1

    # Run migrations
    run_migrations || exit 1

    echo -e "${GREEN}✓ Container initialization completed${NC}"
fi

# Execute the main container command
echo -e "${YELLOW}Starting application...${NC}"
exec "$@"
