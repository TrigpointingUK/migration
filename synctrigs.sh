#!/bin/bash

perl -e 'for(0..260){print "$_\n"}' | \
  parallel --jobs 8 -a - 'curl http://localhost:4000/apitrig/syncall?start={}01\&count=100'