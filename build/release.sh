#!/usr/bin/env sh
set -e

git checkout master
git merge dev

VERSION=`npx select-version-cli`

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION npm run dist

  # ssr test
  node test/ssr/require.test.js            

  # publish theme (skipped - theme is included in main package)
  # echo "Releasing theme-chalk $VERSION ..."
  # cd packages/theme-chalk
  # npm version $VERSION --message "[release] $VERSION"
  # if [[ $VERSION =~ "beta" ]]
  # then
  #   npm publish --tag beta
  # else
  #   npm publish
  # fi
  # cd ../..

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  
  # update version in package.json
  node -e "const fs=require('fs'); const pkg=JSON.parse(fs.readFileSync('package.json')); pkg.version='$VERSION'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"
  git add package.json
  git commit -m "[release] $VERSION"
  git tag "v$VERSION"

  # publish
  git push origin master
  git push origin refs/tags/v$VERSION
  git checkout dev
  git rebase master
  git push origin dev

  # publish to npm with public access (for scoped packages)
  if [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta --access public
  else
    npm publish --access public
  fi
fi
