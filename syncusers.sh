#!/bin/bash

perl -e 'for(0..195){print "$_\n"}' | \
  parallel --jobs 1 -a - 'curl http://localhost:4000/apiuser/syncall?start={}01\&count=100'