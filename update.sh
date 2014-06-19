#!/bin/bash
makejs build-uncompressed
rm -r /var/www/_h5ai/
mv build/_h5ai/ /var/www/
chown www-data:www-data /var/www/_h5ai/cache/
