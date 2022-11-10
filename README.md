# Setup
1. Install postgres database on local
2. CREATE DATABASE in your local database
3. Modify app.module.ts (lines 13 to 15) with the credentials of your database

# Instructions
We are creating an API for a todo list app. Your API should be able to:
* Create a TODO item
* Update a TODO item
* Read a TODO item given its id
* Get all TODO items
* Delete a TODO item given its id

A TODO item will look like:
```
{
  title: "Test Title",
  body: "Hello world"
}
```