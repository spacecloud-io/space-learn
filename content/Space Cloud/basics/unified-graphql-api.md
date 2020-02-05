---
title: A Unified GraphQL API
description: Witness the through power of a truely unified GraphQL API
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 5
---

I'm sure you're already in love with the GraphQL API Space Cloud provides!

Space Cloud lets you build instant GraphQL APIs on any database. It also helps you bring your REST workloads to GraphQL. All this without having to write a sinle GraphQL resolver or even know how GraphQL works.

In this guide, I'm about to take this GraphQL awesomeness to a whole new level!

In this guide we will:
- Query our database and microservices in a single request
- Chain our database and micorservice queries to unleash the true power of GraphQL.

> **Note:** Make sure you have followed all the guides in the `Space Cloud basic` track. We'll be building up from there.

## Making multiple calls in a single request

We have already seen how we can call multiple endpoints in a single request, Let's take this a step further.

{{< highlight graphql >}}
query {
  trainer @postgres {
    id
    name
    pokemons {
      id
      name
      power
    }
  }

  add(num1: 1, num2: 2) @myapp {
    value
  }

  double(value: 4) @myapp {
    value
  }
}
{{< /highlight >}}

What we did here is query our database and microservices in a single request. Since, all the queries are executed in parallel, its super easy to populate the entire page in a single request!

So does the magic ends here? Not really.

## Chain our database and micorservice queries

Have a look at this query:

{{< highlight graphql >}}
query {
  trainer @postgres {
    id
    name
    pokemons {
      id
      name
      power
      double(value: "pokemons.power") @myapp {
        value
      }
    }
  }
}
{{< /highlight >}}

You should get the response as follows:

{{< highlight json >}}
 [Put the response here] 
{{< /highlight >}}

What we did here is query the database, then chain it's result with the `double` endpoint, all in a single request. It didn't matter if the database query returns an array or an object, Space Cloud handles the nuances to give you a standard API.

We could have chained one database result with another, throw in some services here and there and bam!! Everything would work just as smoothly.

What this let's us do in essense is **create runtime pipleline which is orchestrated by Space Cloud based on the GraphQL query**.

To sum up, here are the advantages of the GraphQL layer in Space Cloud:
- Instant APIs for any database without writing any code.
- Instant Rest to GraphQL without modifying the exisitng code.
- Chain database and microservice responses to form data pipelines on the fly.

May of you'll must be wondering about the security implications of this which is a valid point.

Space Cloud offers a robust security module to protect each database and microservice call being made. You can find more about it from our guide.

## Next steps

We saw the basics of deployments, database and services in the current track. There is a lot more you can do with Space Cloud. Some of the things include:
- File storage backed by Amazon S3 or Google Cloud Storage
- Trigger endpoints on Database and Filestorage events
- Ability to queue custom events and trigger endpoints based on them
- A robust security module to write powerful rules to secure all functionalities.

If you loved this guide! Do share your happiness with your friends!

[ Big image to share learn on twitter]
