#!/bin/bash
cd /var/www/brn-app
git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
npm ci
npm run build
php artisan config:cache
php artisan route:cache
sudo supervisorctl restart laravel-worker:*
sudo systemctl restart reverb
sudo systemctl reload nginx
