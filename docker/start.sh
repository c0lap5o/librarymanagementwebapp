#!/bin/bash
#Import .env variables
source .env

update_api_url(){
# Set variables
JS_FILE="$(pwd)/../librarymanagementsystem/src/main/webapp/WEB-INF/templates/static/js/index.js"
NEW_URL="http://localhost:${HOST_APP_PORT}/${APP_NAME}/api/books/"
#Check if file exists
echo "Reading js file"

if [ ! -f "$JS_FILE" ]; then
	echo "ERROR: JavaScript file not fount at $JS_FILE"
	exit 1
fi

# Read the existing URL from the file
echo "Reading URL from js file"

OLD_URL=$(grep -oP "const apiUrl = '\K[^']+" "$JS_FILE")

if [ -z "$OLD_URL" ]; then
    echo "Error: Couldn't find apiUrl in $JS_FILE"
    exit 1
fi

echo "Old URL: $OLD_URL"
echo "New URL: $NEW_URL"

# Use sed to replace the old URL with the new one
echo "Replacing URL..."

sed -i "s|${OLD_URL}|${NEW_URL}|g" "$JS_FILE"

if [ $? -eq 0 ]; then
	echo "API URL updated successfuly in $JS_FILE"
else
	echo "Error: Failed to update API URL in $JS_FILE"
	exit 1
fi


}

#update api url based on the env variables
update_api_url || { echo "Error updating API URL";exit 1; }
#cd into app dir
cd ../librarymanagementsystem ||{ echo "librarymanagementsystem dir not found"; exit 1; }
#build the app (.war)
mvn clean package -Dapp.name=${APP_NAME} || { echo "Error building the app check your maven configuration"; exit 1; }
#copy the war app to myapps dir
cp target/${APP_NAME}.war ../docker/myapps || { echo "Error copying target.war to ../docker/myapps"; exit 1; }
cd ../docker || { echo "Error changing directory to ../docker"; exit 1; }
docker-compose up --build -d





