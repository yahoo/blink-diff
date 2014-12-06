#!/bin/sh

../bin/blink-diff --verbose --compose-ltr --hide-shift --output YDN_Upper_output.png YDN.png YDN_Upper.png
../bin/blink-diff --verbose --compose-ltr --hide-shift --output YDN_Missing_output.png YDN.png YDN_Missing.png
../bin/blink-diff --verbose --compose-ltr --hide-shift --block-out 520,750,75,100 --block-out 50,50,100,100 --output YDN_Swap_output.png YDN.png YDN_Swap.png
../bin/blink-diff --verbose --compose-ltr --hide-shift --output YDN_Color_output.png YDN.png YDN_Color.png
../bin/blink-diff --verbose --compose-ltr --hide-shift --output YDN_Sort_output.png YDN.png YDN_Sort.png
../bin/blink-diff --verbose --compose-ltr --hide-shift --delta 25 --output YDN_Multi_output.png YDN.png YDN_Multi.png
