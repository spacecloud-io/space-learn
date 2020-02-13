---
title: Rest to GraphQL in minutes
description: Let's see how to add a GraphQL layer on top of our restful services instantly
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 4
---

GraphQL is awesome! The prospect of a unified GraphQL layer for all your microservices and database really excites us. In this guide, we'll do precisely that.

In this guide we will:

- Add a GraphQL Layer on top of our existing rest service
- Enjoy the GraphQL awesomeness😋

> **Note:** Make sure you have followed the [Setup Space Cloud](/space-cloud/basics/setup) and [Deploying a Service](/space-cloud/basics/deploy-a-service) guides in the `Space Cloud Basics` track. We'll be building up from there.

We'll be using the following two endpoints from our `myapp` service.

Method  | URL                 | Request Body                      | Response Body 
---     | ---                 | ---                               | --- 
`GET`   | `/add/:num1/:num2`  | N/A                            | `{"value": RESULT }` 
`POST`  | `/double`           | `{"value": VALUE_TO_BE_DOUBLED}`  | `{"value": RESULT }` 

So let's get started!

Don't worry, we don't need to write any code for this!

## Creating a GraphQL API

`Mission Control` is going to be our best friend for this guide.

Head over to the `GraphQL API` section under the `Microservices` tab.

You should be greeted by a page like this one:

![Remote Services Overview Page](/images/screenshots/remote-services-overview.png)

Hit the `Add a Remote Service` button.

In the form, enter the following details:

Service Name  | URL
---           | ---
myapp         | `http://myapp.myproject.svc.cluster.local:8080`

> **Note:** `myapp.myproject.svc.cluster.local` is the domain created by space cloud for internal use. The domain format looks like this `<service_id>.<project_id>.svc.cluster.local`.

Hit `Add`. This will add a GraphQL API over the service.

Unfortunately, Space Cloud cannot automatically discover our APIs. This is because of the way HTTP works in general. There is no introspection feature available for Space Cloud to follow the APIs.

To overcome this, we need to add endpoints.

Click the `View` action against our newly added `myapp` service.

This is where you add endpoints. We have two endpoints. Let's go and add them now!

Hit the `Add your first endpoint` button.

Fill up the form as shown below:

Endpoint name   | Method  | Path                            | Rule
---             | ---     | ---                             | ---
add             | `GET`   | `/add/{args.num1}/{args.num2}`  | Leave this as is


Notice the `{args.num1}` and `{args.num2}` in the path? This is actually referring to the parameters being passed to the GraphQL query. Don't worry much about it for now. It will get clearer as we move forward.

Now let's create the next endpoint for doubling the result. Enter the following in the form:

Endpoint name   | Method  | Path                            | Rule
---             | ---     | ---                             | ---
double          | `POST`  | `/double`                   | Leave this as is

Cool! That's about it! All that left's to do is playing around with the API we just created.

## Querying our service using GraphQL

To make things easy, we have a GraphQL client built into Space Cloud.

Head over to the `API Exporer` tab:

![Explorer Screen](/images/screenshots/explorer.png)

Type in a query as shown below

{{< highlight graphql >}}
query {
  add(num1: 1, num2: 2) @myapp {
    value
  }

  double(value: 4) @myapp {
    value
  }
}
{{< /highlight >}}

Once you run this query, you get a response like this:

{{< highlight json >}}
{
  "add": {
    "value": 3
  },
  "double": {
    "value": 8
  }
}
{{< /highlight >}}

Hurray! We just migrated our Rest API to GraphQL in minutes.

Now let's understand what's going on here. Have a hard look at the query once again!

### Service and endpoint Mapping
First things first, our service name is reflected as a `directive` in our GraphQL query while our endpoints are mapped to the `fields` of the GraphQL query. The combination of these two help Space Cloud figure out which service and endpoint to fire the query to.

### Role of field arguments
The second important aspect is the arguments we pass in `()` after the fields.

Take `add(num1: 1, num2: 2)` for example. This actually translates to the body of the request and looks something like this:

{{< highlight json >}}
{
  "num1": 1,
  "num2": 2
}
{{< /highlight >}}

Needless to say that you could replace the values to any complex json objects.

Remember the url we had entered for the `add` endpoint? It looked like this: `/add/{args.num1}/{args.num2}`.

The `{args.num1}` and `{args.num2}` would probably make more sense now. It was instructing Space Cloud to **Generate the URL using the arguments provided in the GraphQL query**. This helps you generate dynamic URLs.

### Selection sets
Now lets come to the results. Space Cloud expects the result of your microservices to be JSON objects. You can selectively pluck the fields you are interested in using the selection sets.


{{< highlight graphql >}}
query {
  add(num1: 1, num2: 2) @myapp {
    value      # We are plucking the value field from the response of the `add` endpoint
  }
}
{{< /highlight >}}

## The GraphQL Awesomeness

I'm not sure if you noticed, but we were **querying two different REST endpoints in a single request**. This is a big deal!

With Space Cloud, you could **query multiple endpoints in a single request even if they belong to different services**. This simplifies your frontend to a great extent.

Now let me show you something way cooler. Have a look at the query below!

{{< highlight graphql >}}
query {
  add(num1: 1, num2: 2) @myapp {
    double(value: "add.value") @myapp {
      value
    }
  }
}
{{< /highlight >}}

The response should be:

{{< highlight json >}}
{
  "add": {
    "double": {
      "value": 6
    }
  }
}
{{< /highlight >}}

Let this sink in. 

What we just did is call the `add` endpoint first, pass the result to the `double` endpoint and get back the result. 

All this in a single GraphQL request!!!

This is what we call `endpoint chaining`. I leave it up to you to imagine the possibilities this unlocks.

## Next steps

Continue to the next guide to witness the magic of a unified GraphQL API.
