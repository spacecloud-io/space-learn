---
title: "Securing our app"
description: Let's make our app fully secure
date: 2019-07-16T20:11:26+05:30
draft: true
weight: 8
---

Security must never be coupled with business logic

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