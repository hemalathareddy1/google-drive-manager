# Google Drive Dashboard - Fixed Version

Changes made:
- Updated Drive API request to include `thumbnailLink` and `webViewLink`.
- FileGrid now uses `thumbnail` when available and falls back to an image export URL for images.
- File cards are clickable and open in a new tab in Drive.
- App has loading & error states.
- Cleaned up components and ensured CSS imports are present.

How to run:
1. Copy this project to your local machine.
2. Add your credentials in `.env` (Vite env format) as:
   VITE_GOOGLE_CLIENT_ID=your_client_id
   VITE_GOOGLE_API_KEY=your_api_key
3. Install and run:
   npm install
   npm run dev

Notes:
- Thumbnails and direct image URLs require that the files are accessible to the authenticated user.
- If thumbnails are missing, Drive may not provide them for certain file types or permission settings.
