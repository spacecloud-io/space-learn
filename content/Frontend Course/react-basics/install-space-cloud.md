---
title: "Install Space Cloud"
description: The first step to using Space Cloud is to install it
date: 2019-08-03T00:00:00+05:30
draft: false
weight: 2
---

In the previous topic, we spoke about what Space Cloud is and where it fits in our stack. In this topic, we'll talk about getting Space Cloud up and running.

There are three primary ways you can deploy Space Cloud. The recommended one is directly in an orchestration system like [Kubernetes](https://kubernetes.io). This makes scaling your deployment a whole lot easier and makes your system more available. Moreover, Space Cloud integrates with Kubernetes. So the enterpise version of Space Cloud can deploy services directly on Kubernetes with a single command.

The second one is deploying it via docker. The final one is manually downloading and deploying the binary on your machine. We'll be going with the manual route in this tutorial.

> **Note:** If you have docker compose set up on your machine, you could probably refer to the [docker compose quickstart guide](https://space-cloud.io/docs/quick-start/docker-compose) to skip the steps below.

## Downloading Space Cloud

First things first, Space Cloud is distributed as a single executable. You can download the zip file for your OS from the links below:

- [Linux](https://storage.googleapis.com/space-cloud/linux/space-cloud.zip)
- [Mac OS](https://storage.googleapis.com/space-cloud/darwin/space-cloud.zip)
- [Windows](https://storage.googleapis.com/space-cloud/windows/space-cloud.zip)


The next step is to unzip the archive.

For Linux / Mac: `unzip space-cloud.zip && chmod +x space-cloud`

For Windows: Right click on the archive and select `extract here`

You'll find a binary named space-cloud or space-cloud.exe depending on your platform. Make it available on `PATH` if required.


You can check if everything is perfectly installed by running the `space-cloud -v` command. If the dev gods are pleased with you, you'll see an output similar to this.

```bash
space-cloud-ee version 0.11.0
```

## Start Space Cloud

Running Space Cloud is pretty straight forward. All you need to do is run the following command:

```bash
space-cloud run --dev
```

> **Note:** The `--dev` flag instructs Space Cloud to let anyone configure it. It is not recommended to use this flag in production.

Running this command starts downloading mission-control, which is Space Cloud's Admin UI. We'll be needing this to configure Space Cloud. Space Cloud is smart enough to download the ui only if it isn't already present or there is a new update available.

The run command will also generate a default config file by the name of `config.yaml` within the same working directory if it doesn't already exist. If you already had a `config.yaml` present, it will load that instead.

Optionally you can also direct Space Cloud to use a `config.yaml` from any location. You can do that by running:

```bash
space-cloud run --dev --config /path/to/config.yaml
```

> **Note:** Your file name need not be `config.yaml`

## Create a Project

The run command prints out the link to mission control. Open that link in a browser. You'll be greeted by a screen which prompts you to create a project. All Space Cloud knobs including the enterpise features and billing are available here. All development related features of Space Cloud are completely open source and always will be. I'll be explicit if I'm talking about an enterprise feature. 

I'll be talking about how to use mission control to configure Space Cloud in the next topic.

I hope everything worked perfectly well. You can follow the same process to download Space Cloud on the environment of your choice. 
