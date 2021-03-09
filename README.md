# Jean_Station_Online

-In this project we have tried to implement docker and docker compose for all the microservices.

-The Wireframe_jeanStation.pdf sets a basic wireframe for jeanstation online.

-All the Apis and the react application are accompanied with test cases.

- clone the repo in a new folder 
- open the folder 'DbScripts'
- run the scripts for discount , PSSDb and UserDb in the sql server
- copy the path of AuthmongoScript and in the command prompt write:
		mongo < {path\AuthmongoScript.mjs}
- now your database is ready

Primary plan: open command prompt from that folder and run the following commands
- docker-compose build
- docker-compose up
If this does not work and runs all the APIs

Secondary plan: In the pulled folder, open the folder SeperateApis and run all the apis one by one.

run the following api
- Gateway
- AuthApi
- BaseApi2
- OrderDiscountApi
- UserApi2

Now, go to react_jeanstation
- open cmd from there
- type code .
- now run "npm install"
- and "npm start"

Now your application should be running in the browser. 
Enjoy placing orders on JeanStation.