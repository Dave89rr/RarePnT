# RarePnT

## Technologies Used

<table>
    <thead>
        <tr>
            <th colspan='2'>Front End</th>
            <th colspan='3'>Back End</th>
            <th colspan='5'>Misc</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>React</td>
            <td>Redux</td>
            <td>Node.js</td>
            <td>PostgreSQL</td>
            <td>Sequelize</td>
            <td>VSCode</td>
            <td>Git</td>
            <td>Heroku</td>
            <td>Figma</td>
            <td>Illustrator</td>
        </tr>
        <tr width=10%>
            <td style='text-align:center'><a href='https://reactjs.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30"  /></a></td>
            <td style='text-align:center'><a href='https://redux.js.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="30" /></a></td>
            <td style='text-align:center'><a href='https://nodejs.org/en/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30"  /></a></td>
            <td style='text-align:center' ><a href='https://www.postgresql.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="30"  /></a></td>
            <td style='text-align:center'><a href='https://sequelize.org/v5/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" width="30" /></a></td>
            <td style='text-align:center'><a href='https://code.visualstudio.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="30" /></a></td>
            <td style='text-align:center'><a href='https://git-scm.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="30" /></a></td>
            <td style='text-align:center'><a href='https://www.heroku.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" width="30"  /></a></td>
            <td style='text-align:center'><a href='https://www.figma.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width="30" /></a></td>
            <td style='text-align:center'><a href='https://www.adobe.com/products/illustrator.html'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" width="30" /></a></td>
        </tr>
    </tbody>
</table>

## Basic Overview

RarePnT (Rare Places and Travel) is an AirBnB clone focused on helping people traveling find unique and uncommon tourist places and activities in specific locales.

## [Live Site](https://rarepnt.herokuapp.com)

## [RarePnT Wiki](https://github.com/Dave89rr/RarePnT/wiki/)

## [Database Schema](https://github.com/Dave89rr/RarePnT/wiki/Database-Schema)

## [Features List](https://github.com/Dave89rr/RarePnT/wiki/Features-List)

## [State Shape](https://github.com/Dave89rr/RarePnT/wiki/State-Shape)

## Installation Instructions

Clone or download code to your machine and in the terminal once in the project folder:

### Backend Setup

In your terminal

- cd into the backend folder
- npm install

This will setup all back end dependencies and setup the server.

### DB Setup

Create a psql db user with createdb privileges.

Duplicate the .env.example for the dotenv package.

Update the following variables:

PORT the port that the server will listen to, 8080 by default
DB_USERNAME the user of the created psql db user
DB_PASSWORD the password for the psql db user
SESSION_SECRET a session secret key for encrypting session id's in the database
All other variables should remain the same
Setup PostgreSQL database

Run npx dotenv sequelize db:create
Run npx dotenv sequelize db:migrate
Run npx dotenv sequelize db:seed:all

Only user seeds are provided.

The backend server will start on http://localhost:8080

### Front End Setup

- cd into the frontend folder
- npm install

### Starting servers and testing

- cd into backend
  - npm start
- cd into frontend
  - npm start

The frontend server will be live on http://localhost:3000 by default and you'll be able to test the site locally
