# NittanyPath
A course information management system prototype
<br> **Mainly for people new to Spring and React**
<br> **Tech stack:** 
<br> Framework - Spring boot with Maven build 
<br> Backend - Java
<br> Frontend - React.js
<br> Database Server - MySQL
## Please follow the following guidelines to develop further on this project:
1. Clone this repo(Obviously!)
2. Download IntelliJ Ultimate(since we're using it as an IDE!)
3. Download Node.JS and npm to handle react stuff
4. After you clone this repo and download IntelliJ. Open the project in IntelliJ, go to the pom.xml file, right click and select Build as a Maven Project. This should import all the dependencies. 
5. to start the dev server for viewing and making changes in the frontend, go to the frontend/ directory and execute ` npm install` and `npm start` on command line. 
6. If you want your dev server to be able to talk to the REST APIs, open IntelliJ and execute `clean install` in the Maven command line, run the project normally or run the .JAR file created in the target/ directory. Now, your dev server is ready to talk to the backend! You can find both of them on a single port localhost:8080 
### Follow these steps to configure MySQL to the Spring Boot Application:
1. Download MySQL from https://mysql.com.
2. **MANDATORY** Create a database on mysql using the following steps: `mysql -u root -p`, then enter your password and execute `create database canvaspath`. 
3. The SQL Queries to be run can be found in query.txt in the data folder. 
4. Modify the file application.properties according to your own need to configure Hibernate to SQL. 
