
## Project launch

### Installing Dependencies
```
npm install
```
### running server + frontend project in development mode

```
npm run start:dev   
```

----

## Scripts

- `npm run start` - Launch the frontend project on the webpack dev server
- `npm run start:dev` -  Launch the frontend project on the webpack dev server + backend
- `npm run start:dev:server` - Launch the backend server
- `npm run build:prod` - Build in production mode
- `npm run build:dev` - Build in development mode (not minimized)
- `npm run lint:ts` -  Check TypeScript files with linters
- `npm run lint:ts:fix` -  Fix TypeScript files with linters
- `npm run lint:scss` - Check SCSS files with style linters
- `npm run lint:scss:fix` - Fix SCSS files with style linters

----
## Authorization Data

Authorization data for the user:

```json
[
  {
    "username": "manager1",
    "password": "123"
  },
    {
    "username": "manager2",
    "password": "123"
  },
  {
    "username": "manager3",
    "password": "123"
  },
]

