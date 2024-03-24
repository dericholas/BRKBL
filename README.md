# SNOW-BOARDS

## Description

SNOW-BOARDS is a social media platform designed specifically for the skiing and snowboarding community. Leveraging the power of React.js for its dynamic and responsive front end, and Express.js for its robust backend, SNOW-BOARDS provides a unique space for enthusiasts to share their experiences, connect with fellow adventurers, and plan their next skiing or snowboarding trip.

The platform was developed with the goal of fostering a vibrant community where users can upload photos and videos captured on the slopes, engage in discussions, and share their passion for the outdoors. By offering features such as trip planning, media sharing, and a platform for users to connect and interact, SNOW-BOARDS aims to be the go-to destination for all things related to skiing and snowboarding.


## Installation

For a copy of this repository please `Download ZIP` (found under the green `Code` button).

### 

## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the `server` folder, create a `.env` file to hold the session secret. This will allow Passport to keep track of the currently signed-in user in session. Include a SESSION_SECRET in the `.env`:

   ```env
   SESSION_SECRET=""
   ```

3. Create your base PostgreSQL database. Check the `server/src/config/getDatabaseUrl` file for the name of the `development` database. For example:

   ```sh
   createdb snow_boards_development
   ```

4. Run the included `users` table migration:

   ```sh
   cd server
   yarn migrate:latest
   ```

5. Start up the application, from the root folder:

   ```sh
   cd .. # if in the server folder

   yarn run dev
   ```

6. Navigate to <http://localhost:3000>. You should see the text "". Ensure you can sign up, sign in, and sign out users.
