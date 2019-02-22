#!/bin/bash

cd "${0%/*}"

base="../../../../../packages/connection/protobuf/"
output="../../lib/protobuf"
index=$output/protobuf.pb.h

rm -rf $output
mkdir -p $output

for filename in $base**/*.proto; do
  new_path=${filename%.proto}.pb
  new_path=$output/${new_path#*$base}
  echo $new_path
  mkdir -p $(dirname $new_path)

  protoc --proto_path=$(dirname $filename) -o $new_path $filename

  echo "#include \"${new_path#*$output/}.h\" " >> $index
done
python nanopb/nanopb_generator.py $output/**/*.pb

# protoc -o message.pb t.proto;

