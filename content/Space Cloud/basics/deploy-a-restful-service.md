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

We'll setup a simple nodejs project which has the following:
- An endpoint to add two numbers.
- An endpoint to double the number provided.
- An endpoint which simply logs the request it receives.

> **Note:** You do not need to have Nodejs installed to follow this guide.

To speeds things up we have already setup a Nodejs project for you. You can get it by simply cloning our repo.

[we can eliminate this git repo step if you want]

```bash
git clone https://github.com/spaceuptech/learn-sample-apps
```

This repo has a bunch of sample apps for you to explore. For now we are interested in the `nodejs-basics` directory. Open the terminal in this directory.

We have the following nodejs file already setup for you.

```javascript
Nodejs file goes here
```

It also has a Dockerfile present which will help us containerize this Nodejs app.

```Dockerfile
Docker file content goes here
```

## Deploying the app

Deploying an app on Space Cloud is as simple as running a single command.
```bash
space-cli deploy
```

> **Note:** Make sure the `space-cli` executable is available in the current directory.

It will ask you a bunch of question which should be pretty straighforward to answer. Make sure you set the service id to `node-app`. We'll be using this in the next step.

Once you are done, `space-cli` will build a Docker image and deploy the app on Space Cloud.

> **Note:** In a production environment, you would rather push the image to a registry and use the `space-cli apply` command instead.

## Verify the deployment

Run the following command to verify if the container started successfully.

```bash
docker ps --filter='name=space-cloud'
```