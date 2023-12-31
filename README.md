# OSL-Fifth-Row-App
---
## [JavaScript Coding Convention ](https://www.w3schools.com/js/js_conventions.asp)

**Naming Convention**: camelCase
- every variable and function starts with a name eg: blueTooth = True
- constants and global variables (pls avoid global variables) are capital letters eg: PI = 3.14
- filenames use lowercase eg: picture.jpg

**Spaces:**
- every operation need a space -> eg: x = 1 + 2

**Indentation:**
- 4 spaces
- Use line breaks to separate logical sections of code.

**Object Rules**

General rules for object definitions:
- Place the opening bracket on the same line as the object name.
- Use colon plus one space between each property and its value.
- Use quotes around string values, not around numeric values.
- Do not add a comma after the last property-value pair.
- Place the closing bracket on a new line, without leading spaces.
- Always end an object definition with a semicolon.

```js
Example
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```
---

## Frontend

[Figma design](https://www.figma.com/file/e6LCGMBJwvEcE2QKydRHc4/Low-fidelity-prototype?type=design&node-id=0-1&t=Hl6P5sS0GO3vXqbU-0) | [Javascript tutorial](https://javascript.info/) | [React documentation](https://react.dev/) | [MUI component library](https://mui.com/material-ui/getting-started/overview/)

### Setup

1. Install Node.js and NPM
2. Run `git clone https://github.com/fillantrophy02/osl-fifth-row-app.git` on your terminal
3. Run `cd osl-fifth-row-app/frontend`
4. Run `npm i` to install all required packages
5. Run `npm start` and open [http://localhost:3000/](http://localhost:3000/) to test that the webapp is running on your computer

### Dev

1. Everyone has their own branch they can work on. Run `git branch -r` to see all remote branches
2. Run `git switch <your-branch>` to fetch your own branch
3. Run `git branch` to see which branch you're on and `git checkout <your-branch>` to switch to your own branch
4. Except for Login (cause I'm not sure where it should be placed), blank pages e.g. FifthRow_Homepage and OSL_EPFView have been created in the `/src/pages` folder and linked up to the sidebar. Please edit in these pages
5. In the process of working, feel free to commit & push to your own branch regularly
6. After your page has been created bug-free, run `git fetch origin main:main` to update the `main` branch
7. Run `git merge main` to merge the changes in the `main` branch into your branch; fix merge conflicts if arise
8. Run `git push` then go to [https://github.com/fillantrophy02/osl-fifth-row-app](https://github.com/fillantrophy02/osl-fifth-row-app). You'll see a banner stating an option to create a pull request from your branch; create the pull request and approve it. Your new page will now be updated in the `main` branch
