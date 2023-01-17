# Dr. Smith Medical Centre Application :stethoscope:

The primary users of the application will be the patients and the reception of the Dr. Smith Medical Centre.
Patients will be able to view Dr. Smith's appointments so they know what options they have when
booking an appointment through the reception. Patients will be able to find the contact information
of the Dr. Smith Medical Centre on the application.
Receptionists will use the application as a tool to carry out their job responsibilities.
This includes scheduling appointments for Dr. Smith as well as getting medical and contact information
from the patient and storing the information.

## Software Requirements

### System Architecture

The web application will be built using the MERN stack (MongoDB, Express, React and Node.js).

MongoDB will be used to store data such as Dr. Smith's appointments and patient information.  
Express is a web framework for Node.js that will be used to build the custom backend server.  
React is a JavaScript library that will be used to build the frontend of the web-application.  
Node.js will be used for the JavaScript runtime environment.

The web application will be deployed using Heroku. 
Using Heroku to deploy will allow for an easy configuration of the custom backend server.

Other benefits of deploying the application on Heroku are:

- It is a free service
- It is easy to scale the application
- It is easy to use

The web application will be developed using Create-React-App since performance won't be a major concern.

The web application will be styled using CSS, React-Bootstrap and Material-UI.  
These styling tools are free to use, easy to setup and provide a consistent look and feel to the
application.

### System Requirements

#### Functional Requirements

- The normal end-user should be able to view the doctor's appointments for the next 2 weeks.
- Each appointment should display the patient's name, date and time of the appointment.
- The normal end-user should be able to view the medical centre's contact information.
- The normal end-user should be able to sign in as an admin.
- The admin user should be able to view all of the doctor's appointments.
- The admin user should be able to create appointments for the doctors.
- The admin user should be able to edit the appointments.
- The admin user should be able to delete an appointment.
- The admin user should be able to view the patient's medical and contact information of a specific
  appointment.

#### Non-Functional Requirements

- The application should be developed using the MERN stack (MongoDB, Express, React, Node).
- The application should be developed to be easily maintainable.
- The application should be designed with a doctor's receptionist and a doctor's patient as the 2
  primary users.
- The application should be able to store data such as the patient's medical and contact information in
  a secure database.
- The application should be able to authenticate admin users using at least 3 different passport strategies.
- The application should be cost-effective as it will be used by a private institution.
- The application should be available for all browsers (Edge, Chrome, Firefox, Safari, Brave etc.)
- The application should be available for all operating systems (Windows, Mac, Linux etc.)
- The admin sign-in credentials should be protected using JWT and password hashing.
- The application should be able to be deployed on Heroku.

#### User Stories :memo:

- As a normal end-user, I want to view the doctor's appointments so that I know when I can make an
  appointment for.
- As a normal end-user, I want to view the medical centre's contact information so that I can phone
  them to make an appointment.
- As a normal end-user, I want to view the medical centre's address so that I can get directions when
  going for an appointment.
- As a normal end-user, I want to sign in as an admin so that I can get access to the admin tools.
- As a admin user, I want to view all the doctors appointments so that I have a clear understanding of
  when I can or cannot create an appointment for.
- As a admin user, I want to be able to create new appointments for the doctor so that I can fulfil my job
  responsibilities.
- As a admin user, I want to be able to edit an existing appointment so that I can reschedule a
  patient's appointment.
- As a admin user, I want to be able to delete an existing appointment so that if a patient wants to cancel, it
  can be removed from the doctor's list of appointments.

#### Competition

