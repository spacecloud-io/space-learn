---
title: "Working With Todos"
description: Get the todo page binded with MongoDB
date: 2019-08-03T00:00:00+05:30
draft: false
weight: 6
---

Till now we have got the sign in and sign up page working.

In this topic we are going to dive into the most fun part, which is binding the todos with the database. For that we'll need to create a function to add, get, update and delete a todo.

We'll store all our todos in the `todos` collection. Our single todo object will look something like this:

```json
{
  "_id": "some-unique-id",
  "value": "text of the todo",
  "isCompleted": false,
  "userId": "users-id"
}
```

Let's go back to our `service.js` file. We'll start with add todo.

## Add Todo Operation

Create an async addTodo function which will take in the text of the todo. First prepare the object we want to insert in the database. The `_id` of this object must correspond the `_id` field in MongoDB. We'll use the `generateId()` function to create a unique id.

```js
const obj = { _id: this.generateId(), value: value, isCompleted: false, userId: this.userId }
```

Now let's call the `db.insert()` function. We need to pass the name of the collection or table. It's going to be todos in our case. If you are running this with a SQL database, make sure you create a table named `todos` before proceeding.

Next we pass the object to be inserted and fire the query. 

```js
// Fire the insert query
const res = await this.db.insert('todos').doc(obj).apply();
```

If the status code is anything other than 200 then our query has failed. Simply return a nack. Else, we'll return an ack along with the document we inserted.

```js
// Return -ve ack is status code isn't 200
if (res.status !== 200) {
  return { ack: false };
}

return { ack: true, doc: obj};
```

## Delete Todo Operation

Let's proceed with delete todo. It will need just the id of the todo to be deleted. 

We need to delete the todo with the provided id of the current user. For that we need to add a condition. Space api does give us some helper functions to work with conditions. Lets import those as well.

```js
import { API, cond, and } from 'space-api';
```

Now lets create a condition object.

```js
const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));
```

It seems like the userId isn't really required. But we'll be needing it to make sure the user doesn't attempt to delete someone else's todos.

Now lets add a delete query and pass the condition to it. It's just as you'd expect it to be. 

```js
// Fire the query to delete the todo
const res = await this.db.delete('todos').where(condition).apply()
```

If the status code isn't 200… well you know the drill by now.

```js
// Return -ve ack is status code isn't 200
if (res.status !== 200) {
  return { ack: false };
}

return { ack: true };
```

2 down, two more to go.

## Update Todo Operation

Update is pretty much similar to delete. Everything will mostly remain the same. Along with the todo id, we'll also need the isCompleted field because that's what we will be updating. Our condition will be exactly the same. 

```js
const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

// Fire the query to update the todo
const res = await this.db.update('todos').set({ isCompleted: isCompleted}).where(condition).apply()
```

The set method expects an object which indicates the fields we wanna set. It's the isCompleted field in this case. Handle the error and return the appropriate response.

```js
// Return -ve ack is status code isn't 200
if (res.status !== 200) {
  return { ack: false };
}

return { ack: true };
```

## Get Todos Operation

Get is the simplest one in my opinion. This one won't take any parameters. We'll add a condition since we need the user to fetch just her todos. Now let's fire the get request.

```js
const condition = cond('userId', '==', this.userId);

// Fire the query to get the todos
const res = await this.db.get('todos').where(condition).apply()
```

Handle the errors. And if everything goes well, return the array of todos received. 

```js
// Return -ve ack is status code isn't 200
if (res.status !== 200) {
  return { ack: false };
}

return { ack: true, todos: res.data.result };
```

That's all the binding we will need for now.

## Final Service File

Our final service file will look something like this:

```js
import { API, cond, and } from 'space-api';

class Service {
  constructor(projectId, url) {
    this.api = new API(projectId, url);
    this.db = this.api.Mongo();
  }

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

  async addTodo(value) {
    const obj = { _id: this.generateId(), value: value, isCompleted: false, userId: this.userId }

    // Fire the insert query
    const res = await this.db.insert('todos').doc(obj).apply();

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, doc: obj };
  }

  async deleteTodo(id) {
    const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

    // Fire the query to delete the todo
    const res = await this.db.delete('todos').where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true };
  }

  async updateTodo(id, isCompleted) {
    const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

    // Fire the query to update the todo
    const res = await this.db.update('todos').set({ isCompleted: isCompleted }).where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true };
  }

  async getTodos() {
    const condition = cond('userId', '==', this.userId);

    // Fire the query to get the todos
    const res = await this.db.get('todos').where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, todos: res.data.result };
  }

  generateId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

export default Service
```

## Bind the Todo.jsx File

