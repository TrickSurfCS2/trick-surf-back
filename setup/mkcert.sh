#!/bin/bash

# Arch
sudo pacman -Syu mkcert

mkcert -install
mkcert localhost

mv localhost-key.pem ./ssl
mv localhost.pem ./ssl