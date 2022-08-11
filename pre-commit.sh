#!/bin/bash

# $1 type e.g. info, succes, warning or error
# $2 message to log
function log {
  local bold=$(tput bold)
  local red=$(tput setaf 1)
  local green=$(tput setaf 2)
  local yellow=$(tput setaf 3)
  local cyan=$(tput setaf 6)
  local normal=$(tput sgr0)
  local name="[inews-react]"

  case $1 in
    info)
      echo -e "$bold$cyan$name$normal $2"
      ;;
    error)
      echo -e "$bold$red$name$normal $2"
      ;;
    warning)
      echo -e "$bold$yellow$name$normal $2"
      ;;
    success)
      echo -e "$bold$green$name$normal $2"
      ;;
  esac
}

# $1 filetype name (used in output) e.g js|jsx or css|scss
# $2 npx linter to run e.g. eslint or stylelint
# $3 regex to grep files from staged files e.g \.(js|jsx)$
# $4 additional flags for command
function lint-staged {
  # Grab all of the staged files for lint
  fileList=$(git diff --diff-filter=d --name-only --cached | grep -E $3)
  # Only run lint if there are staged files.
  if [ ${#fileList} -ne 0 ];
    then
      log info "Attempting to lint staged $1 files."
      log info "Running $2"
      npx $2 ${fileList[*]} --fix $4
      if [ $? -ne 0 ];
        then
          log error "Please fix the above $2 issues."
          exit 1
        else
          log success "$2 linting has passed."
      fi
    else
      log info "There are no staged $1 files to lint"
  fi
}

# Checking that there are staged files, will exit with 0 if none
staged=$(git diff --diff-filter=d --name-only --staged)
if [ ${#staged} -ne 0 ];
  then
    log info "Commencing pre-commit checks..."
    # If there are any unstaged files it will exit with 1
    unstaged=$(git diff --diff-filter=d --name-only)
    if [ ${#unstaged} -gt 0 ];
      then
        log error "You have unstaged files. Please stage them before committing. Exiting..."
        exit 1
    fi
  else
    exit 0
fi

# Running eslint
lint-staged "js|jsx" eslint "\.(js|jsx)$"

# Running stylelint
lint-staged "css|scss" stylelint "\.(css|scss)$" "--allow-empty-input"

# Running tests related to staged files
log info "Perfoming any tests related to the staged files."
npx jest -o
if [ $? -ne 0 ];
  then
    log error "Please address the tests that have failed."
    exit 1
  else
    log success "Testing has passed."
fi

# Add any changes the linters auto fixed
git add .

log success "All pre-commit checks have passed"
exit 0
