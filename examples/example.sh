#!/bin/sh

../bin/blink-diff --verbose --output wikipedia_hidden_regression_output.png wikipedia_approved.png wikipedia_hidden_regression.png
../bin/blink-diff --verbose --output wikipedia_sorting_regression_output.png wikipedia_approved.png wikipedia_sorting_regression.png
../bin/blink-diff --verbose --output wikipedia_style_regression_output.png wikipedia_approved.png wikipedia_style_regression.png
../bin/blink-diff --verbose --output wikipedia_text_regression_output.png wikipedia_approved.png wikipedia_text_regression.png
