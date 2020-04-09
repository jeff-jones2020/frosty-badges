# wicked-sales
A dynamic, responsive web application for shoppers who want amazing as-advertized-on-TV items.

## Live Website
Try the application live at [https://wicked-sales.jeff-j.me](https://wicked-sales.jeff-j.me)

## Technologies Used
- React.js
- Node.js
- Express.js
- PostgreSQL 10
- Bootstrap 4
- AWS EC2
- Webpack 4

## Features
- User can play a game of memory match
- User can see number of games played
- User can see number of attempts during current round
- User can see accuracy (attempts / matches) during current round

## Preview
![Wicked Sales](wicked-sales.gif)

## Development

### System Requirements
- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher
- Express.js 4 or higher

### Getting Started
1. Clone the repository.

    ```shell
    git clone https://github.com/jeff-jones2020/wicked-sales-js.git
    cd wicked-sales-js
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create a database named 'wickedSales' in your PostgreSQL instance

4. Create an .env file including:

    ```
    PORT=port
    DEV_SERVER_PORT=port2
    DATABASE_URL=postgres://user:password@host:port/wickedSales
    SESSION_SECRET=secret
    SESSION_EXPIRY=28800000
    KEY=Bearer 9HcPGXUHzz5uL3aILr3VUEa1tJan5EDWc8KHQEsHNm-0BP5YnEgjRaH3letAt5mW7d1xkEiTYaQy1nnZ3aHXXBTpNCiATlesAI5ulAvYzdkSxSFv_iilb2Jnhr1rXnYx
    ```

5. Import the wickedSales database to PostgreSQL.

    ```shell
    npm run db:import
    ```

7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
