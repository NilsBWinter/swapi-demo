#!/usr/bin/env sh

# abort on errors
set -e

# install yarn
npm i yarn

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git config user.name "GitHub Actions Bot"
# git config user.email "<>"

git init
git checkout -b main
git add -A
# git commit -m 'deploy'
git -c user.name='GitHub Actions Bo' -c user.email='<>' commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:NilsBWinter/swapi-demo.git main:gh-pages

cd -