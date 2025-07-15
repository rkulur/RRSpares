# RRSpares Backend

Backend system for an automotive spare parts e-commerce platform.

## Features

- **RESTful API:** Modular backend with Node.js, Express, TypeScript.
- **Authentication:** JWT-based login, role-based access.
- **Inventory:** Brands, Models, Categories, and Products CRUD.
- **File Handling:** Multer + Firebase Cloud Storage, image optimization.
- **User Accounts:** Secure hashing, password reset, email verification.
- **Scalability:** Architecture ready for deployment and CI/CD.


## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **File Storage**: Firebase Cloud Storage
- **Image Processing**: Sharp
- **Email**: Nodemailer
- **Dev Tools**: Nodemon, ts-node

## API Endpoints


### Auth & User

* `POST /auth/register` – Register a new user
* `POST /auth/login` – Login
* `POST /auth/reset` – Request password reset
* `POST /auth/reset/:id` – Reset password with token
* `GET /auth/get` – Get authenticated user details
* `PUT /auth/update` – Update profile
* `GET /auth/role` – Get current user role

---

### Brands

* `POST /brand` – Create brand (**admin only**)
* `GET /brand` – List brands
* `GET /brand/:id` – Get brand by ID
* `PUT /brand/:id` – Edit brand
* `DELETE /brand/:id` – Delete brand

---

### Models

* `POST /model` – Create model (**admin only**)
* `GET /model` – List models
* `GET /model/:id` – Get model by ID
* `PUT /model/:id` – Edit model
* `DELETE /model/:id` – Delete model

---

### Parts Categories

* `POST /pcats` – Add category
* `GET /pcats` – List categories
* `PUT /pcats/:id` – Update category
* `DELETE /pcats/:id` – Delete category

---

### Products

* `POST /products` – Add product with up to 5 images
* `GET /products` – List products
* `GET /products/:id` – Get product by ID
* `PUT /products/:id` – Update product and images
* `DELETE /products/:id` – Delete product
