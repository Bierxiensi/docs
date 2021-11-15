#!/usr/bin/env sh
 
# 确保脚本抛出遇到的错误
set -e

git pull

git push -f git@github.com:Bierxiensi/docs.git master:master