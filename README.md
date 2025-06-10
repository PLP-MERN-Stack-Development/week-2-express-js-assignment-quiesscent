# Express.js RESTful API

## 📦 Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example` and set the API key.

3. Run the server:
   ```bash
   node server.js
   ```

## 📚 API Endpoints

- `GET /api/products`: List all products with optional `category`, `page`, `limit` query
- `GET /api/products/:id`: Get product by ID
- `POST /api/products`: Create product
- `PUT /api/products/:id`: Update product
- `DELETE /api/products/:id`: Delete product
- `GET /api/products/search?name=...`: Search products by name
- `GET /api/products/stats`: Product stats by category

**Auth Header:**
All endpoints require a header:
```http
x-api-key: your_api_key
```

## 🔍 Example Response
```json
{
  "id": "uuid",
  "name": "Product",
  "description": "Details",
  "price": 100,
  "category": "Electronics",
  "inStock": true
}
```
