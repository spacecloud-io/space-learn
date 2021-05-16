---
title: Set Up Space Cloud
description: Learn how to setup Space Cloud on your local machine using docker
date: 2020-01-21T00:00:00+05:30
draft: false
weight: 2
---

The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most important components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GraphQL APIs.
- **Runner:** Responsible for communicating with K8s and deploying your services.

Luckily, we don't have to interact with these components directly. Space Cloud ships with a utility named `space-cli` which bootstraps a cluster for us.

## Installing Kubernetes

Space Cloud uses Kubernetes under the hood to provide all its features. The first step to installing Space Cloud is getting a Kubernetes environment up and running.

> Make sure you have [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and have added it to your `$PATH`.

### Installing Kubernetes on Linux

Install the latest version of [K3s](https://rancher.com/docs/k3s/latest/en/quick-start/).

Start K3s:

```bash
curl -sfL https://get.k3s.io | sh -s - server --disable traefik --docker
```

Copy the config file for future use

```bash
sudo chmod 775 /etc/rancher/k3s/k3s.yaml
mkdir ~/.kube
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

### Installing Kubernetes on Windows / MacOS

Install the latest version of [Docker Desktop](https://www.docker.com/products/docker-desktop).

> We recommend enabling WSL2 on Windows for the best experience. Refer to [this guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to enable WSL2 on Windows.

**Don't forget to enable Kubernetes from the Docker Desktop Dashboard.**

> Make sure you provide atleast _2 CPUs and 4GB Memory_ to the Docker Desktop VM. This isn't required when using WSL2.

## Installing Istio

Space Cloud requires [Istio](https://istio.io/docs/setup/getting-started/) to work correctly. The default Istio profile works perfectly well.

Download the latest istio release:
```bash
curl -L https://istio.io/downloadIstio | sh -
```

> **Space Cloud has been tested with Istio versions `v1.8.X`, `v1.7.X` and `v1.6.X`.**

Move to the Istio package directory and install Istio. For example, if the package is `istio-1.8.0`:
```bash
cd istio-1.8.0
./bin/istioctl install --set profile=demo
```

For more detailed Istio install instructions, visit the [Istio Docs](https://istio.io/latest/docs/setup/install/istioctl/)

## Installing Space CLI

The first step is downloading `space-cli`. You can download a version for your particular platform:

- [Linux](https://storage.googleapis.com/space-cloud/linux/space-cli.zip)
- [MacOS](https://storage.googleapis.com/space-cloud/darwin/space-cli.zip)
- [Windows](https://storage.googleapis.com/space-cloud/windows/space-cli.zip)

Unzip the compressed archive.

**For Linux / Mac:** `unzip space-cli.zip && chmod +x space-cli`

**For Windows:** Right-click on the archive and select `extract here`.

Copy the `space-cli` binary to your environment path variable for global usage.

**For Linux / Mac:** `sudo mv ./space-cli /usr/local/bin/space-cli`.

**For Windows:** Add the path of the `space-cli.exe` to the environment variable `PATH` for making `space-cli` accessible globally.

## Setting up Space Cloud

We can set up all Space Cloud components using a single command.

```bash
space-cli setup
```

> **For details on how to customise Space Cloud installation, visit the [customisation docs](https://docs.space-cloud.io/install/kubernetes/configure).**

## Verify Installation

Verify the installation run the following docker command:

```bash
kubectl get pods -n space-cloud -w
```

All the pods shown should be in the running state.

## Creating your first project

Now that we have got Space Cloud setup, we can open `Mission Control` (Space cloud's admin UI) on [http://localhost:4122/mission-control](http://localhost:4122/mission-control).

If you are using Docker Desktop, open [http://localhost/mission-control](http://localhost/mission-control)

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