#!/bin/bash
file="commit.bsh"
blue="\033[1;34m"
nocolor="\033[0m"

add(){
	echo "adding files"
	git add *
	git reset -- $file
}

push(){
	echo "pushing files"
	git commit -m "$1"
	git push -u origin main
}

if [ "$1" ]; then
	add
	echo
	git status -s
	echo
	echo -n "Do you want to push ? [y/n] "
	read choice
	case $choice in
		y) push "$1";;
		n) exit 1;;
	esac
else 
	echo "Error: No commit message"
fi
