# simple-crud-api
Simple CRUD API task at RS school

This app contains CRUD API using in-memory database underneath, to perform the following actions on an array of objects (persons)

- GET /person or /person/${personId} should return all persons or person with corresponding personId;

- POST /person is used to create record about new person and store it in database;

- PUT /person/${personId} is used to update record about existing person;
 
- DELETE /person/${personId} is used to delete record about existing person from database.

# How to use

## Prerequiremenst 
 Pull repository, run ```npm i ```, create .env file this PORT variable. 
1. Run the comand `npm run start:dev` in your terminal.
2. To checkup your requests on server recomended to use API Platform(Postman, RESTClient, etc.) If you  dont want to install separate API Platform you can install browser extension.
(for Chrome you can get it here https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo ).
3. Make your request:

- GET request with URL `http://localhost:{PORT}/person` to GET all persons;

- GET request with URL `http://localhost:{PORT}/person/{personId}` to GET person with corresponding personId;

- POST request with URL `http://localhost:{PORT}/person` to add person.  
    Person creates in a body of the POST request and has the object type.
    example:  
        **{   
                "name": "Ivan",  
                "age": 36,  
                "hobbies": ["sports", "coding" ] 
                }**.  
ID will be generated automaticali with uuid.

*NOTE: all the object properties are required and their values must be of the set types(String for "name", Number for "age", Array for "hobbies")

- PUT request with URL `http://localhost:{PORT}/person/{personId}` to edit person with corresponding personId. 
    Person eddings requared in the body of the PUT request and also has the object type.
    example:  
        **{ 
                "age": 20,  
                "hobbies": ["gaming", "chating"] 
                }**.  

*NOTE: NOT all the object properties are required but their values must be of the set types (String for "name", Number for "age", Array for "hobbies").

-DELETE request with URL `http://localhost:{PORT}/person/{personId}` to delete person with corresponding personId.













