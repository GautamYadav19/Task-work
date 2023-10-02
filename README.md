#installations needed
npm init
npm i bootstrap cors express express-validator mongoose nodemon

#paste this in package.json
"scripts": {
"ng": "ng",
"start": "ng serve",
"build": "ng build",
"watch": "ng build --watch --configuration development",
"test": "ng test",
"dev": "nodemon server/app.js"
},

#start the server
npm run dev (To start nodejs api's)
ng s -o (To start angular project)
