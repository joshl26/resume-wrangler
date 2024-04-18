# Resume Wrangler Documentation

<div><img alt="" src="https://github.com/joshl26/resume-wrangler/actions/workflows/playwright.yml/badge.svg" />
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.9-blue.svg?cacheSeconds=2592000" />
  <img alt="NextJS" src="https://img.shields.io/badge/next-%3E%3D14.0.0-blue.svg" />
  <img alt="ReactJS" src="https://img.shields.io/badge/react-%3E%3D18.0.0-blue.svg" />
  <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  <a href="https://github.com/joshl26/resume-wrangler/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/joshl26/resume-wrangler/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/joshl26/resume-wrangler" />
  </a>
</div>
  
<br/>

![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![Home page image](https://raw.githubusercontent.com/joshl26/joshl26/main/assets/Resume_Wrangler_Landing_Page_1.png)

## Table Of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Code Repositories](#code-repositories)
<!-- - [API Documentaion](#api-documentation)
- [Functionalities](#functionalities)
- [Technologies Utilized](#technologies-utilized)
- [Project Setup](#project-setup)
- [Folder Structure](#folder-structure)
- [Database Architecture](#database-architecture)
- [API Payload](#api-payload)
- [Usage - Home Page](#usage-home-page)
- [Usage - Parts List](#usage-parts-list)
- [Usage - New Part](#usage-new-part)
- [Usage - Edit Part](#usage-edit-part)
- [Usage - Users List](#usage-users-list)
- [Usage - New User](#usage-new-user) -->
<!-- - [Usage - Edit User](#usage-edit-user)
- [Usage - Notes List](#usage-notes-list)
- [Usage - New Note](#usage-new-note)
- [Usage - Edit Note](#usage-edit-note)
- [Usage - Tablet](#usage-tablet)
- [Testing](#testing)
- [Screenshotes](#screenshots)
- [Author](#author)
- [Social Links](#social)
- [Contributions](#contributions)
- [License](#license) -->

If you would like to see my progress throughout the development of this application, please take a look at my posts on LinkedIn: [here](https://www.linkedin.com/in/joshrlehman/).

## Introduction

The Resume Wrangler is an innovative platform that aims to simplify the job application process. We offer cutting-edge technological solutions that enhance the user experience and help them navigate the job search with ease.

We take pride in our Artificial Intelligence (AI)-powered software that scans resumes using an in-house ATS scanner. Additionally, we leverage open-source language grammar and spellchecking to further enhance our software's accuracy. We'll share more about this in future updates.

Our platform offers two tiers of registered users:

- Basic user: This is a free membership tier that allows users to explore the platform and create customized cover letters and resumes. Currently, there are no download limits. However, in the future, basic users will be able to download a maximum of 5 PDFs per day.

- Pro user: For a small signup fee of $5, users can upgrade to this tier and enjoy additional benefits. Users with Pro access can download up to 100 full-colour PDF vector graphics per day, complete with clickable links, customizable colours, and user images if desired. Users with Pro will also have access to a wider range of pre-made cover letter and resume templates to choose from.

_____ THIS IS A WORK IN PROGRESS _____

## Live Demo

- [Live Demo](https://resume-wrangler.vercel.app/)

## Code Repositories

- [Resume Wrangler Code](https://github.com/joshl26/resume-wrangler)

<!-- ## API Documentation

- [Live API Documentation](https://resume-wrangler.vercel.app/api-docs/) -->

<a name="functionalities"></a>

<!-- ## Functionalities

- The user will have to log in to edit the resume details.

- The user can only edit/delete the resume that they have access too.

- All the data will be persistent and is stored in the Amazon cloud.

<a name="technologies-utilized"></a>

## Technologies Utilized

- HTML5 - A markup language for creating web pages and web applications.

- CSS3 - used for describing the presentation of a document written in a markup language.

- Bootstrap - A free and open-source front-end web framework for designing websites and web applications quickly.

- Node.js - Open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

- Express.js - For building web applications and APIs and connecting middleware.

- Joi - Used for schema description and data validation.

- Swagger-UI/JS DOC - Powerful UI interface for documenting, testing and displaying API endpoints.

- Unified Modeling Language - Diagrams which illustrate the sequence of events between objects within this app.

- REST - REST (REpresentational State Transfer) is an architectural style for developing web services.

- MongoDB - Open-source cross-platform document-oriented NoSQL database program to store details like user info, campsites info and comments.

- PassportJS - Authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped into any Express-based web application.

- Data Associations - Associating user data with the respective campsites and comments using the reference method.

- Render - Cloud platform as a service used as a web application deployment model.

- AWS - MongoDB is hosted on Amazon ec2 instance.

<a name="project-setup"></a>

## Project Setup

Electronics inventory uses JavaScript, so you will need node.js installed to run this application, which includes downloading its dependencies. If you don't have node installed you can get that [here](https://nodejs.org/en/).

You will also need `git` installed on your computer. You can download it [here](https://git-scm.com/downloads).

Next open a git bash wherever you would like to store electronics inventory and run:

### Frontend (Client) installation

`git clone https://github.com/joshl26/electronics-inventory-frontend`

Once you have the project on your local machine you will want open it in a new terminal window and run:

`npm install`

This command will install the client side dependencies, this may take a bit of time.

Once the installation of the dependencies is complete you can start the project by typing the following command:

`npm run start`

and you will have the development version of the frontend (client) application running on:

`localhost:3000`

### Backend (Server) installation

`git clone https://github.com/joshl26/electronics-inventory-backend`

Once you have the project on your local machine you will want open it in a new terminal window and run:

`npm install`

This command will install the server side dependencies, this may take a bit of time.

Once the installation of the dependencies is complete you can start the project by typing the following command:

`node server`

and you will have the development version of the backend (server) application running on:

`localhost:3500`

You will also need to set up a few environmental constants with a .env file like this:

```text
NODE_ENV=development
DATABASE_URI=mongoURI
ACCESS_TOKEN_SECRET=accessTokenSecret
REFRESH_TOKEN_SECRET=refreshTokenSecret
CLOUDINARY_CLOUD_NAME=cloudinaryCloudName
CLOUDINARY_KEY=cloudinaryKey
CLOUDINARY_SECRET=cloudinarySecret
CLIENT_URL = http://localhost:3000/
SERVER_URL= http://localhost:3500/
```

Next modify your "/config/allowedOrigins.js" file to suit your particular requirements.

<a name="folder-structure"></a>

## Folder Structure

### Backend (Server) File Structure

```text
/electronics-inventory-backend
    /config
        /allowedOrigins.js
        /corsOptions.js
        /dbConn.js
    /controllers
        /authController.js
        /notesController.js
        /partsController.js
        /userController.js
    /logs
        /reqLog.log
    /middleware
        /errorHandler.js
        /logger.js
        /loginLimiter.js
        /verifyJWT.js
    /models
        /Note.js
        /Part.js
        /User.js
    /routes
        /authRoutes.js
        /noteRoutes.js
        /partRoutes.js
        /root.js
        /userRoutes.js
    /views
        /404.html
        /index.html
    /server.js
```

I followed the MVC (Model-View-Controller) architectural pattern when laying out this application. It is an architectural pattern used in software engineering to separate the representation of information from the user's interaction with it.

The MVC format for Node.js involves separating application logic into three distinct components: Models, Views, and Controllers.

Models are responsible for managing data and business rules within an application. They handle interactions between a database and controller by performing CRUD operations on objects stored in memory or persisted in databases like MongoDB.

Views are responsible for displaying output to the user interface as HTML pages, written using EJS (Embedded JavaScript).

Controllers are responsible for coordinating models and views by responding to user input and making changes to data when required. It acts as a bridge between view layer (user interface) and model layer (data access layer). Controllers also contain request handlers that interpret requests coming from users via URLs/HTTP methods such as GET/POST.

## Client (Frontend) Side Layout

```text
/electronics-inventory-frontend
    /app
        /api
            /apiSlice.js
        /settings
            /settingsSlice.js
        /store.js
    /components
        /AddRemoveLayout.jsx
        /Cards.jsx
        /Check.jsx
        /Clear.jsx
        /CustomerReviewCard.jsx
        /CustomerReviews.jsx
        /DashCards.jsx
        /DashFooter.jsx
        /DashHeader.jsx
        /DashLayout.jsx
        /DashMain.jsx
        /Experience.jsx
        /Features.jsx
        /FilePicker.jsx
        /FilesList.jsx
        /ImagePicker.jsx
        /Layout.jsx
        /LoadingPage.jsx
        /NewSignup.jsx
        /Office.jsx
        /OutletLoadingPage.jsx
        /PartCard.jsx
        /Plans.jsx
        /Pricing.jsx
        /Public.jsx
        /ReactGridLayout.jsx
    /config
        /roles.js
    /features
        /auth
            /authApiSlice.jsx
            /authSlice.jsx
            /Login.jsx
            /PersistLogin.jsx
            /Prefetch.jsx
            /RequireAuth.jsx
            /SideBar.jsx
        /charts
            /AreaChart.jsx
            /BarChart.jsx
            /PieChart.jsx
            /utils.js
        /notes
            /EditNote.jsx
            /EditNoteForm.jsx
            /NewNote.jsx
            /Note.jsx
            /notesApiSlice.jsx
            /NotesList.jsx
        /pages
            /CustomerGallery.jsx
            /HeroImage.jsx
            /LandingPage.jsx
            /LoginFooter.jsx
            /LoginHeader.jsx
        /parts
            /EditPart.jsx
            /EditPartForm.jsx
            /Newpart.jsx
            /NewPartForm.jsx
            /Part.jsx
            /partsApiSlice.jsx
            /PartsList.jsx
            /partsSlice.jsx
            /ViewPart.jsx
        /users
            /EditUser.jsx
            /NewUserForm.jsx
            /User.jsx
            /usersApiSlice.jsx
            /UsersList.jsx
    /hooks
        /useAuth.js
        /usePersist.js
    /utils
        /index.js
    /error-page.jsx
    /index.jsx
```

Now that I've displayed the basics of the project, let me demonstrate some of its more intricate features.

<a name="database-architecture"></a>

## Database Architecture

(<https://electronics-inventory-server.onrender.com/api-docs/>)

<a name="api-payload"></a>

## API Payload

```json
{
  "_id": { "$oid": "642affe8f215fc42000f1a5d" },
  "user": { "$oid": "63e2d7733fe329d74d72c49d" },
  "name": "NPN type transistors",
  "description": "It is an NPN type transistor with an operating temperature range of -55 to 150 degrees Celsius. The component can dissipate 625 mW of power, giving it good thermal control for not being a MOSFET, which is designed for thermal dissipation.",
  "qty": { "$numberInt": "6" },
  "partType": "Transistor",
  "createdAt": { "$date": { "$numberLong": "1680539624864" } },
  "updatedAt": { "$date": { "$numberLong": "1693358908403" } },
  "ticket2": { "$numberInt": "513" },
  "__v": { "$numberInt": "49" },
  "images": [
    {
      "_id": "e9a468f7479c58b8f17dd1dc384c77a9",
      "url": "http://res.cloudinary.com/dv6keahg3/image/upload/f_auto/q_auto/v1681347133/ElectronicsInventory/wzqkpczsn7sbehz7yzeu.png",
      "fileName": "ElectronicsInventory/wzqkpczsn7sbehz7yzeu"
    },
    {
      "_id": "b67495ca9fd06be537a7705a9beedd72",
      "url": "http://res.cloudinary.com/dv6keahg3/image/upload/v1681347160/ElectronicsInventory/iierofxtq7w73ds73xka.png",
      "fileName": "ElectronicsInventory/iierofxtq7w73ds73xka"
    }
  ],
  "partNumber": "PN2222A",
  "lotId": "XYZ123",
  "serialNumber": "1234",
  "manufacturer": "ON Semiconductors",
  "updatedBy": "DEMO",
  "mfgDate": "2023-03-12",
  "backOrder": { "$numberInt": "2" },
  "vendorName": "Smiths Supplies",
  "partPackage": "Thru hole",
  "partLocation": "A3",
  "deletedImages": [],
  "cost": { "$numberDouble": "7.89" },
  "createdBy": "Josh"
}
```

Above is an example of the payload that is sent upon making a `POST` request to the /parts route effectively creating a new part entry in the DB by utilizing the createNewPart controller.

```json
{
  "_id": { "$oid": "63e2d7733fe329d74d72c49d" },
  "username": "Josh",
  "password": "$secret_password",
  "roles": ["Employee", "Manager", "Admin"],
  "active": true,
  "__v": { "$numberInt": "1" },
  "colorMode": "",
  "partsListView": "Table"
}
```

Above is an example of the payload that is sent upon making a `POST` request to the /users route effectively creating a new user in the DB by utilizing the createNewUser controller.

```json
{
  "_id": { "$oid": "6425b2d01dd8b0dbf4b35408" },
  "user": { "$oid": "63e2d7733fe329d74d72c49d" },
  "title": "Purchase 10pc - 240V 50A transformers",
  "text": "Per spec: 36F-6908492 (Allied Motors)",
  "completed": false,
  "createdAt": { "$date": { "$numberLong": "1680192208331" } },
  "updatedAt": { "$date": { "$numberLong": "1692809451199" } },
  "ticket": { "$numberInt": "516" },
  "__v": { "$numberInt": "0" }
}
```

An example of the payload (seen above) that is sent upon making a `POST` request to the /notes route effectively creating a new note in the DB by utilizing the createNewNote controller.

<a name="usage-home-page"></a>

## Usage - Home Page

![Home Page Image](https://raw.githubusercontent.com/joshl26/joshl26/main/assets/Laptop_el-in_1.png)

This is the home page of the electronics inventory system dashboard. Clicking any of the links on the left-hand sidebar will take you to their respective page.

<a name="usage-parts-list"></a>

## Usage - Parts List Page

**Parts List Page**
![Partslist Page Image](https://raw.githubusercontent.com/joshl26/joshl26/main/assets/Laptop_el-in.png)

While in the inventory page tab, you will be met with your entire electronics inventory in table form. Clicking on a part row in table will open up a new window displaying all the current information regarding that specific part.

<a name="usage-new-part"></a>

## Usage - New Part Page

**Create Part Page**
![Create Part Page Image](https://raw.githubusercontent.com/joshl26/joshl26/main/assets/Laptop_el-in_2.png)

<a name="usage-edit-part"></a>

## Usage - Edit Part Page

**Edit Part Page**
![Edit Part Page Image](https://raw.githubusercontent.com/joshl26/joshl26/main/assets/Laptop_el-in_2.png)

<a name="usage-users-list"></a>

## Usage - Users List Page

**Users List Page**
![Userslist Page Image](https://raw.githubusercontent.com/joshl26/joshl26/main/assets/Laptop_el-in.png)

<a name="usage-new-user"></a> -->
