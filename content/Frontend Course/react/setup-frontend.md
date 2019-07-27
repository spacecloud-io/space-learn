---
title: "Setup the Frontend"
description: We need to setup our frontend porject
date: 2019-07-16T20:11:26+05:30
draft: true
weight: 4
---

Uptill now we have set up our backend which is nothing but Space Cloud connected with MongoDB. It’s been a lot of theory, exploration and configuration.

Now it's our turn to get to the fun part, and that is code. I’ll be talking about how to initialise and make the `space-api` client globally available in the project

## Setup the Boilerplate

Since react is beyond the scope of this tutorial, we’ll be cloning a repo I’ve already made which serves as boilerplate. Start by cloning the repo using the following command

```
git clone github.com/spaceuptech/react-todo-app.git
```

The master branch has the final version of the app. You can simply run `npm i` and then `npm start` to start playing around with it.

Checkout to the branch `step 0`. That’s the version we’ll be working on. Hit `npm install` and `npm start` so we can see what we already have. 

So we have a basic login page, along with a sign up page. Since there is no auth anyone can simply login. We can even add todos here and play around a little. But nothing will survive a page refresh since no data is persisted.

Our folder structure might look something like this:

```
react-todo-app/
|-- node_modules/
|-- public/
|-- src/
|   |-- pages/ 
|   |   |-- sign-in/
|   |   |   |-- SignIn.jsx
|   |   | 
|   |   |-- sign-up/
|   |   |   |-- SignUp.jsx
|   |   | 
|   |   |-- todo/
|   |   |   |-- Todo.jsx
|   |   | 
|   |-- services/
|   |   |-- service.js
|   |  
|   |-- App.js
|   |-- index.js
```

There must more files present in our project, But, we'll be focusing mainly on the file present in the `pages` and `services` directories.

There is usually a components folder as well. All the react components and even the containers (if you are using redux) reside in the components directly. The pages merely use these components and have a little bit of the binding. But since this app is fairly basic, we have everything inside the pages directory.

Apart from pages, we also have a services folder. It doesn’t have much as of now, But all our server binding code will pretty much live here. 

There is a service.js which exports the Service class. It has a method to generate unique strings right now. The service class is what will house the server related apis. Stuff like login, signup, add todo and so on will be residing here. You can always spit this service file into small chunks to separate out the code in separate files. For this tutorial, we’ll keep things in one file.

Great. Now since we have got the formalities out of the way, I think I should seriously start writing some code or else you will definitely kill me.

So the first step is to install the space-api client library in our project. So let’s go to the terminal and run the following command

```
npm install --save space-api.
```

Since we have got that out of the way. Let’s open up our `service.js` file. Lets import the API object from our freshly installed library. It will look something like this:

```
import { API } from 'space-api';
```

Now in the constructor, we’ll create an instance of this api. The first parameter to the constructor is our project id and the second one is the url. We should be getting these from the constructor.
```
this.api = new API(projectId, url);
```

That’s all we need to initialize the space-api.

We also need to create a mongo db object since that’s the database we will be using. That would look like

```
this.db = api.Mongo()
```
If you wanted to use any other database, it would be as simple as changing the mongo to mysql or postgres or any other supported database. Let’s leave it to mongo for now.

So our final `constructor` will look like:

```
constructor(projectId, url) {
  this.api = new API(projectId, url);
  this.db = api.Mongo();
}
```

Now inside the `src` folder, we’ll create a `client.js` file. Let's import our service class and create a service object. We also need to export this object. The project id is `todo-app`. The url is the location where space cloud is running which is `http://localhost:4122`.

So our `client.js` file will look something like this:

```
import Service from './services/service';

const client = new Service('todo-app','http://localhost:4122');
export default client;
```


We’ll be using this client object in our components folder. This basically serves to abstract all the binding logic so our components get a neat api to consume.

I guess that’s enough for this topic. The next topic is super exciting. We’ll pouncing into code straightaway and bind the sign in and sign up functionality. It’s going to be a lot of fun.
