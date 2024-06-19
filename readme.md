## Setup
1. Install node js https://nodejs.org/en/download/current
2. Install pnpm via terminal: `npm add -g pnpm`
3. clone this repo
4. Install dependencies: `pnpm i`
5. This is a monorepo using https://pnpm.io/workspaces

## Development
1. app/ contains the actual app
2. crypto/ contains cryptographic utilities
5. cd into app: `cd app`
6. run in terminal: `pnpm dev`

## Framework Guides
1. https://vuejs.org/guide/introduction.html
2. https://nuxt.com/docs/getting-started/introduction
    ### Styling
    3. https://tailwindcss.com/docs/utility-first
    4. https://daisyui.com/docs/use/
    ### Backend
    5. https://orm.drizzle.team/docs/overview
    ### Form Creation
    6. https://formkit.com/getting-started/what-is-formkit

## Notes for Production builds:
* TODO

## Directory Structure of App folder
* Following Nuxt's directory structure, some of the app's modules are split:
### Example for the auth module:
* `composables/auth` contains authentication related composable functions
* `components/auth` contains authentication related components
* `utils/auth` contains authentication related utilities
* Example Usage:
    ```ts
    import { mouth } from '~/utils/peri/mouth'
    ```

## Packages
* [__crypto__](./crypto/): A package for cryptographic utilities

https://nuxt.com/docs/guide/directory-structure/env
## Database setup
1. Setup [postgresql](https://www.postgresql.org/download/)
4. Next, we need a database user, either create a new one or use the default postgres admin account.
    1. Admin credentials:
        * username: postgres
        * password: postgres
    2. Create a database user:
        1. Open a terminal.
        2. Run `psql` to login using the default admin account. This will drop you in postgres' repl.
            ```bash
            psql
            ```
        3. Create a database user:
            ```sql
            CREATE USER username WITH PASSWORD 'password' CREATEDB REPLICATION;
            ```
            Note: must use single quotes for the password
        4. Exit the psql shell w/:
            ```bash
            \q
            ```
3. Learn [Drizzle](https://orm.drizzle.team/docs/overview)

4. Afterwards, go to [./app](./app/), then create a [.env](https://nuxt.com/docs/guide/directory-structure/env) file with the ff variables:
    ```bash
    DB_URL=postgres://<DB_USER>:<DB:PASSWORD><DB_HOST>:<DB_PORT><DB_NAME>
    ```
    Example using the default postgres admin account:
    ```bash
    # depending on your setup, host may be 127.0.0.1 or localhost, so try one of these variations
    DB_URL=postgresql:///postgres?host=localhost
    DB_URL=postgresql:///postgres?host=127.0.0.1
    ```
    Example using a custom user:
    ```bash
    DB_URL=postgres://admin:password@127.0.0.1:5432/postgres
    DB_URL=postgres://postgres@localhost:5432/postgres 
    ```

5. Run database migration:
    ```bash
    # cd app # make sure you're in the app folder
    pnpm db:generate
    ```
6. Create the database:
    ```bash
    # cd app # make sure you're in the app folder
    pnpm db:push
    ```
7. You can view the database using [Drizzle Studio](https://orm.drizzle.team/docs/studio)
    ```bash
    # cd app # make sure you're in the app folder
    pnpm db:studio
    ```
    open https://local.drizzle.studio

## VSCode
### Extensions
* Install the extensions found in .vscode/extensions.json
### Tasks
* Run the EVERYTHING task by: 
    * Clicking: VSCode's topbar > Terminal > Run Task > Everything
    * or: `Ctrl+Shift+B` then select `Everything`
* If you're using NixOS like me, run `nix:db` first
## Notes
* Default fonts are in default.vue
