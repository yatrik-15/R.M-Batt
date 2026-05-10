# R.M BATT Backend Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- Supabase account
- Cloudinary account
- Email account (Gmail recommended)

## Step 1: Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your environment variables in `.env`:

### Supabase Setup
- Go to [Supabase](https://app.supabase.com/)
- Create a new project
- Go to Settings → API
- Copy `Project URL` → paste as `SUPABASE_URL`
- Copy `anon public` key → paste as `SUPABASE_ANON_KEY`

### Cloudinary Setup
- Go to [Cloudinary](https://cloudinary.com/)
- Sign up/Login
- From Dashboard, copy:
  - Cloud Name → `CLOUDINARY_CLOUD_NAME`
  - API Key → `CLOUDINARY_API_KEY`
  - API Secret → `CLOUDINARY_API_SECRET`

### Email Setup (Gmail)
- Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
- Generate an App Password
- Use your Gmail as `EMAIL_USER`
- Use the generated password as `EMAIL_PASS`

## Step 2: Database Setup

1. Go to your Supabase project
2. Click on "SQL Editor"
3. Copy the contents of `database/schema.sql`
4. Paste and run in SQL Editor
5. Verify tables are created in "Table Editor"

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Step 5: Test the API

Visit `http://localhost:5000` in your browser. You should see:
```json
{
  "success": true,
  "message": "Welcome to R.M BATT Signage API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Contact Form
- `POST /api/contact` - Submit contact form

### Quote Requests
- `POST /api/quotes` - Submit quote request

### Image Upload
- `POST /api/upload/single` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

## Testing with Postman/Thunder Client

### Test Contact Form
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "message": "I need a signboard for my shop"
}
```

### Test Image Upload
```
POST http://localhost:5000/api/upload/single
Content-Type: multipart/form-data

Key: image
Value: [Select an image file]
```

## Troubleshooting

### Email not sending
- Check Gmail App Password is correct
- Enable "Less secure app access" if using regular password
- Check spam folder

### Supabase connection error
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check if Supabase project is active

### Cloudinary upload error
- Verify all three Cloudinary credentials
- Check if `uploads/` folder exists in server directory

## Next Steps

1. Connect frontend to backend API
2. Add authentication for admin routes
3. Deploy to production (Vercel, Railway, etc.)
