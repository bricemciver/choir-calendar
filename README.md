# Choir Calendar
[![Typescript](https://img.shields.io/badge/</>-typescript-4285f4)](https://www.typescriptlang.org/)
[![Clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

This project contains the Typescript that generates the St. Paul's Lenexa UMC Choir Calendar sync. It takes information
from the choir spreadsheet and adds it to the choir calendar. While it is specific to that particular spreadsheet, the
code can serve as a template for how to take information from a spreadsheet with a date column and turn it into a 
calendar entry.

These instructions are meant to help you orient to the development environment.
They are not exhaustive but can be used as guidelines.

## Setup

### Initial Global Installs (if not met already)
```sh
# Install typescript globally
npm install -g typescript

# Install clasp globally and login
npm install -g @google/clasp
```

clasp### [Clasp](https://github.com/google/clasp) Details
```sh
# Login with google credentials
clasp login

# Logout at end of session
clasp logout
```

Update `scriptId` in Project Settings File (`.clasp.json`) to match target Google Apps Script

> Find Script ID in URL of the GAS editor:  
> <div>https://script.google.com/home/projects/[ scriptId ]/edit</div>
<br>


### Local Installs
As detailed by `package.json` (or `package-lock.json`) file
```sh
# Install dependencies locally
npm install
```

## Linting via [gts](https://github.com/google/gts)
```sh
# Scripts (autogenerated by gts):
npm run lint
npm run clean
npm run compile
npm run fix
npm run prepare
npm run pretest
npm run posttest
```
Performs linting following Google's TypeScript style guide (using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)).  

## Essential [Clasp](https://github.com/google/clasp) Commands
```sh
# Pull files from the linked Google Apps Script project
clasp pull

# Push files to the linked Google Apps Script project
clasp push [--watch] [--force]
```