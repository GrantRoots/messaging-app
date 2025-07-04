# Messaging App

Messaging app inspired by the app on an iphone. Built with Express, Prisma (PostgreSQL), and React.

## Live

https://messaging-app-gr.netlify.app

Frontend deployed on Netlify
Backend hosted on Koyeb

## Features

- Account creation and authentication with jsonwebtoken
- Create a chatroom with another user
- Send messages back and forth
- Update username

## Installation

1. `git clone git@github.com:GrantRoots/messaging-app.git`
2. `cd messaging-app/api`
3. `npm install`
4. `npm run build`
5. `npm run seed`
6. `npm run start`

- Open new terminal window for the frontend

1. `cd messaging-app/frontend`
2. `npm install`
3. `npm run dev`

## Environment Variables

```
DATABASE_URL="your db url"
JWT_SECRET="secret"
VITE_API_URL="http://localhost:3000" - Backend url for frontend API calls
```
