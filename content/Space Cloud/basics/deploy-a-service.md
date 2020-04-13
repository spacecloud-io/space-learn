---
title: Deploying a Service
description: Let's see how to deploy a restful service on Space Cloud
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 4
---

Not everything can be achieved by CRUD operations. Sometimes we need to write some backend code to get some work done.

In this guide, we will:

- Dockerize a RESTful service and deploy its docker container `space-cli`.
- Expose the APIs of the REST service to the outer world by setting up `Space Cloud Routes`.

> **Note:** Make sure you have followed the [Setup Space Cloud](/space-cloud/basics/setup) guide in the `Space Cloud Basics` track. We'll be building up from there.

## Advantage of deploying with Space Cloud
When running on Kubernetes, Space Cloud gives you the following benefits:

- Complete end to end encryption.
- Advanced deployment patterns like Blue/Green Deployment, A/B Tests, etc.
- Advanced service to service authentication policies.
- Autoscaling including scaling down to zero.

## What are we going to deploy

We'll set up a simple HTTP server which has the following:

- An endpoint to add two numbers.
- An endpoint to double the number provided.

Following are the endpoints of our REST service:

<br>

| Method | URL                | Request Body                     | Response Body        |
|--------|--------------------|----------------------------------|----------------------|
| `GET`  | `/add/:num1/:num2` | N/A                              | `{"value": RESULT }` |
| `POST` | `/double`          | `{"value": VALUE_TO_BE_DOUBLED}` | `{"value": RESULT }` |
| `POST` | `/logger`          | `ANY JSON OBJECT`                | `{}`                 |

## Setting up the service

To speed things up, we already written this HTTP server in NodeJS and published it to this [Space Cloud Samples Github repository](https://github.com/spaceuptech/space-cloud-samples/). We will be cloning and using just that here. 

Cloning our samples repository:

{{< highlight bash >}}
git clone https://github.com/spaceuptech/space-cloud-samples.git
{{< /highlight >}}


Checkout into the folder of our HTTP server:

{{< highlight bash >}}
cd space-cloud-samples/basic-service
{{< /highlight >}}

## Deploying the service

Space Cloud can deploy only docker containers as of now. So we need to dockerize our app. We are going to take the help of `space-cli` to do that.

First of all, we need a docker registry that can host the docker images of our service. Run this command to spin up a docker registry locally:

{{< highlight bash >}}
space-cli --project myproject add registry
{{< /highlight >}}

> **In production, it is recommended to [use a managed container registry](https://docs.spaceuptech.com/microservices/deployments/using-custom-container-registry)**

Now we need yo generate two files:

- `Dockerfile` - To build the docker image.
- `service.yaml` - The service configuration (example: resources, auto-scaling, ports) to deploy this service via Space Cloud.

`space-cli` has a built-in command to generate both of these automatically for us. Just run the following command:

{{< highlight bash >}}
space-cli deploy --prepare
{{< /highlight >}}

It is going to ask you a bunch of questions. Answer them with the following required values and leave the rest to default:

| Project Id  | Service Id |
|-------------|------------|
| `myproject` | `myapp`    | 

Great! We now have a `Dockerfile` and a `service.yaml`. Feel free to explore and change both these files before finally deploying the service. The `service.yaml` file looks something like this:

{{< highlight yaml >}}
api: /v1/runner/{project}/services/{id}/{version}
type: service
meta:
  id: myapp
  project: myproject
  version: v1
spec:
  scale:
    replicas: 1
    minReplicas: 1
    maxReplicas: 100
    concurrency: 50
    mode: parallel
  labels: {}
  tasks:
  - id: myapp
    ports:
    - name: http
      protocol: http
      port: 8080
    resources:
      cpu: 250
      memory: 512
    docker:
      image: localhost:5000/myproject-myapp:v1
      cmd: []
      secret: ""
      imagePullPolicy: "pull-if-not-exists"
    env: {}
    secrets: []
    runtime: image
  affinity: []
  whitelists:
  - projectId: myproject
    service: '*'
  upstreams:
  - projectId: myproject
    service: '*'
{{< /highlight >}}

The only step left now is building the docker image and deploying it via Space Cloud. We are going to use the `deploy` command of `space-cli` for that. It first builds a docker image for us using the `Dockerfile` (generated in the above step) and then publishes it to the docker registry. Once it's done publishing, it uses the config in `service.yaml` file to deploy the service via Space Cloud.

Enough of talking. Let's hit the magical command now:
{{< highlight bash >}}
space-cli deploy
{{< /highlight >}}

> **You  may have to run the above command with sudo privileges if your `docker` is not in the sudoer group.**

Hurray! We just dockerized and deployed a REST service using Space Cloud. I know you might want to celebrate. But wait a min before you do that.

## Verify the deployment

Checkout to the `Overview` tab of `Deployments` section in Mission Control and hit **refresh**. You should be able to see the service we just deployed like this:

![Routing Form](/images/screenshots/deployments.png)

Yess! Now you can celebrate! You deserve it for following this track so diligently.😛

## Expose your API

Currently, the REST service we deployed is accessible from within the cluster only. We need to add `Space Cloud Routes` to expose our service to the outside world.

Let's head over to the `Ingress Routing` section in the `Microservices` tab in `Mission Control`. 

Hit `Create your first route` to open the following form:

![Routing Form](/images/screenshots/add-ingress-routing-rule.png)

We'll simply redirect all non Space Cloud traffic to our service for now.

You'll need to provide the following details in the form:

| Route Matching Type | Prefix |
|---------------------|--------|
| `Prefix Match`      | `/`    |

Targets:

| Scheme | Service Host                        | Port | Weight |
|--------|-------------------------------------|------|--------|
| `HTTP` | `myapp.myproject.svc.cluster.local` | 8080 | 100    |

Once you are done, hit `Add`.

To verify that our REST service is exposed, simply open another tab in your browser and enter:
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

Awesome! We just deployed and exposed our first REST service!!!

There is a lot more we can do with `Deployments`. Space Cloud has amazing features like _autoscaling_, _service communication policies_, _secret management_, etc. built into it. Don't worry, we'll be covering all of these in another guide.

Continue to the next guide to create a GraphQL API on top of our service.