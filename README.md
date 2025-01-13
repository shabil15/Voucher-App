# Voucher Management App

## Overview
This project is a simple admin dashboard designed to manage vouchers. It allows users to generate QR codes for vouchers, view them, and configure various voucher settings. The app is built with a React frontend and an Express backend, with data stored in a MySQL database.

## Features
- **View Vouchers**: Display a list of vouchers.
- **Generate QR Codes**: Create vouchers with unique QR codes and expiration dates.
- **Settings Page**: Configure voucher properties such as expiry time, dimensions, and font sizes.
- **SweetAlert Integration**: Provides interactive alerts for user actions.

## Technologies Used
- **Frontend**: React.js with TailwindCSS for styling
- **Backend**: Express.js for the server and API endpoints
- **Database**: MySQL for storing voucher data
- **QR Code Generation**: QR Code library for generating unique QR codes

## Project Setup

### Clone the Repository
To get started, clone the repository:
```bash
git clone https://github.com/shabil15/Voucher-App.git
```

2. Install the required npm packages:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory and add your database details:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=voucher_app
DB_PORT=3306
```

4. Set up the MySQL database:
   
   Create the Database:
   ```sql
   CREATE DATABASE voucher_app;
   USE voucher_app;
   ```

   Create the Vouchers Table:
   ```sql
   CREATE TABLE Vouchers (
    id INT IDENTITY PRIMARY KEY,
    code NVARCHAR(50) NOT NULL,
    generatedDate DATETIME NOT NULL,
    expiryDate DATETIME NOT NULL,
    qrCode NVARCHAR(MAX) NOT NULL
    );

   ```

5. Run the server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000` to view the dashboard.

5. For login Use the Hard coded username and password
```
username : admin
password : 12345
```

## Usage
- **Dashboard Interface**: Access the dashboard to manage vouchers. Generate new vouchers with QR codes, search through the list, and delete entries if needed.
- **Settings Page**: Use the settings page to configure voucher properties such as expiry time, dimensions, and font sizes.
- **API Endpoints**: The backend provides RESTful API endpoints to perform CRUD operations on vouchers.
