---
title: "Going Realtime"
description: Let's make our app Realtime
date: 2019-07-16T20:11:26+05:30
draft: true
weight: 7
---

So we've got our entire app working.

Congratulations for making it this far.

Now its time to do some super cool things. And by that I mean, it's time to go realtime!

## Configure Space Cloud

Space Cloud has built-in realtime module, which is enabled by default. There are no configurations required at all.

## Update Service

There are some modifications which are required on the client side. The first one is how we fetch the todos. Instead of using the `db.get()` method. We will use the `db.liveQuery()`. It is more or less the same. The key difference is that, `db.get()` returns a **single response** while `db.liveQuery()` returns a **stream of responses**. Basically it will notify us whenever a document / record changes in our result set.

I would highly recomment you to go through [the docs for live query](https://spaceuptech.com/docs/database/live-query) once to understands things better.

The syntax for live query looks something like this:

```js
// Callback for data changes:
const onSnapshot  = (docs, type, changedDoc) => {
   console.log(docs, snapshot, changedDoc)
}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

// Subscribe to any changes in posts of 'frontend' category
let unsubscribe = db.liveQuery('posts').where(condition).subscribe(onSnapshot, onError) 
```

The `onSnapshot` and `onError` functions are the callbacks passed to the `liveQuery.subscribe()` function. The `onSnapshot` function is invoked whenever there is a change in our result set. The `onError` function is invoked whenever there is some error encountered. Pretty obvious right.

The rest is pretty much similar to `db.get()`.

Unlike `db.get()`, `db.liveQuery()` doesnt return a Promise. Instead it returns an unsubscribe function you can use to de-register the liveQuery. This frees up resources on the client.

Also, our `getTodos()` function wouldn't be asynchronous anymore. It will now expect a callback in which it will pass an error or the latest copy of the documents. It will return the `unsubscribe` function so the component can trigger an unsubscribe whenever it unmounts.

So the updated `getTodos()` function will look like this:

```js
getTodos(cb) {
  const condition = cond('userId', '==', this.userId);

  // Callback for data changes:
  const onSnapshot = (docs, type, changedDoc) => {
    cb(null, docs);
  }

  // Callback for error while subscribing
  const onError = (err) => {
    console.log('Live query error', err)
    cb(err)
  }

  // Subscribe to any changes in posts of 'frontend' category
  return this.db.liveQuery('todos').where(condition).subscribe(onSnapshot, onError)
}
```

##  Update the Todo Component

Now we need to go to the `Todo.jsx` file to make the corresponding changes.

Our effect hook will change since it was responsible to get the todos. We will have to pass a callback to `client.getTodo()` function to copy the todos to our react state whenever we get an update. Also, we can simply return our unsubscribe function. React will invoke the function we return in `useEffect` whenever the component unmounts, hence, free up our resources.

```js
useEffect(() => {
  // Acts as ComponentDidMount
  return client.getTodos(((err, todos) => {
    if (err) {
      alert(err);
      return
    }
    setList(todos);
  }))
}, [0]);
```

Since we will be updating our todos on every change via the `client.getTodos()` callback, we do not need to manually update the state on each operation.

Hence we can remove the call to `setList()` in our `addTodo()`, `deleteTodo()` and `updateTodo()` functions.

Our updated `Todo.jsx` looks something like this.

```js
import React, { useState, useEffect } from 'react'
import './todo.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import client from '../../client';

function Todo() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    // Acts as ComponentDidMount
    return client.getTodos(((err, todos) => {
      if (err) {
        alert(err);
        return
      }
      setList(todos);
    }))
  }, [0]);

  const addTodo = () => {
    client.addTodo(value).then(res => {
      if (!res.ack) {
        alert('Could not add todo');
        return;
      }
      
      setValue('')
    })
  }

  const deleteTodo = id => {
    client.deleteTodo(id).then(res => {
      if (!res.ack) {
        alert('Could not delete todo');
        return;
      }  
    })
  }

  const updateTodo = todo => {
    client.updateTodo(todo._id, !todo.isCompleted).then(res => {
      if (!res.ack) {
        alert('Could not update todo');
        return;
      }
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
          <div key={item._id} className="single-todo">
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

## Wrapping Up

We've come along a long way. You have just seen the power of a Backend as a Service. We built a fully functional, realtime todo app without having to write a single line of backend code. Thats a really powerful feature.

And since Space Cloud works will all the popular database, you do not even need to learn a lot of new things. A single API to rule it all out.

However, in such solutions, security is top concern. What is someone blindly deletes all our todos. That would be a security breach.

In the next topic we'll cover how to secure our awesome todo app.