#! /usr/bin/env bash

yarn build

cp -v -r build/* ../

git add --all
git commit -m "Publish"
git push origin master
