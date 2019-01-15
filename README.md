# Shopify Developer Challenge 2019

## Thought Process / Design Decisions

### Framework Choice
* I decided to use `Node.js` with the `Express.js` framework to build this project.
* I have previous experience building REST APIs with `Node.js` and the `Express.js` framework which is why I chose to use them.
* The `Express.js` framework provides a lot of useful functionality and there are a near infinite amount of packages availabe through `npm` which makes this stack a prime choice for any REST API.

### Database Design
* An `AUTO INCREMENT` id is used to reference each row in the products table. This creates a unique id for each product.
* `VARCHAR(255)` is used for the title of each product. It is assumed that a product title will be less than `255` characters. The title column is also unique because in a store it makes sense that every item should have a unique title / name to avoid confusion between products.
* Price is stored as `DECIMAL(7,2)`, this allows decimal values between `-99999.99` and `99999.99`. The MySQL `DECIMAL` type allows for more accurate handling of money values compared to the `FLOAT` type.
* Inventory count is stored as an `INT UNSIGNED`, this forces a value of `0` or greater for the inventory count. This works for the application because a negative inventory count doesn't make sense.

### Database Connection
* A pool of database connections are used in the `database.js` file.
* Instead of opening and closing individual connections we use a pool of connections so that connections can be reused by other requests.
* By using a pool of connections we reduce the impact of the overhead of creating and closing individual connections each time we get a request to our API.

### Route Design
* There are 3 main functions that the API needed, getting all products, getting a specific product and purchasing a product. This implied that 3 separate routes would be necessary. The routes created are breifly explaind below.

#### Get all products
* `/product/all?available=true`
* A `GET` request is used to get all the products.
* An optional url query can be used to get products that are available to be purchased.
* By using a url query were are able to use the same route to get all products and to get all available products.

#### Get a specific product
* `/product/{id}`
* A `GET` request is used to get a specific product.
* In the database we assigned a unique `id` to each product, that `id` is what will be used to identify the product in the url.

#### Purchase a specific product
* `/purchase`
* A `POST` request is used to purchase a specific product.
* A `POST` request makes the most sense here because we are notifying the server of an action.
* In the body of the POST request a `JSON` should be provided in the following format `{id: '5'}`, where the `id` is the unique `id` from the database.

### Security
* As a basic form of security an API Key is used.
* In the header of each request there must be an API key provided under `X-API-KEY`, this key will be validated against the key stored in the `.env` file on the server.
* If no key is provided or thek key provided is invalid the API immediately returns a `401` response.
* The security measure is implemented as global middlewear that is applied to every request.

### Testing Framework
* The testing framework used is `Mocha.js`, it provides a simple and easy to use setting for creating and running tests.
* The `Chai.js` library is also used for assertions and to send `HTTP` requests to the API.
* Combined the two packages allow for tests to be created quickly and for them to be easily run to verify the functionality of the API.

## Application Setup

1. Clone the project from the GitHub repository.
2. Run `npm install`.
3. Run the `database.sql` file in `MySQL` to create the database and insert some data.
4. Fill in the variables in the `.env` file located in the root directory.
5. Run `npm start`.
6. Make requests to `localhost:3000`.
7. Have fun!

## Documentation

## Testing

1. Run through the `Application Setup` above.
2. Run the `test_database.sql` file in `MySQL` to create the database for testing.
3. Change the `DB` variable in the `.env` file to `test_store`.
4. Run `npm test`. *(Make sure the dev dependencies are installed and the server is running)*
5. Be sure to "remake" the test database between test runs by doing step `#2` again.

