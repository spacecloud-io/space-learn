---
title: "Securing our app"
description: Let's make our app fully secure
date: 2019-07-16T20:11:26+05:30
draft: true
weight: 8
---

Well We have got our app up and ready. But that doesn't mean we can deploy it straight away. There is a very imortant piece still missing. That's security.

## Security in Space Cloud

You must have heard that security should never be an after thought. But in the entire process of making our app, we havent really spoken much about security.

That is because we believe, **security must never be coupled with business logic**.

Space Cloud has a very powerful and yet flexible security module which lets you secure your app without having to modify the exisiting code base. We do this my looking at **business logic as access control problems**.

Let's take the example of our todo app.

A user must be able to retrieve her todos only. She is not allowed to do any operation on a todo which isn't hers. Makes sense?

So this business logic can be directly modelled as an access control problem by just rephrasing the sentence a little bit.

_A user can create, read, update or delete a todo only if the `userId` of the todo is equal to the `id` present in the token claims of the JWT token_. 

Pretty straigh forward right?

The security rules, which you've heard me mention quite a few times helps us do exactly that. Remember the JWT Token we had set in `api.setToken()`? It's claims are available to us in the security rules. Along with the JWT claims, even the request is available to us in the security rules.

In a nutshel the following variables are available in the security rules:

- **auth:** The claims present in the JWT token. If you are using in-built user management service of Space Cloud, then the `auth` has `id`, `name` and `role` of the user. While making a custom service, you are free to choose the claims which go inside the JWT token and thus available in the `auth` variable.
- **find:** Present when a where clause is supplied by the `where` method in client libraries (Follows the MongoDB query syntax).
- **update:** Present for update operations. It contains all the update operations like `set`, `push`, etc. (Follows MongoDB DSL). 
- **doc:** Present for insert operation. (The document(s) to be inserted)
- **op:** "one | all" Present for all operations. `one` for `insertOne`, `findOne`, `updateOne` and `deleteOne` operations 

You can read more about security rules from [the docs](https://spaceuptech.com/docs/security/overview).

What we need is a simple `match` rule. We need to compare `args.auth.id` and `args.find.userId` in case of read, update and delete. In case of create, we'll need to match `args.auth.id` with `

The rule for create will look something like this:

```json
{
  "rule": "match",
  "eval": "==",
  "type": "string",
  "f1": "args.auth.id",
  "f2": "args.doc.userId"
}
```

The rule for read, update and delete will look something like this:

```json
{
  "rule": "match",
  "eval": "==",
  "type": "string",
  "f1": "args.auth.id",
  "f2": "args.find.userId"
}
```

Now we need to apply these rules to Space Cloud. So let's go back the mission control, and in the _Database_ section, we need to update the rules for the _default_ table and hit **save**. The final rule will look something like this:

```json
{
  "isRealtimeEnabled": true,
  "rules": {
    "create": {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.id",
      "f2": "args.doc.userId"
    },
    "delete": {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.id",
      "f2": "args.find.userId"
    },
    "read": {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.id",
      "f2": "args.find.userId"
    },
    "update":  {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.id",
      "f2": "args.find.userId"
    }
  }
}
```

And that's it!

Now if you try updating your `service.js` file to mess around with the user id, Space Cloud will reject the request.

Let's see it in action?

## Security Rules in Action

Open your `service.js` file and remove the userId from the conditon for the `deleteTodo` function. Your function will look something like this now.

```js
async deleteTodo(id) {
    const condition = and(cond('_id', '==', id)); // Removed userId from condition

    // Fire the query to delete the todo
    const res = await this.db.delete('todos').where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true };
  }
```

Now try deleting some todos. If your security rules are applied correctly, Space Cloud will not allow you to delete any todos.

## Conclusion

Congratulations!

We have successfully completed this course. Hopefully your app is working and there is a huge smile on your face. You should be able to take these concepts and apply it to your own app.

As next steps you can:

- Join our [discord server](https://discordapp.com/invite/ypXEEBr) to get in touch with us.
- Checkout the other [courses](https://learn.spaceuptech.com) we have.
- Start making your own app.