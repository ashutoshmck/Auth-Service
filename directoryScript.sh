#!/bin/zsh
git init
npm init -y
npm i express pg pg-hstore sequelize sequelize-cli
npm i eslint jest --save-dev
mkdir src
mkdir tests
mkdir tests/controllers
mkdir tests/services
mkdir tests/utils
touch src/app.js
echo 'node_modules' > .gitignore
git add .
git commit -m "chore: set up repository"
echo "const path = require('path');\n\nmodule.exports={\nconfig: path.join(__dirname, './database/config/config.json'),\n'migrations-path': path.join(__dirname, './database/migrations'),\n'seeders-path': path.join(__dirname, './database/seeders'),\n'models-path': path.join(__dirname, './database/models'),\n};" | cat > .sequelizerc
npx sequelize init
mkdir src/controllers
mkdir src/services
mkdir src/routes
touch src/routes/routes.js
npx eslint --init