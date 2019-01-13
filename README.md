# Shopify Developer Challenge 2019

## Thought Process / Design Decisions

### Database Design
* An `AUTO INCREMENT` id is used to reference each row in the products table. This creates a unique id for each product.
* `VARCHAR(255)` is used for the title of each product. It is assumed that a product title will be less than `255` characters. The title column is also unique because in a store it makes sense that every item should have a unique title / name to avoid confusion between products.
* Price is stored as `DECIMAL(7,2)`, this allows decimal values between `-99999.99` and `99999.99`. The MySQL `DECIMAL` type allows for more accurate handling of money values compared to the `FLOAT` type.
* Inventory count is stored as an `INT UNSIGNED`, this forces a value of `0` or greater for the inventory count. This works for the application because a negative inventory count doesn't make sense.

## Application Setup

## Documentation

## Testing

