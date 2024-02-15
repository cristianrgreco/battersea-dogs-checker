#!/bin/bash

while true;
do    
    clear
    npm start --silent

    if [ $? -eq 0 ]; then
      case "$(uname -sr)" in
         Darwin*)
           osascript -e 'display notification "DOG AVAILABLE!" with title "Battersea Homes Dog Checker"'
           ;;
         Linux*)
           kdialog --passivepopup 'DOG AVAILABLE!' 60
           ;;
      esac
    fi

    sleep 10
done
