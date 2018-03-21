for f in *.json; do 
    echo $f
    echo "${f:0:10}.csv"
    # json2csv -i $f -o "${f:0:10}.csv"
done