Now let's head over to the todo.jsx file. 

We already have functions for adding, removing and updating todos here. Currently they directly make mutations to the react state. What we want to do instead is call the methods on the client object which in turn will interact with space cloud.

So as a first step, let's import the client object.

```js
import client from '../../client';
```

### Add Todo

Now inside the addTodo handler, we'll call the `client.addTodo()` function and pass the value variable. Once this promise completes, check for errors and then append the newly inserted todo to the list.

```js
const addTodo = () => {
  client.addTodo(value).then(res => {
    if (!res.ack) {
      alert('Could not add todo');
      return;
    }
    
    setList(list.concat(res.doc))
    setValue('')
  })
}
```

### Delete Todo
Similarly in the delete todo we'll call the delete todo function, pass the provided id and if everything goes well, we'll filter out the todo from our state.

```js
const deleteTodo = id => {
  client.deleteTodo(id).then(res => {
    if (!res.ack) {
      alert('Could not delete todo');
      return;
    }

    setList(list.filter(todo => id !== todo._id));
  })
}
```

### Update Todo

Update isn't very different either. We'll be calling the updateTodo function here. Along with the todo id, we'll also pass the new state of the todo. Handle the errors, and then update the list we have.

```js
const updateTodo = todo => {
  client.updateTodo(todo._id, !todo.isCompleted).then(res => {
    if (!res.ack) {
      alert('Could not update todo');
      return;
    }

    setList(list.map(t => {
      if (t._id !== todo._id) return t;
      return Object.assign({}, t, { isCompleted: !todo.isCompleted })
    }))
  })
}
```

### Get Todo

The only task remaining now is fetching the todos, We'll do that in the empty effect we have here. Let's call the `client.getTodos()` function, and simply load it in our state.

```js
useEffect(() => {
  // Acts as ComponentDidMount
  client.getTodos().then(res => {
    if (!res.ack) {
      alert('Could not update todo');
      return;
    }

    setList(res.todos);
  })
}, [0]);
```

## Final Todo.jsx file

```js
import React, { useState, useEffect } from 'react'
import './todo.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import client from '../../client';

function Todo() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  let counter = 0

  useEffect(() => {
    // Acts as ComponentDidMount
    client.getTodos().then(res => {
      if (!res.ack) {
        alert('Could not update todo');
        return;
      }
  
      setList(res.todos);
    })
  }, [0]);

  const addTodo = () => {
    client.addTodo(value).then(res => {
      if (!res.ack) {
        alert('Could not add todo');
        return;
      }
      
      setList(list.concat(res.doc))
      setValue('')
    })
  }

  const deleteTodo = id => {
    client.deleteTodo(id).then(res => {
      if (!res.ack) {
        alert('Could not delete todo');
        return;
      }
  
      setList(list.filter(todo => id !== todo._id));
    })
  }

  const updateTodo = todo => {
    client.updateTodo(todo._id, !todo.isCompleted).then(res => {
      if (!res.ack) {
        alert('Could not update todo');
        return;
      }
  
      setList(list.map(t => {
        if (t._id !== todo._id) return t;
        return Object.assign({}, t, { isCompleted: !todo.isCompleted })
      }))
    })
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="todo-app">
      <div className="add-todo">
        <Link to="/">
          <i class="material-icons">arrow_back</i>
        </Link>
        <h2>To-do App</h2>
        <div class="todo-flex">
          <div>Add a task:</div>
          <div class="todo-flex">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleEnter}></input>
            <button type="button" onClick={addTodo} disabled={!value}>Add</button>
          </div>
        </div>
      </div>
      <div>
        {list.map((item) => (
          <div key={item} className="single-todo">
            <input className="checkbox" onChange={() => updateTodo(item)} checked={item.isCompleted} type="checkbox" />
            <span className="todo-item">{item.value}</span>
            <i className="material-icons delete" onClick={() => deleteTodo(item._id)}>delete</i>
          </div>)
        )}
      </div>
    </div>
  )
}

export default Todo
```

Now log into the app. Add, remove and update todos. We can't really tell the difference here.

Try refreshing and then logging in again. All your todos will be fetched from MongoDB and reappear just as you had left them. You can verify this with the data stored in mongo db.

So we just saw how to make a todo app in react without having to write any backend code whatsoever. We could have done this entire tutorial in under 30 minutes but I guess I just talk a lot.

Before you cut it out and carry on, there is something more I have to show you. Right now our app is not realtime. What I mean by that is, adding todos in one client doesn't sync automatically with the other active clients.

In the next topic I'll talk about how we can make this app realtime with minor modifications. It's gonna be super amazing!
