#!/bin/bash
# makejs build-uncompressed
makejs release
rm -r /var/www/_h5ai/
cp build/_h5ai/*.* /var/www/
chown www-data:www-data /var/www/_h5ai/cache/
chmod 775 /var/www/_h5ai/cache/
