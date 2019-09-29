---
title: "Configure Space Cloud"
description: Create a project and instruct Space Cloud to work with your database.
date: 2019-08-03T00:00:00+05:30
draft: false
weight: 3
---

Now that we have Space Cloud up and running, we need to configure it for our project. By default, Space Cloud does absolutely nothing. We need to create a project and select a database for it to become operational.

## Create a Space Cloud Project

Open mission control. Click on create a project. Give it a name `todo_app` and select Mongo DB as the default database. You cannot change the project id once a project is created. We'll be using it on the frontend to initialise the client api as well.

This will create a project for us.

## Configure the Modules

On the left we have the various modules present in Space Cloud. In this tutorial, we'll need  the `User Management` and `Database` only.

Let's quickly go through the modules.

### User Management Module

The first one is the user management module. This exposes the sign in and sign up functionality as you might expect. In the future, we'll be adding OAuth endpoints as well to add the sign in with google, fb, github functionality in your app. For now, we have just the basic one. 

Enable the email authentication. We'll need that to implement the sign in and sign up features.

### Database Module

The next is the database or the crud module. This exposes the realtime data access layer functionality. As you can see the default `connection string` is already loaded for us. 

There is also a rule created named `default`. We'll be discussing the security rules in another topic. But to get a rough idea, this rule is exposing the entire database to the frontend. Not really secure but it's perfect for development.

### File Storage

The file storage module lets you manage binary data like music, video and image file. It has pluggable backend stores like Amazon S3 and Google Cloud Storage for scalability. You can also use the local filesystem as a storage backend.

You also get to apply security rules to allow only authorised users to access your files.

### Functions Module

Functions is another super powerful piece which lets you write microservices and lets you expose functionality directly as functions. You can call these functions from your frontend or other services without having to worry about service discovery or load balancing.

We have spoken about what a function mesh is and what it can do in [this article](Yet to go live).

### Configure

The configure page has the project level config which need not be changed for most applications. Things like the JWT secret, file storage backend, etc.

### Deploy Module

Deploy is an enterprise feature. It lets you deploy your frontend (react in this case) directly to something like kubernetes. In essence you could run a command like `space-cli deploy`, and it would automatically bundle your app, forward it to Space Cloud which in-turn will deploy it. You don't really need to worry learning kubernetes or docker.

## Wrapping up

So that was a brief tour of mission control. I must also add that you need not restart Space Cloud for any changes you make. Space Cloud hot reloads everything. In the next topic I'll be talking about setting up the react project and finally get to writing some code.

