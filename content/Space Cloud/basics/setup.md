---
title: Set Up Space Cloud
description: Learn how to setup Space Cloud on your local machine using docker
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 2
---

The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most notable components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GaphQL APIs
- **Runner:** Responsible for intra cluster traffic and policy enforcement
- **Container Registry:** Responsible for storing docker images. We won't be needing this for local setup.

Luckily, we don't have to interact with these components in most use cases directly. Space Cloud ships with a utility named `space-cli` which will bootstrap a cluster for us.

## Prerequisites

- Make sure you have [Docker installed](https://docs.docker.com/install/).

## Downloading Space CLI

The first step is downloading `space-cli`. You can download a version for your particular platform:

- [Linux](https://spaceuptech.com/downloads/linux/space-cli.zip)
- [MacOS](https://spaceuptech.com/downloads/darwin/space-cli.zip)
- [Windows](https://spaceuptech.com/downloads/windows/space-cli.zip)

Unzip the compressed archive.

**For Linux / Mac:** `unzip space-cli.zip && chmod +x space-cli`

**For Windows:** Right-click on the archive and select `extract here`.

To make sure if space-cli binary is correct, type the following command from the directory where space-cli is downloaded:

**For Linux / Mac:** `./space-cli -v`

**For Windows:** `space-cli.exe -v`

This will print the `space-cli` version.

> Optionally, you can copy the `space-cli` binary to your environment path variable for global usage.

## Setting up Space Cloud

We can set up all Space Cloud components using a single command.

```bash
./space-cli setup --dev
```

The `setup` command selects `Docker` as a target by default and runs all the containers required to setup Space Cloud. On successful installation it will generate an output similar to this one:

```bash
INFO[0000] Setting up space cloud on docker
INFO[0000] Starting container space-cloud-gateway...
INFO[0000] Starting container space-cloud-runner...
INFO[0001] Space Cloud (id: "local-admin") has been successfully setup! :D
INFO[0001] You can visit mission control at http://localhost:4122/mission-control
INFO[0001] Your login credentials: [username: "local-admin"; key: "kUkqBffI1ISR"]
```

<!-- > **Note:** You can learn more about the `space-cli setup` command from [here]() link to the docs. -->

## Verify Installation

Verify the installation run the following docker command:

```bash
docker ps --filter=name=space-cloud
```

You should see an output similar to this!

```
CONTAINER ID        IMAGE                 COMMAND             CREATED              STATUS              PORTS                    NAMES
1263f8ab1372        spaceuptech/runner    "./app start"       About a minute ago   Up About a minute                            space-cloud-runner
35f820b550c7        spaceuptech/gateway   "./app run"         About a minute ago   Up About a minute   0.0.0.0:4122->4122/tcp   space-cloud-gateway
```

## Creating your first project

Now that we have got Space Cloud setup, we can open `Mission Control` (Space cloud's admin UI) on [http://localhost:4122/mission-control](http://localhost:4122/mission-control).

You will be greeted by a screen like this:

![Welcome Screen](/images/screenshots/welcome.png)

Hit on the `CREATE A PROJECT` button to open the following page:

![Create Project Screen](/images/screenshots/create-project.png)

Enter a project name. You can stick to `MyProject` for this one.

Hit the `Create Project` button.

Mission Control will ask for setting up a database now:

![Add Database Screen](/images/screenshots/create-project-add-database-step.png)

If you already have one, feel free to configure it. For now, we'll skip this step since we don't have a database running at this point.

## Next Steps

Great! We successfully set up a Space Cloud on Docker and created our first project with it.

Continue to the next guide to add a database to our newly created project and perform some queries on it.