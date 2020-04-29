### create

- POSTMAN -> url - POST /users {username, email, name}
- capture user info
- create a file using the username and save all user related info into that file
- open a file and ensure that username doesnot already exist
- if exists, throw error
- create a file using username
- write to that file
- close the file

-respond to the client

## Read

- postman => GET /users?username=user1

## Update

- POSTMAN -> PUT /users?username=dkjshf {}

fs.open ->
fs.ftruncate
fs.writeFile
fs.close
send the response

## Delete

DELETE -> /users?username=user1

fs.unlink
