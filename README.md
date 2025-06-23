# Foodie

## About application

## Requirements

- have 2 or more page
- use get method to fetch data
- have protected route
- navigation
- auth flow(register,login,isLoggedIn,logout)
- use validation on forms
- caching data

aplikacija 1-2 strane
get metoda
protektovana ruta
navigacija
auth flow
create user
izlistavanje na protektovanim rutama
login
react-hook-form
yup/zod za validaciju
3dana od petka do ponedeljka

## Technologies used

- Styles: tailwindcss
- State menagment: redux + redux/toolkit
- Forms: react-hook-form + zod
- Fetching data: axios + react-query
- API: dummyjson.com
- Build tool: vite
- Packet menagment: npm

## Routes

- home page: '/',
- login page: '/login',
- register page: '/register',
- recipes page: '/recipes',
- recipe page: '/recipes/:id',
- profile page: '/profile/:id' (protected route)

## Schema

- User schema

  ```
  {
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "gender": "female",
  "image": "https://dummyjson.com/icon/emilys/128",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT accessToken (for backward compatibility) in response and cookies
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // refreshToken in response and cookies
  }

  ```

- Recipe schema

```

```
