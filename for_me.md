# Inventory Management System
- Products
- Quantities
- Invoices
- Notification when out of stock.

# How does that work?

- Each endpoint will work as wrapper to send/get the "whatever" data to/from the database.
- All endpoints will be mounted on the /api/ endpoint 
- The "/" endpoint will handle the static files from the "./public/" repository (front end)
    - All products page
    - A product view will only contain product name, price, and quantity

# What endpoints will i have?

- GET     /                  Static files (Front End)
- GET     /api/products"     All products that're in the db
- POST    /api/products/     Create new product                  
- DELETE  /api/products/:id  Delete product                     
- POST    /invoices          Creates a new invoice and reduce product quantities
- GET     /invoices          List invoices

# How will i implement the notification shit?

- Once a product quantity drops to 0, an event will be triggered.
- `new CustomEvent("eventName")`, `.addEventListener("eventName", someFunction)`, `.dispatchEvent("eventName")`

# What will i need ?

- Setup a mongodb connection function..
- Product & Invoice models (Mongodb related)
- controller logic for products and invoices endpoints
- define the routes for each
- 