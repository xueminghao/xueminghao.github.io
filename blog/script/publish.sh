#! /usr/bin/env bash

yarn build

cp -v -r build/* ../

git add *
git commit -m "Publish"
git push origin master
