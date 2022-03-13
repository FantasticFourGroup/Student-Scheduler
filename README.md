# Student Scheduler

A student scheduler to manage and track class schedules

[![CircleCI](https://circleci.com/gh/FantasticFourGroup/Student-Scheduler.svg?style=svg)](https://student-scheduler.netlify.app/)

![image](https://user-images.githubusercontent.com/49836841/158064250-e961c2c4-3f66-4d58-adc8-a5d1e16106c9.png)

<img width="960" alt="image" src="https://user-images.githubusercontent.com/49836841/157787420-afcea976-8d8b-4b4d-ad04-499877f636a8.png">


## Table of contents

- [General info](#general-info)
- [Setup Scheduler](#setup-web-app)
- [Gallery](#gallery)

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

## Gallery

![image](https://user-images.githubusercontent.com/49836841/158064288-bdcbed79-1882-4781-a669-0f29423c5b18.png)

<img width="960" alt="image" src="https://user-images.githubusercontent.com/49836841/158064489-0a7fb270-9d26-4075-a7f2-a98388809b02.png">
