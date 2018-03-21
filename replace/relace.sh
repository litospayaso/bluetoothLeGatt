for f in *.json; do 
    sed -i "s/\"/'/g" $f
    sed -i "s/: '/: \"/g" $f
    sed -i "s/',/\",/g" $f
    sed -i "s/date: \"/\"date\": \"/g" $f
    sed -i "s/fav: \"/\"fav\": \"/g" $f
    sed -i "s/id: \"/\"id\": \"/g" $f
    sed -i "s/rt: \"/\"rt\": \"/g" $f
    sed -i "s/text: \"/\"text\": \"/g" $f
    sed -i "s/url: \"/\"url\": \"/g" $f
    sed -i "s/' }/\" },/g" $f
    sed -i '1i [' $f
    sed -i '$ s/.$//' $f
    echo ] >> $f
done