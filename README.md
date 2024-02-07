# Engage Boilerplate

## Installation

For a copy of this repository please `Download ZIP` (found under the green `Code` button).

After unpacking the ZIP you can rename the folder/ directory for your new project.

### Rename Boilerplate

The application will have all configurations set up with the name `engage-boilerplate`. You can change the name to match and be consistent with the name of your project. To do this, use a global search (using the Search magnifying glass in VSCode) to look for all instances of `engage-boilerplate` and replace it with the hyphenated name of your project (the search should find references to files with your database names, `package.json` files, etc.).

## Adding to GitHub

1. Initialize your project with GitHub in the terminal:

   ```sh
   git init
   git add .
   git commit -m "initial commit"
   ```

2. Create a new repository on your GitHub:

   - From your GitHub page in the browser, click on the tab for `Repositories`, then click the green button for `New`
   - Add a Repository name - for simplicity, you might use the same name that you chose for the project
   - Select `Public` for the type of repository if you want others to see your work
   - Skip any options that mention adding additional files (such as a README.md or .gitignore)
   - Click `Create Repository`

3. On the next page, you will see sets of terminal commands. Use the option to `push an existing repository from the command line`:

   ```sh
   git remote add origin <- use the provided URL to your repo on GitHub ->
   git branch -M main
   git push -u origin main
   ```

## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the `server` folder, create a `.env` file to hold the session secret. This will allow Passport to keep track of the currently signed-in user in session. Include a SESSION_SECRET in the `.env`:

   ```env
   SESSION_SECRET="ff521741-6d5a-48d2-96a9-b95bbcf60bc4"
   ```

3. Create your base PostgreSQL database. Check the `server/src/config/getDatabaseUrl` file for the name of the `development` database. For example:

   ```sh
   createdb engage-boilerplate_development
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

6. Navigate to <http://localhost:3000>. You should see the text "Hello from react". Ensure you can sign up, sign in, and sign out users.
