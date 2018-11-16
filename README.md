HOW TO COMPILE/RUN FRONTEND LOCALLY:
    Inside of the root directory for this project, run “npm install”
    Then, run “npm start”
    This will launch your default web browser, connected to the frontend localhosted server.

HOW TO RUN REACT FRONTEND TESTS:
    Inside of the root directory for this project, run “npm install” if you have not yet already.
    Run “npm test”

HOW TO RUN REACT WITH NODEJS ON SERVER:
    Inside of the root directory for this project, run “npm install”
    Then, run “npm run build”
    Then, run “sudo node server.js”
NOTICE: The server runs on port 80 which is usually reserved for most machines, if does not have the authority to run sudo, running this script is impossible

HOW TO RUN THE API SERVER:
    Go to the “routest/” directory.
    Then, run “npm install”
    Then, run “sudo npm start”
    Based on the IP address of the server, one can test the API by “http://[ip address]/Tasks”, “http://[ip address]/Subjects” and “http://[ip address]/Users”
NOTICE: The server itself should run a mysql service, with storing procedures defined in the database part.

HOW TO RUN MYSQL:
    The mySQL database files can be found in the DATABASE SETUP directory.
    Install mySQL
    Run the script “create.sql”
    
HOW TO BYPASS LOGIN : 
    under src/actions/userAction there is a function called sendCredentials(data, success). Uncomment success() and comment out the alert. The code will look like this :
    .......
    .catch(error => {
    success() 
    /* alert("Login server error. If this problem persists, contact admisnistrator") */
     })

