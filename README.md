# GlucoChef

## [See the App!](https://glucochef.netlify.app/)

## Description

###Glucochef is a recipe website designed for people with diabetes. It includes features such as carbohydrate content, meal portions, and ingredients tailored to the lifestyle of someone with diabetes.In addition to all this, it is an accessible website compatible with screen readers, as diabetes and low vision are unfortunately often related.

#### [Client Repo here](https://github.com/Albaperez26/GlucoChef-client)

#### [Server Repo here](https://github.com/Albaperez26/GlucoChef-server)

## Backlog Functionalities

####Implement a table of ingredients where you can add the quantity when adding the ingredient, and include a search bar for finding ingredients.

## Technologies used

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, Express, React, axios, React Context etc.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
}
```

Recipe model

```javascript
 {
  titulo: {type: String,required: true,},
  totalHC: {type: Number,required: true,},
  raciones: {type: Number,required: true,},
  photoURL: {type: String,required: true,},
  clasificacion: {type: String,required: true,},
  elaboracion: {type: String,required: true,},
  creador: {type: Schema.Types.ObjectId,ref: "User",},
  ingredientes: [{type: Schema.Types.ObjectId,ref: "Ingredients",},],
 }
```

Ingredient model

```javascript
 {
   nombre: {type: String,required: true},
    establecimiento: { type: String,required: true},
    hidratos: {type: Number,required: true},
    creador: {type: Schema.Types.ObjectId,ref: 'User'}
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                           | Description                                  |
| ----------- | ----------------------------- | -------------------------------------------- | --- | --- | ---------------------------------------------- |
| POST        | `/auth/signUp`                | Creates an user                              |
| GET         | `/auth/verify`                |                                              | 200 | 401 | Verifies the user Token                        |
| POST        | `/auth/login`                 | {username, password}                         | 200 | 400 | Validates credentials, creates and sends Token |
| GET         | `/recipes/:recipesId`         | Get the recipes from a specific user         |
| POST        | `/recipes`                    | Creates new recipe                           |
| PUT         | `/recipes/:recipesId`         | Updates a specific recipe                    |
| DELETE      | `/recipes/:recipesId`         | Deletes a specific recipe                    |
| GET         | ` /user`                      | gets the user page                           |
| PATCH       | ` /user`                      | Updates the user page                        |
| POST        | `/ingredients`                | Creates new ingredient(Solo admin)           |
| PUT         | `/ingredients/:ingredientsId` | Updates an ingredient ingredient(Solo admin) |
| DELETE      | /ingredients/:ingredientsId`  | Deletes a specific ingredient(Solo admin)    |

## Links

### Collaborators

[Alba Pérez](https://github.com/Albaperez26)

### Project

[Repository Link Client](https://github.com/Albaperez26/GlucoChef-client)

[Repository Link Server](https://github.com/Albaperez26/GlucoChef-server)

[Deploy Link](https://glucochef.netlify.app/)