The primary competition for this application is the [NetCare online web application](https://www.netcare.co.za/).

The NetCare online web application is a web application that allows patients to book appointments 
with a number of doctors that are apart of the NetCare group. 
Dr Smith Medical Centre is a private institution for one doctor alone. This will make development 
and maintenance of the application simpler, faster and more cost-effective.

<br />
<hr>
<br />

## How To Use The Application
<br />

### As a Normal End User

#### At the [homepage](https://dr-smith-medical-centre.herokuapp.com/) normal users can: 
- Navigate to the page that displays Dr Smith's appointments by clicking the 'VIEW APPOINTMENTS' button
- Navigate to the page that lets a user login as an admin user by clicking the 'I AM AN ADMINISTRATOR' button
- Scroll down to view the 'About Us' section
- Scroll down to view the 'Reviews' section
- Scroll down to view the 'Contact Us' section

#### At the [appointments page](https://dr-smith-medical-centre.herokuapp.com/appointments) normal users can:
- View Dr Smith's appointments for the next 2 weeks
- View the 'Contact Us' section
- Navigate to the page that lets a user login as an admin user by clicking the 'LOGIN AS ADMIN' button
- Navigate back to the homepage by clicking 'Home' in the navigation bar

### As a Admin User

#### At the [homepage](https://dr-smith-medical-centre.herokuapp.com/) and [appointments page](https://dr-smith-medical-centre.herokuapp.com/appointments) the admin users can:
- Do the same as what a normal end user can do

#### At the [admin dashboard page](https://dr-smith-medical-centre.herokuapp.com/admin-dashboard) admin users can:
- View all of Dr Smith's appointments 
- Create a new appointment by filling in the new appointment details and clicking the 'CREATE NEW APPOINTMENT' button
- Edit an appointment by clicking the 'EDIT' button of the appointment you want to edit, fill in the updated details and click the 'SAVE CHANGES' button 
- Delete an appointment by clicking the 'DELETE' button of the appointment you want to delete
- Sign out of their admin account by clicking the 'SIGN OUT' button

#### At the [create new admin page](https://dr-smith-medical-centre.herokuapp.com/create-new-admin) admin users can:
- Create a new admin account by filling in the new admin account details and clicking the 'CREATE' button

<br />
<hr>
<br />

## Setting Up The Application On Your Local Machine
<br />

### Installation :package:

#### Downloading the application from GitHub

1. Download the application by clicking the 'Code' button and then clicking 'Download ZIP'
2. Extract the ZIP file to a folder of your choice

#### Setting Up Your .env Files :key:

#### :green_square: Backend

1. Create a .env file in the root directory of the backend folder
2. Add the following environment variables to the .env file

```
MONGO_URI=<YOUR_MONGO_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
ADMIN_USERNAME=<YOUR_ADMIN_USERNAME>
ADMIN_PASSWORD=<YOUR_ADMIN_PASSWORD>
```

#### :blue_square: Frontend

1. Create a .env file in the root directory of the frontend folder
2. Add the following environment variables to the .env file

```
REACT_APP_ADMIN_USERNAME=<YOUR_ADMIN_USERNAME>
REACT_APP_ADMIN_PASSWORD=<YOUR_ADMIN_PASSWORD>
REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
REACT_APP_FACEBOOK_APP_ID=<YOUR_FACEBOOK_APP_ID>
```

### Running The App :desktop_computer:

#### :green_square: Backend

1. Open a terminal in the root directory of the backend folder
2. Run the following command to install the dependencies

```
npm install
```

3. Run the following command to start the backend server

```
npm start
```

#### :blue_square: Frontend

1. Open a terminal in the root directory of the frontend folder
2. Run the following command to install the dependencies

```
npm install
```

3. Run the following command to start the frontend server

```
npm start
```

4. Open a browser and navigate to http://localhost:3000/

<br />


### Testing The App :test_tube:

#### :green_square: Backend

1. Open a terminal in the root directory of the backend folder
2. Ensure that the backend server is running
3. Run the following command to test the backend server

```
npm test
```

#### :blue_square: Frontend

1. Open a terminal in the root directory of the frontend folder
2. Ensure that the frontend server is running
3. Run the following command to test the frontend server

```
npm test
```

<br />
<hr>
<br />

## Security :shield:

Applied Helmet security to the Express app.

- Protects the app from well-known web vulnerabilities by setting HTTP headers appropriately.
- Prevents cross-site scripting attacks.
- Enforces secure (HTTPS) connections to the server.
- Protects from clickjacking

_Reference: https://expressjs.com/en/advanced/best-practice-security.html_

This application does not make use of any external API's and therefore does not need to secure any API keys.

## Deployment :rocket:

This application was deployed using [Heroku](https://www.heroku.com/). I deployed the frontend and backend together. I decided to do it this way since the frontend and backend are both deployed on Heroku and therefore it is easier to deploy them together. I was the only person to work on this project and therefore created the backend and frontend myself. I used the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to deploy the application.

### Deployed App - [https://dr-smith-medical-centre.herokuapp.com/](https://dr-smith-medical-centre.herokuapp.com/)
<br />

### __This project's website is currently down due to Heroku removing their free dynos plan*__

### Github Repository - [

