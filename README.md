# Github Console 
> Explore users and repositories based on github's APIs

## Introduction
A web application helps to explore and following users, their repositories.

---

### Technical stacks
1. React
2. Razzle (for server-rendering)
3. Material UI (React library of components)
4. Redux Toolkit
5. Passport.js (for OAuth)

### How to
1. Create an github's OAuth app [here](https://github.com/settings/developers). With below settings
    Homepage URL: http://localhost:3000
    Authorization callback URL: http://127.0.0.1:3000/auth/github/callback
    - Copy client id and client secret and put in .env 
2. Put a random [SESSION_SECRET_KEY] in .env
3. Create a folder `/var/db` and provide permissions for saving app's sessions.
4. Run `yarn install` to install dependencies.
5. Run `yarn start` to start in dev mode.
6. For production
   - Run `yarn build`
   - Run
    ```
    NODE_ENV=production\
    GITHUB_CLIENT_ID=<your-client-id>\
    GITHUB_CLIENT_SECRET=<your-client-secret>\
    SESSION_SECRET_KEY=<your-secret-key> node build/server.js
    ```

7. You can use docker
  - Run `sudo docker build -t github-console .`
  - Run 
    ```
    sudo docker run -dp 3000:3000 -v "/var/db:/var/db"\
        -e GITHUB_CLIENT_ID=<your-client-id>\
        -e GITHUB_CLIENT_SECRET=<your-client-secret>\
        -e SESSION_SECRET_KEY=<your-secret-key> github-console\
    ```
---
## Reference
- [Github Console](https://github-console.ngolam.xyz)
