# EatHere Server

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
CONNECTION_STRING=your_mongodb_connection_string_here

# API Keys
GEOAPIFY_API_KEY=your_geoapify_api_key_here
APIFY_API_KEY=your_apify_api_key_here

# Server Configuration
PORT=5000
```

### 3. API Keys Required

#### Geoapify API Key
- Sign up at: https://www.geoapify.com/
- Get your API key from the dashboard
- Used for finding nearby restaurants and food spots

#### Apify API Key
- Sign up at: https://apify.com/
- Get your API key from the dashboard
- Used for fetching restaurant reviews and ratings

### 4. Run the Server
```bash
npm run dev
```

## API Endpoint

### POST /api/v1/foodspots
Find local food spots based on location.

**Request Body:**
```json
{
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Response:**
```json
{
  "chole_bhature": [
    {
      "name": "Restaurant Name",
      "address": "Restaurant Address",
      "place_id": "place_id",
      "image": "image_url",
      "cuisine": "cuisine_type",
      "rating": 4.5,
      "review_count": 10,
      "reviews": [...],
      "category": "chole bhature",
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  ]
}
```

## Debugging

If you get the error "Something went wrong, try again later", check:

1. **Environment Variables**: Make sure both API keys are set in your `.env` file
2. **API Key Validity**: Verify your API keys are valid and have sufficient credits
3. **Network Issues**: Check if your server can reach the external APIs
4. **Console Logs**: Check the server console for detailed error messages

The improved error handling will now show more specific error messages to help identify the issue. 