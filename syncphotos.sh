#!/bin/bash

perl -e 'for(0..3196){print "$_\n"}' | \
  parallel --jobs 32 -a - 'curl http://localhost:4000/apiphoto/syncall?start={}01\&count=100'