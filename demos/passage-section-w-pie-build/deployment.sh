#!/usr/bin/env bash

rm -fr artifact.tgz
rm -fr slug.tgz
rm -fr deployment 

app=$1


mkdir deployment

read -r -d '' PKG << EOM
{
  "name" : "deployment",
  "version" : "1.0.0",
  "engines" : {
    "node" : ">=6.2.2"
  },
  "dependencies" : {
    "node-static" : "^0.7.9"
  }
}
EOM

echo "$PKG" >> deployment/package.json

read -r -d '' PROCFILE << EOM
web: ./node-v6.2.2-linux-x64/bin/node server.js
EOM
echo "$PROCFILE" >> deployment/Procfile 

read -r -d '' SERVER << EOM
var static = require('node-static');
var file = new static.Server(process.cwd()); 

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 5000);

console.log('done!');
EOM
echo "$SERVER" >> deployment/server.js 


cp index.html deployment/index.html
cp passage.html deployment/passage.html
cp pie.js deployment/pie.js
cp additional.bundle.js deployment/additional.bundle.js 
cp controllers.js deployment/controllers.js 

cd deployment 
npm install 
cd ..

tar -czvf artifact.tgz -C deployment .  

cbt slug-mk-from-artifact-file\
 --artifact-file=artifact.tgz\
 --out-path=slug.tgz\
 --platform=node-6.2.2

cbt slug-deploy-from-file\
 --heroku-app=$app\
 --slug-file=slug.tgz



