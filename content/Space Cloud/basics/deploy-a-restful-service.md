---
title: Deploying a Restful Service
description: Let's see how to deploy a restful service on Space Cloud
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 4
---

Not everything can be achieved by CRUD operations. Sometimes we need to write some backend code to get some work done.

In this guide, we will:

- Deploy a docker container of a Restful service using the `Mission Control`
- Expose the APIs by setting up `Space Cloud Routes`.

> **Note:** You can deploy any service on Space Cloud as long as you can dockerize it using a Dockerfile.

## Advantage of deploying with Space Cloud
When running on Kubernetes, Space Cloud gives you the following benefits:

- Complete end to end encryption.
- Advanced deployment patterns like Blue/Green Deployment, A/B Tests, etc.
- Advanced service to service authentication policies.
- Autoscaling including scaling down to zero.

## Setting up the Nodejs Project

We'll set up a simple HTTP server which has the following:

- An endpoint to add two numbers.
- An endpoint to double the number provided.
- An endpoint which simply logs the request it receives.


To speeds things up, we have already a [docker image](https://hub.docker.com/r/spaceuptech/basic-service).

Following are the endpoints of our REST service:

<br>

Method  | URL                 | Request Body                      | Response Body 
---     | ---                 | ---                               | --- 
`GET`   | `/add/:num1/:num2`  | N/A                            | `{"value": RESULT }` 
`POST`  | `/double`           | `{"value": VALUE_TO_BE_DOUBLED}`  | `{"value": RESULT }` 
`POST`  | `/logger`           | `ANY JSON OBJECT`                 | `{}` 


## Deploying the app

Head over to the `Deployments` tab in the `Microservices` section.

You'll be greeted by a screen like this.

![Deployments Overview Screen](/images/screenshots/deployments-overview.png)

Click on `Deploy your first container` button. You'll see a form to deploy a service.

You'll need to provide the following details:

Service Id  | Docker Image                | Port
---         | ---                         | ---
`myapp`     | `spaceuptech/basic-service` | `8080` with the protocol set to `HTTP`

The filled up form would look like this:

![Deployments Overview Screen](/images/screenshots/deploy-basic-service.png)

> **Note:** You can explore the `Advanced` tab to explore the other knobs you have.

## Verify the deployment

After submitting the form, hit refresh. You should see your app right there!

## Expose your API

Currently, the REST service we deployed is accessible from within the cluster only. We will have to add `Space Cloud Routes` to expose our service to the outside world.

Let's head over to the `Routing` section in the `Microservices` tab in `Mission Control`. 

Hit `Create your first route`.

We'll simply redirect all non Space Cloud traffic to our service for now.

You'll need to provide the following details:

Route Matching Type  | Prefix   | Target Host | Target Port
---         | ---                         | --- | ----
`Prefix Match`     | `/` | `myapp.myproject.svc.cluster.local`  | 8080

Fill up the form, as shown below:

![Routing Form](/images/screenshots/expose-basic-service.png)

Once you are done, hit `Add`.

To verify that our REST service is exposed, simply open your browser and type:
```bash
http://localhost:4122/add/1/2
```

You should be able to see the following response on your screen:
{{< highlight json >}}
{
  "value": 3
}
{{< /highlight >}}

## Next steps

Awesome! We just deployed and exposed our first Docker container!!!

There is a lot more we can do with `Deployments`. Space Cloud has amazing features like _autoscaling_, _service communication policies_, _secret management_, etc. built into it. Don't worry, we'll be covering all of these in another guide.

Continue to the next guide to create a GraphQL API on top of our service.
