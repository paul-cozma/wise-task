# Registration Form and Task List App

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage](#usage)

## Introduction

This project includes a registration form and a task list application built with ReactJS and TypeScript.

## Features

### Registration Form

#### Fields:

- `fname`: First Name
- `lname`: Last Name
- `email`: Email Address

#### Validations:

- All fields are required.
- Email validation is performed.

After successful login, the user is redirected to the Task List page.

### Task List

- Data can be managed using JSON objects, saved either in a file or in local storage.
- A Promise is used to simulate an API call.
- Tasks can be sorted by date.
- Tasks can be searched by title.
- Actions available: Add, Edit, Delete tasks.
- Task attributes: `title`, `description`, `createDate`. After saving a task, the list is refreshed.

## Requirements

- ReactJS
- React hooks where possible
- TypeScript

Feel free to add any additional libraries or tools as you see fit.

## Installation

```bash
# Clone the repository
git clone https://github.com/paul-cozma/wise-task.git

# Navigate to the project directory
cd wise-task

# Install dependencies
npm install

# Start the application
npm run dev
```

## Usage

1. Open the registration form and fill in the required fields.
2. After successful login, you will be redirected to the Task List page where you can manage your tasks.

The code can be uploaded to GitHub for version control.

---
