---
title: Adding a Database
description: Let's add a database to our project
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 3
---

Let's explore some awesome powers of Space Cloud. In this guide, we will:

- Add a local Postgres instance to our project
- Create tables
- Make trainers and catch Pokemons 😍 (Insert operation)
- Retrieve all trainers along with their Pokemons 😎 (Join operation)

> **Note:** You can use any other database Space Cloud supports for this guide. We are using Postgres since its simply awesome.

## Adding Postgres to our project

### Start a local Postgres instance
First step would be starting a local Postgres instance. Since we already have docker installed, let's go forward using that.

Run the following command in a terminal

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

It might take some time if you did not have the postgres image cached locally.

Once you have started postgres, we need to inspect its ip address. We'll need this to make sure Space Cloud can reach postgres.

```bash
docker inspect some-postgres | grep -i '"IPAddress"' | head -1
```

You'll a response similar to the following:
```bash
            "IPAddress": "172.17.0.4",
```

Note the value of the `IPAddress` field. In my case its `172.17.0.4`.

### Add Postgres to our Space Cloud project

Let's head over to the `Database` section in `Mission Control`. It will prompt you to add a database.

[ Add database screen should go here ]

Make sure you have the write connection string. Replace `localhost` with the ip address we noted earlier. My final connection string looks like `put final connection string here`.

Hit the `Add Database` button to add the database. If everything goes will, you should see a screen like this:

[Database overview page goes here]

## Create tables

Now let's add some tables.

Click on `Add table` button to open this form:

![Create a project screen](/images/screenshots/add-table.png)

Name this table `trainer`.

**Copy-paste the following schema and hit save:**

{{< highlight graphql >}}
type trainer {
  id: ID! @primary
  name: String!
  pokemons: [pokemon] @link(table: "pokemon", from: "id", to: "trainer_id")
}
{{< /highlight >}}

> **Note:** Don't worry if this syntax is new to you. It is GraphQL SDL which Space Cloud uses to create tables for you. You can read more about it later from [here](/essentials/data-modelling).

Similarly, to create a `pokemon` table, click on `Add Table` button once again.

Name this table `pokemon`.

{{< highlight graphql >}}
type pokemon {
  id: ID! @primary
  name: String!
  power: Integer!
  trainer_id: ID! @foreign(table: "trainer", field: "id")
}
{{< /highlight >}}


## Making trainers and catching pokemons (insert operation)

Let's insert some trainers along with their pokemons.

Head over to the `API Explorer` section in `Mission Control`:

![API Explorer](/images/screenshots/explorer.png)

Try running the following query in the GraphiQL section:

{{< highlight graphql >}}
mutation {
  insert_trainer(
    docs: [
      { 
        id: "1",
        name: "Ash",
        pokemons: [
          { id: "1", name: "Pikachu", power: 300 },
          { id: "2", name: "Snorlax", power: 500 }
        ] 
      },
      { 
        id: "2",
        name: "Misty",
        pokemons: [
          { id: "3", name: "Psyduck", power: 250 },
          { id: "4", name: "Staryu", power: 350 }
        ] 
      },      
    ]
  ) @postgres {
    status
  }
}
{{< /highlight >}}

On successful insert, you should be able to see the `status` as `200` which means you have inserted the records in the database successfully.

> **Note:** You are inserting in two tables simultaneously in this operation. The query is executed as a single transaction.

## Retrieve trainers along with their Pokemons (join operation) 

Try running the following query in GraphiQL:

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
}
{{< /highlight >}}

The response should look something like this:

{{< highlight json >}}
{
  "trainer": [
    {
      "id": "1",
      "name": "Ash",
      "pokemons": [
        {
          "id": "1",
          "name": "Pikachu",
          "power": 300
        },
        {
          "id": "2",
          "name": "Snorlax",
          "power": 500
        }
      ]
    },
    {
      "id": "2",
      "name": "Misty",
      "pokemons": [
        {
          "id": "3",
          "name": "Psyduck",
          "power": 250
        },
        {
          "id": "4",
          "name": "Staryu",
          "power": 350
        }
      ]
    }
  ]
}
{{< /highlight >}}

The above query performs a join and returns us the joint results. Similarly you can perform several types of joins including _joining database results with the response of your services_.

You can read more about the [different types of database query you can perform from the docs]() [end link to queries page].

## Next Steps

Awesome! We have just started our Pokemon journey _without writing a single line of backend code_. The journey ahead is undoubtedly going to be super exciting!

Continue to the next guide to deploy a Restful Nodejs app using space-cli.
