#!/bin/bash

perl -e 'for(1..260){print "$_\n"}' | \
  parallel -a - 'curl http://localhost:4000/apitrig/syncall?start={}\&count=100'