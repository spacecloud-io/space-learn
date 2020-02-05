---
title: Deploying a Restful Service
description: Lets see how to deploy a restful service on Space Cloud
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 4
---

Not everthing can be achieved by CRUD operations. Sometimes we need to write some backend code in order to get some work done.

In this guide we will:
- Deploy a Nodejs service using the `space-cli`
- Expose the APIs by setting up `Space Cloud Routes`.

> **Note:** You can deploy any language on Space Cloud as long as you have a Dockerfile accompanying it.

## Advantage of deploying with Space Cloud
When running on Kubernetes, Space Cloud gives you the following benefits:
- Complete end to end encryption.
- Advanced deployment patterns like Blue / Green Deployment, A/B Tests, etc.
- Advanced service to service authentication policies.
- Autoscaling including scaling down to zero.

## Setting up the Nodejs Project

We'll setup a simple http server which has the following:
- An endpoint to add two numbers.
- An endpoint to double the number provided.
- An endpoint which simply logs the request it receives.


To speeds things up we have already a [docker image]() [link to docker hub page].

The server has the following endpoints

<br>

Method  | URL                 | Request Body                      | Response Body 
---     | ---                 | ---                               | --- 
`GET`   | `/add/:num1/:num2`  | `N/A`                             | `{"value": RESULT }` 
`POST`  | `/double`           | `{"value": VALUE_TO_BE_DOUBLED}`  | `{"value": RESULT }` 
`POST`  | `/logger`           | `ANY JSON OBJECT`                 | `{}` 


## Deploying the app

Head over to the `Deployments` section in the `Microservices` tab.

You'll be greeted by a screen like this.

[ Empty deployment screen ]

Click on `Deploy your first service` button. You'll see a form to deploy a service.

You'll need to provided the following details:

Service Id  | Docker Image                | Port
---         | ---                         | ---
`myapp`     | `spaceuptech/basic-service` | `8080` with the protocol set to `HTTP`

The filled up form would look like this:

[ Image of filled up form ]

> **Note:** You can explore the `advanced setting` tab to explore the other knobs you have.

## Verify the deployment

Go on the `Deployments` section in the `Microservices` tab and hit refresh. You should see your app right there!

## Expose your API

Currently, the node app is accessible from within the cluster only. We will have to add `Space Cloud Routes` in order to expose our service to the outside world.

Lets head over to the `Routing` section in the `Microservices` tab in `Mission Control`. Wow! thats a mouthful!!

Hit `Create your first route`.

We'll simply redirect all non Space Cloud traffic to our service for now.

Fill up the form as shown below:

[ Screen of filled up form ]

Once your done, hit `Add`.

To verify, simply open your browser and type `http://localhost:4122/add/1/2`.

You should see `3` on the screen.

## Next steps

Awesome! We just deployed and exposed our first docker container!!!

There is a lot more we can do with `Deployments`. Space Cloud has amazing features like _autoscaling_, _service communication policies_, _secret management_, etc. built into it. Don't worry, we'll be covering all of these in another guide.

Continue to the next guide to create a GraphQL API on top of our service.
