# frosty-badges
A dynamic, responsive web application for Blizzard fans who want badges based on designs from their favorite games.

## Live Website
Try the application live at [https://frosty-badges.jeff-j.me](https://frosty-badges.jeff-j.me)

## Technologies Used
- React.js
- Node.js
- Express.js
- PostgreSQL 10
- Bootstrap 4
- AWS EC2
- Webpack 4

## Features
- User can view a list of badges for sale
- User can view details about a badge
- User can add items to cart
- User can remove items from cart
- User can change quantity of items in cart
- User can place an order

## Preview
![Frosty Badges](frosty-badges.gif)

## Development

### System Requirements
- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher
- Express.js 4 or higher

### Getting Started
1. Clone the repository.

    ```shell
    git clone https://github.com/jeff-jones2020/frosty-badges.git
    cd frosty-badges
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create a database named 'frostyBadges' in your PostgreSQL instance

4. Create an .env file including:

    ```
    PORT=port
    DEV_SERVER_PORT=port2
    DATABASE_URL=postgres://user:password@host:port/frostyBadges
    SESSION_SECRET=secret
    SESSION_EXPIRY=28800000
    KEY=Bearer 9HcPGXUHzz5uL3aILr3VUEa1tJan5EDWc8KHQEsHNm-0BP5YnEgjRaH3letAt5mW7d1xkEiTYaQy1nnZ3aHXXBTpNCiATlesAI5ulAvYzdkSxSFv_iilb2Jnhr1rXnYx
    ```

5. Import the frostyBadges database to PostgreSQL.

    ```shell
    npm run db:import
    ```

7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
