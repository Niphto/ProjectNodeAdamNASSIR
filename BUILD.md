In pgAdmin, you need to have a server with the following database: CardLearning
With the following User as owner of the database : CardLearningUser

In the backend-nodejs directory: node syncdatabase.js  (to sync the database, also if you want to just restart the database and remove all changes done, do this again)

In the backend-nodejs directory: node index.js

In a new cmd, while keeping the previous one still running, in the frontend-angular directory: ng serve

Go to http://localhost:4200/#
