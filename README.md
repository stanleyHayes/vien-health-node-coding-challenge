# Solution for Vien Health Challenge
---
## Installation  
Use the package manager npm to install all dependencies of this application
Make sure you are in the root folder of the application before running this code
```sh
npm install
```

## Usage

* make a post request to /api/register to register a new user. 
    * requires email, password, name as body
    * This route returns a jwt token if successful | 
    400 bad request error code for a missing param or email matching existing email
* make a post request to /api/login to log in an existing user.
    * requires email, password
    * Returns a jwt token if successful | 400 bad request error code for missing input 
    or email not found in the system or password not matching email account
* make a get request to /api/profile to get profile information of logged in user
    * requires jwt token to be present in headers under Authorisation
    * returns email of logged in user or 401 if no token is found in the header
* make a get request to /api/logout to log out exiting logged in user
    * requires jwt token to be present in headers under Authorisation
    * returns {} is successful or 400 bad request if no jwt token is found in the header

## Testing
I have already included your test from [Vien Health Repo](https://github.com/Vien-Health/node-js-coding-challenge/blob/master/test/integration/controllers.js)
To run the test issue the command
```sh
    npm run test
```