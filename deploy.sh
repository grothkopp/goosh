#!/bin/bash

echo "deploy goosh.org";
echo "wget goosh.js";
#wget http://gshell.grothkopp.com/goosh.js -O goosh.js.uncompr -o /dev/null
#wget http://n.goosh.org/g.php -O goosh.js.uncompr -o /dev/null
php g.php >goosh.js.uncompr

echo "compress goosh.js";
java -jar yui/yuicompressor-2.3.5/build/yuicompressor-2.3.5.jar --type js goosh.js.uncompr -o goosh.js.compr.tmp

echo "gzip"

cat goosh.js.compr.tmp |sed s\#gshell.grothkopp.com\#goosh.org\#g |sed s\#ABQIAAAA0cXSEVCNSwf_x74KTtPJMRShYK5vgJfK0afUKMRqjECszDItkhTOIyZ74499O_ys5nJIQuP4sq4nZg\#ABQIAAAA0cXSEVCNSwf_x74KTtPJMRQP4Q7D8MPck7bhT7upyfJTzVDU2BRxkUdd2AvzlDDF7DNUJI_Y4eB6Ug\#g >goosh.js.compr

wget 'http://n.goosh.org/?deploy=1' -O goosh.html -o /dev/null

#exit
echo "copy files"

cp ../goosh.org/index.html ../goosh.org/index.html-autosave
cp goosh.html ../goosh.org/index.html
#echo "gzip"

