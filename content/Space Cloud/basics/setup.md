---
title: Set Up Space Cloud
description: Learn how to setup Space Cloud on your local machine using docker
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 2
---

The first step to start using Space Cloud is setting up. Space Cloud requires several components to be running for proper functions. The most notable components are:
- **Gateway:** Responsible for ingress traffic and generation of REST / GaphQL APIs
- **Runner:** Responsible for intra cluster traffic and policy enforcement
- **Store:** Responsible for storing all artifacts

We don't have to directly interact with these components in most use cases. Space Cloud ships with a utility named `space-cli` which will bootstrap a cluster for us.

## Prerequisites

- Make sure you have Docker installed

## Downloading Space CLI

The first step is downloading `space-cli`. You can dowload a version for your particular platform:
- Linux [link for linux]
- MacOS [link for mac os]
- Windows [Link for windows]

You can unzip the compressed archive.

**For Linux / Mac:** `unzip space-cloud.zip && chmod +x space-cloud`

**For Windows:** Right-click on the archive and select `extract here`.

To make sure if space-cloud binary is correct, type the following command from the directory where space-cloud is downloaded:

**For Linux / Mac:** `./space-cloud -v`

**For Windows:** `space-cloud.exe -v`

This will print the `space-cli` version.

> Optionally, you can copy the `space-cli` binary to your environment path variable gor global usage.

## Setting up Space Cloud

We can setup all Space Cloud components using a single command.

```bash
./space-cli setup
```

The `setup` command select `Docker` as a target by default and run all the containers required tp setup Space Cloud. On successful installation it will generate an output similar to this one:

```bash
Output of space cloud setup command goes here
```
## Verify Installation

Verify