#!/bin/bash

perl -e 'for(0..3886){print "$_\n"}' | \
  parallel --jobs 8 -a - 'curl http://localhost:4000/apilog/syncall?start={}01\&count=100'