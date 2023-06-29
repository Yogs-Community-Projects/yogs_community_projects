#!/bin/zsh

file="archive.zip"

cd ./dist

if [ -e "$file" ]; then
    rm "$file"
    echo "File $file deleted."
else
    echo "File $file does not exist."
fi
zip -r archive.zip index.html mobile.html config.html assets/
