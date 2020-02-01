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
- **Container Registry:** Responsible for storing docker images. We won't be needing this for a local setup.

Luckily, we don't have to directly interact with these components in most use cases. Space Cloud ships with a utility named `space-cli` which will bootstrap a cluster for us.

## Prerequisites

- Make sure you have [Docker installed](https://docs.docker.com/install/).

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
./space-cli setup --dev
```

The `setup` command select `Docker` as a target by default and run all the containers required tp setup Space Cloud. On successful installation it will generate an output similar to this one:

```bash
Output of space cloud setup command goes here
```

> **Note:** You can learn more about the `space-cli setup` command from [here]() link to the docs.
## Verify Installation

Verify the installation run the following docker command

```bash
docker ps --filter=name=space-cloud
```

You should see an output similar to this!

```
Output of the command goes here
```

## Creating your first project

Now that we have got Space Cloud setup we can open `Mission Control` (Space cloud's admin UI) on `http://localhost:4122/mission-control`.

You'll be greated by a sscreen like this one:

[Home screen goes here]

Hit on the `Create a Project` button.

Enter a project name. You can stick to `My Serverless App` for this one.

[Create project screen with name goes here]

Hit the `Create Project` button.

Mission Control will ask for setting up a database now. If you already have one, feel free to configure it. For now we'll skip this step since we don't have a database running at this point

[Add database screen goes here]

## Next Steps

Great! We successfuly set up space cloud on doker and created our first project with it.

Continue to the next guide to add a database to our newly created project and play perform some queries on it.