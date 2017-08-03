# Webinar registration sample application

Use IBM Bluemix services to store data from a web form in a NoSQL database

## About this application

This application builds on the basic node.js app created by Bluemix. It
uses Bootstrap to present a responsive web form that lets a user register
for a webinar. When the user clicks the *Submit* button, the node application
takes that data and sends it to the database.

This is a Cloud Foundry application that uses the NPM `cloudant` package to
interact with the database directly. There are two other versions: one creates
a Docker image from the application, and the other handles Cloudant database
access through a microservice hosted in the OpenWhisk serverless environment.

## Prerequisites

You need to have the following tools installed:

* A git client from [https://git-scm.com/downloads](https://git-scm.com/downloads)
* The latest version of node.js and npm from [https://nodejs.org](https://nodejs.org)
(npm is included when you install node)
* The Cloud Foundry command-line utility from [https://docs.cloudfoundry.org/cf-cli/](https://docs.cloudfoundry.org/cf-cli/)
* The Bluemix command-line utility from [https:clis.ng.bluemix.net](clis.ng.bluemix.net)

Once you've got everything installed, you should be able to run the `git`,
`node`, `npm`, `cf`, and `bx` commands with the `--version` option. You should
see something like this:

```
doug@dougs-mbp:~ $ git --version
git version 2.10.1 (Apple Git-78)
doug@dougs-mbp:~ $ node --version
v6.10.3
doug@dougs-mbp:~ $ npm --version
5.0.0
doug@dougs-mbp:~ $ cf --version
cf version 6.28.0+9e024bdbd.2017-06-27
doug@dougs-mbp:~ $ bx --version
bx version 0.5.5+87df0e64-2017-07-03T06:01:06+00:00
```

Don't worry about whether the version numbers match what you see here. As long
as you have a recent version of all the tools, everything should work just
fine.

## Getting started

Before you go any further, run `cf login` and `bx login`. This ensures that
you're connected to your Bluemix account as you go forward.

After cloning or forking the repo, you'll need to deploy the code to your
Bluemix account. Go to the directory with the code and edit the `manifest.yml`
file. You'll need to replace the `name:` and `host:` fields with a name that's
unique across all of Bluemix, so be creative. (_Note:_ Technically the
`name` and `host` fields don't have to be the same, but it's simpler that way.)
