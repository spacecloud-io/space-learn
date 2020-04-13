---
title: Set Up Space Cloud
description: Learn how to setup Space Cloud on your local machine using docker
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 2
---

The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most important components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GaphQL APIs.
- **Runner:** Responsible for intracluster traffic and policy enforcement.
- **Container Registry:** Responsible for storing docker images.

Luckily, we don't have to interact with these components in most use cases directly because Space Cloud ships with a utility named `space-cli` that bootstraps a cluster for us.

## Prerequisites

- Make sure you have [Docker installed](https://docs.docker.com/install/).

## Installing Space CLI

The first step is downloading `space-cli`. You can download a version for your particular platform:

- [Linux](https://spaceuptech.com/downloads/linux/space-cli.zip)
- [MacOS](https://spaceuptech.com/downloads/darwin/space-cli.zip)
- [Windows](https://spaceuptech.com/downloads/windows/space-cli.zip)

Unzip the compressed archive.

**For Linux / Mac:** `unzip space-cli.zip && chmod +x space-cli`

**For Windows:** Right-click on the archive and select `extract here`.

To make sure if the `space-cli` binary is correct, type the following command from the directory where you have downloaded `space-cli`:

**For Linux / Mac:** `./space-cli -v`

**For Windows:** `space-cli.exe -v`

This prints the `space-cli` version.

Copy the `space-cli` binary to your environment path variable for global usage.

**For Linux / Mac:** Copy the `space-cli` to `usr/local/bin`. You may have to use `sudo` depending on the permissions of your `usr/local/bin`.

**For Windows:** Add the path of the `space-cli.exe` to the environment variable `PATH` for making `space-cli` accessible globally.

## Setting up Space Cloud

We can set up all Space Cloud components using a single command.

```bash
space-cli setup --dev
```

The `setup` command selects `Docker` as a target by default and runs all the containers required to setup Space Cloud. On successful installation it generates an output similar to this one:

```bash
INFO[0000] Setting up Space Cloud on docker.            
INFO[0000] Fetching latest Space Cloud Version         
INFO[0000] Starting container space-cloud-gateway...    
INFO[0000] Image spaceuptech/gateway:latest already exists. No need to pull it again 
INFO[0000] Starting container space-cloud-runner...     
INFO[0000] Image spaceuptech/runner:latest already exists. No need to pull it again 

INFO[0001] Space Cloud (id: "local-admin") has been successfully setup! 👍 
INFO[0001] You can visit mission control at http://localhost:4122/mission-control 💻 
INFO[0001] Your login credentials: [username: "local-admin"; key: "KkYr6FvgYsvr"] 🤫
```

<!-- > **Note:** You can learn more about the `space-cli setup` command from [here]() link to the docs. -->

## Verify Installation

Verify the installation run the following docker command:

```bash
docker ps --filter=name=space-cloud
```

You should see an output similar to this!

```bash
CONTAINER ID        IMAGE                        COMMAND             CREATED              STATUS              PORTS                                            NAMES
507ce4042486        spaceuptech/runner:latest    "./app start"       About a minute ago   Up About a minute                                                    space-cloud-runner
33a5a7a9be3a        spaceuptech/gateway:latest   "./app run"         About a minute ago   Up About a minute   0.0.0.0:4122->4122/tcp, 0.0.0.0:4126->4126/tcp   space-cloud-gateway
```

> **You can use the `space-cli start` command to restart these containers if they are stopped manually or by the reboot process of your machine.**

## Creating your first project

Now that we have got Space Cloud setup, we can open `Mission Control` (Space cloud's admin UI) on [http://localhost:4122/mission-control](http://localhost:4122/mission-control).

A screen like this greets you:

![Welcome Screen](/images/screenshots/welcome.png)

Hit on the `CREATE A PROJECT` button to open the following page:

![Create Project Screen](/images/screenshots/create-project.png)

Enter a project name. You can stick to `MyProject` for this one.

Hit the `Create Project` button.

Mission Control now asks for setting up a database:

![Add Database Screen](/images/screenshots/create-project-add-database-step.png)

If you already have one, feel free to configure it. For now, we'll skip this step since we don't have a database running at this point.

> **You can destroy the Space Cloud cluster along with all the deployments by running the `space-cli destroy` command.**

## Next Steps

Great! We have successfully set up a Space Cloud on Docker and created our first project with it.

Continue to the next guide to add a database to our newly created project and perform some queries on it.