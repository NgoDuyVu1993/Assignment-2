# Assignment-2 Storefront Backend Project
The Application is for the second Assignment of Udacity Full Stack Javascript<br/>
The database is running on port 5432<br/>
The Server Backend is running on port 3000<br/>

# What I learnt
- Design Database Schema
- Use Postgres SQL
- Use Docker Container
- Data Migration
- Encode / Decode with JWT

# Run Command
To run the command Eslint, Prettier and Jasmine to run test senarios
**Install all requirements** <br/>
- `npm i` <br/>

**Unit Tests** <br/>
- `npm run test` <br/>

**Run Build** <br/>
- `npm run build` <br/>

**Check Style by Prettier** <br/>
- `npm run prettier` <br/>

**Check code by Linter** <br/>
- `npm run lint` <br/>

# Prerequisite
## Environment Variable
The environment variable in .env file which is used for docker container
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB_DEV=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
POSTGRES_PORT=5432
BCRYPT_PASSWORD=fullstack123
SALT_ROUNDS=10
TOKEN_SECRET=thisissecret
#ENV=dev
ENV=test
```

## Setup Docket Container
The Docker container is used to host the Postgres. In the directory, there is a docker-compose file, users can run <br/>
Check docker-compose parameter: `docker-compose config` <br/>
Spin up the container: `docker-compose up` <br/>
Stop the container: `docker-compose down` <br/>

We can create Docker Image for postgres without using Docker Compose: `docker run -d -p 5432:5432 --name "ass2-postgres" -e POSTGRES_PASSWORD="full_stack_user" -e POSTGRES_PASSWORD="password123" postgres` <br/>
Start the Container `docker container start ass2-postgres` <br/>

After Start the container, we can run `docker ps` to see the container name <br/>
To run command on the container run `docker exec -it <container name> bash` <br/>
Login to postgres by `psql -U postgres` with postgres is username from .env file <br/>

## SQL Command to create on Postgres Server
Run docker command to run command on the container then
**Run Postgres env**
`su postgres` <br/>
**Run PSQL**
`psql postgres` <br/>

Run following SQL queries to setup datasets in the container <br/>

Create Users and Database  <br/>
```
CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE storefront_dev;
CREATE DATABASE storefront_test;
```
After Create Database, connect to the database to grant permission
`\c  storefront_dev` or `\c  storefront_test`

Grant Permission  <br/>
```
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;
```

To test the database run `\dt`
## Run Migration on database
Before run build <br/>
Run Migrate tables: `npm run migrate-up` <br/>
Reset database by dropping tables: `npm run migrate-down` <br/>


# Jasmine Test Result
The results of the test are all PASS <br/>
![Test Result](https://github.com/NgoDuyVu1993/Assignment-2/blob/main/img/Test%20Result.jpg)

## Database Schema and Endpoints
The following diagram is the database Schema 
[REQUIREMENTS file](https://github.com/NgoDuyVu1993/Assignment-2/blob/main/img/Store%20front%20Database%20Schema.JPG)

# Manualy use the Server
1. To start use the server, add and remove Users / Products / Orders, we must first get Token
![Get Token](https://github.com/NgoDuyVu1993/Assignment-2/blob/main/img/Create%20New%20User.jpg)

2. After obtaining token, we can use it for all API like get Users by Id
![Get Users](https://github.com/NgoDuyVu1993/Assignment-2/blob/main/img/Get%20User%20by%20Id.jpg)

3. The Token can also be used for Authenticate API
![Authenticate](https://github.com/NgoDuyVu1993/Assignment-2/blob/main/img/Authenticate%20User.jpg)

4. The APIs of Product and Order can be used similarly