---
title: "Basic Concepts"
description: Cover the basic concepts for using Space Cloud
date: 2019-08-03T00:00:00+05:30
draft: false
weight: 1
---

Space cloud is an open source web server which provides a **realtime data access layer** and a **[full fledged functions mesh](https://medium.com/spaceuptech/time-to-step-up-your-microservices-4c38fb02ce4d)** for your microservices.

## Realtime Data Access Layer

The data access layer or the [database module](https://spaceuptech/docs/database/overview) lets you query your database from your frontend or from your backend microservices. Its very similar to Google Firebase. It exposes a realtime API as well! All mutations on the database get synced between all the concerned clients immediately. Unlike firebase, Space Cloud can run with Mongo DB, MySQL and Postgres with many more databases yet to come. The api for each database is the same so switching from one to another doesn't requiring changing your codebase.

This sounds very similar to another super cool project named Prisma. Unlike Prisma, you can use Space Cloud directly from the frontend. Space Cloud has got a super powerful [security module](https://spaceuptech.com/docs/security/overview) which lets you secure database access.

## Function Mesh

The [function mesh](https://spaceuptech.com/docs/functions/overview) lets you write microservices but instead of exposing functionality as HTTP endpoints, you expose them **directly as functions**. What this means is that you can invoke these functions, (which are running on your backend) directly from another service or from your frontend. All networking, service discovery and load balancing is completely taken care off. So if you are running two instances of the same microservice, Space Cloud will automatically load balance between them.

All this functionality can be accessed over HTTP, Websockets and gRPC. We have also got client libraries in python, java, node and go to make your life much easier.

## What will we cover

We'll be making a realtime todo app. This tutorial will cover the following aspects.

- Login and sign up features for our app
- Provision to add, update and delete todos
- All data will be persisted in Mongo DB
- The operations will be realtime. Changes will be synced with all devices immediately. 

# Steps that need to be done

> A running MongoDB instance is a prerequisite.

This is how we will proceed with the tutorial.

- Download and run Space Cloud on your environment
- Configure Space Cloud for our project using mission control.

For the frontend, we won't be getting React. **This isn't a React course**. However, we will be covering the following:

- Initialise the space api. This will help us talk to Space Cloud.
- Create a service api to bind the app with MongoDB

So in this tutorial we'll be covering most of the concepts you would need to know while making an app with React and Space Cloud. The goal here is to leave you with enough confidence so you can start using Space Cloud in your own projects.
