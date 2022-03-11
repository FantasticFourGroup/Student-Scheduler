# Student Scheduler

A student scheduler to manage and track class schedules

[![CircleCI](https://circleci.com/gh/FantasticFourGroup/Student-Scheduler.svg?style=svg)](https://student-scheduler.netlify.app/)

![image](https://user-images.githubusercontent.com/49836841/157787372-649691ee-8f51-40d9-ad8f-8f71141e674f.png)

<img width="960" alt="image" src="https://user-images.githubusercontent.com/49836841/157787420-afcea976-8d8b-4b4d-ad04-499877f636a8.png">


## Table of contents

- [General info](#general-info)
- [Setup Scheduler](#setup-web-app)

## General info

Here are the following information about the Student Scheduler app:

- Create, Edit, and Delete subjects
- Drag and move subject cards
- Easy to use
- ✨Free for everyone ✨

Technologies used:

- Typescript - 👨‍💻 A typed superset version of javascript
- Vite.js - ⚡ Next Generation Frontend Tooling
- React - ⚛️ A JavaScript library for building user interfaces
- Firebase - 🔥 - For a real time database

## Setup Web App

To run this project, make sure you have the latest node.js and npm version installed. In my case, I have node.js v14.17.0 and npm 6.14.13.
You can also run the project using yarn.

```sh
$ git https://github.com/FantasticFourGroup/Student-Scheduler student-scheduler
$ cd student-scheduler
$ npm install
```

After installing, you have to configure the environment variablees. To do this, create a  **.env** file using the template **.env.example** and set the required
API secret keys. Make sure to have a firebase account created and a real time database provisioned for this to work.

```bash
VITE_API_KEY=
VITE_PROJECT_ID=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

After that you can run the app.

```sh
$ npm run dev
```

The following instructions will open the app. You can type [localhost:3000](localhost.3000) in your favorite browser to start using the app.


You can also test the production build.

```sh
$ npm run build
$ npm run preview 
```

The following instructions will open the app. You can type [localhost:4173](localhost.4173) to check out the production build.
