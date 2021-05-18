#!/usr/bin/env bash

# switch to root dir
cd `dirname $0`
cd ../../

# set variables
CODE_DIR="blog"
TAGS="=============="

# build
cd blog 
yarn install
yarn build
cd -

# remove all except blog directory
echo $TAGS Clearing $TAGS
for item in *
do
	if [ -f $item ]
       	then
		echo Removing file '\t' $item...
		rm $item
	elif [ -d $item ] && [ $item != $CODE_DIR ]
       	then
		echo Removing dir '\t' $item...
		rm -rf $item
	fi
done
echo $TAGS Done $TAGS
echo

# move files under build dir to root dir
echo $TAGS Moving $TAGS
mv -v blog/build/* .
echo $TAGS Done $TAGS
echo

# commit & push
echo $TAGS Publishing $TAGS
git add --all
git commit -m "Publish"
git push origin master
echo All done!!!
