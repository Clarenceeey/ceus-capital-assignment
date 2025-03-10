# Ceus Capital Assignment

This is a full-stack Next.js application with a form submission feature that integrates with a PostgreSQL database via Prisma. The form collects business information, address details, service offerings, and operating hours and stores them in the database.

## 🚀 Getting Started

### 1. Install Dependencies

Ensure you have **Node.js** and **pnpm** installed on your system. Then, clone the repository and install dependencies:

```sh
git clone https://github.com/Clarenceeey/ceus-capital-assignment.git
cd ceus-capital-assignment
pnpm install
```

### 2. Set up environment variables

Create a .env file in the root directory and add the following:

- DATABASE_URL=your_database_connection_string
- NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN=your_facebook_api_token

### 3. Run the project

For development, run

```sh
pnpm run dev
```

To set up the database, run this for migrations

```sh
pnpm db:migrate
```

To push changes to the db, run

```sh
pnpm db:push
```

To access the db via prisma studio, run

```sh
pnpm db:studio
```

And to reset the db, run

```sh
pnpm prisma migrate reset
```

### 4. API Integration and Testing

The form submission sends data to

```sh
POST /api/form
```

Steps to Test API

1. Submit the Form via UI

   - Fill out the form in the web application and click submit.

2. Test with cURL You can use curl to send a test request:

```sh
curl -X POST http://localhost:3000/api/form -H "Content-Type: application/json" -d '{ "businessName": "Sample Business", "contactEmail": "test@example.com", ... }'
```

Then, you can check the db entries using prisma studio

```sh
pnpm db:studio
```

📌 Assumptions & Extra Features
✅ Assumptions

- The project assumes all businesses are in Singapore (SG as country code).
- The postal code follows Singapore’s 6-digit format.
- Facebook Page ID is retrieved via the Facebook Graph API.

🌟 Extra Features Added:
✔ Dynamic Form Pagination with Steps
✔ Dropdown Select for Tags & Pricing
✔ Server-side Validation with Zod
✔ Geolocation Handling (Using Longitude & Latitude)
✔ Multiple Service Offerings Per Business
✔ Business Hours Selection with Time Slots
✔ Fully Type-Safe API Handling with Prisma & Zod
