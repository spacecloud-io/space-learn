---
title: "User Management"
description: Bind the Login and Sign Up screens
date: 2019-07-16T20:11:26+05:30
draft: true
weight: 5
---

Till now we have our api initialised and a client object created. Now we’ll be binding the frontend with the user management module.

## Login Operation

So the first step is making a login function in the service class. Let’s head over to the `service.js` file. Create an async `login` function which takes `username` and `password` as a parameter.

Now inside the body, we’ll simply call the signIn method on the `db` object. You can always refer to [the docs](https://spaceuptech.com/docs/user-management/signin) to understand how it works and stuff like that.

Call the `db.signIn()` function. Pass the `username` and `password` fields. This function returns a promise, so lets add an await in front of it and store the result in a variable. It will look something like this:

```
const res = await this.db.signIn(username, pass);
```

We need to check is the status code is 200, that’s for an ok http response. The response code is present in `res.status`. If it's not 200, we'll return an object with ack false.

If it is 200, we have logged in successfully. In the response object we receive a JWT token in `res.data.token` which will be used to authenticate against space cloud. So lets instruct the space api to use it.

For that we need to use the `this.api.setToken()` command. There you go.

Till now our code looks like this:

```
// Fire the sign in request
const res = await this.db.signIn(username, pass);

// Check if login was successfull
if (res.status !== 200) {
  return { ack: false };
}

// Set the token with the API object for authentication
this.api.setToken(res.data.token);
```

We’ll also save the userId in our service. We’ll need this while playing around with the todos. We get the user in the `res.data.user._id` variable for MongoDB and `res.data.user.id` variable for the SQL databases.

```
// Store the userId for further operation
this.userId = res.data.user._id;
```

Now let’s return an object with ack true.

So our final login function will look something like this:

```
async login(username, pass) {
  // Fire the sign in request
  const res = await this.db.signIn(username, pass);

  // Check if login was successfull
  if (res.status !== 200) {
    return { ack: false };
  }

  // Set the token with the API object for authentication
  this.api.setToken(res.data.token);

  // Store the userId for further operation
  this.userId = res.data.user._id;

  return { ack: true };
}
```

## Sign Up Operation

The sign up function is more or less the same so lets simply copy our login function and rename it. We’ll need an additional parameter called name as well

The `db.signIn()` function will get replaced with the `db.signUp()` which takes 4 parameters, `email`, `name`, `password` and `role`. Since we don’t really need roles in this app, we’ll stick to `default`.

The rest will remain exactly the same. The final signUp function will look like this:

```
async signUp(username, name, pass) {
  // Fire the sign up request
  const res = await this.db.signUp(username, name, pass, 'default');

  // Check if sign up was successfull
  if (res.status !== 200) {
    return { ack: false };
  }

  // Set the token with the API object for authentication
  this.api.setToken(res.data.token);

  // Store the userId for further operation
  this.userId = res.data.user._id;

  return { ack: true };
}
```

## Bind the Sign In Component

Lets not forget to save the file and head over to the SignIn component in 'src/page/sign-in' folder. The first step would be to import the client.

```
import client from '../../client';
```

Once we have done that, we need to update the `signIn` handler to call the login function on the client object. Keep in mind, it will return a promise. So on getting a valid response, let’s carry on the todo page, else throw an alert.

```
const signIn = () => {
  client.login(email, pass).then(res => {
    if (!res.ack) {
      alert('Error logging in')
      return;
    }

    props.history.push('/todo');
  })
}
```

## Bind the Sign Up Component

We need to do something similar for the sign up page as well. Import the client.

```
import client from '../../client';
```

In the sign up handler call the signup function. This too, returns a promise. If the ack is true we shall proceed to the next page else throw an alert. It will look something like this:

```
const signUp = () => {
  client.signUp(email, username, pass).then(res => {
    if (!res.ack) {
      alert('Error signing up')
      return;
    }

    props.history.push('/todo');
  })
}
```

The only thing remaining is testing if everything works. Let’s head over to the browser. Logging in must throw an error since we haven’t signed in yet.

So let’s try to sign in… Punch in some dummy data… and hit sign up.

If all works as planned you should be greeted by the todos page. 

Now lets try logging in with the new credentials we just created. Punch in the email and password and then hit sign in.

Cool. Works like a charm!

Play around with a little. Try putting in incorrect passwords or sign up with an existing email.

That’s a lot of work in one video. Great job buddy. The next one is adding, fetching, deleting and updating todos. So it will be covering the entire database module more or less. Things are starting to get really exciting. Can’t wait to see you in the next video.
