

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const SCOPES = "https://www.googleapis.com/auth/drive.file";

/**
 * Initialize GAPI client
 */
export async function initClient() {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
          scope: SCOPES,
        });
        gapi.auth2.getAuthInstance(); // 👈 ensure auth2 instance exists
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}


/**
 * Authenticate the user
 */
export async function authenticate() {
  const auth = gapi.auth2.getAuthInstance();
  if (!auth.isSignedIn.get()) {
    await auth.signIn();
  }
  console.log("✅ Signed in as", auth.currentUser.get().getBasicProfile().getName());
}

/**
 * List files from Google Drive
 */
export async function listFiles() {
  try {
    const res = await gapi.client.drive.files.list({
      pageSize: 50,
      fields: "files(id, name, mimeType, owners)",
    });
    return res.result.files.map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      author: file.owners?.[0]?.displayName || "Unknown",
    }));
  } catch (err) {
    console.error("❌ File listing error:", err);
    throw err;
  }
}

/**
 * Upload a file to Google Drive
 */
export async function uploadFile(file) {
  const metadata = {
    name: file.name,
    mimeType: file.type,
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name",
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + gapi.auth.getToken().access_token,
      }),
      body: form,
    }
  );

  return res.json();
}

/**
 * Delete a file from Google Drive
 */
export async function deleteFile(fileId) {
  try {
    await gapi.client.drive.files.delete({ fileId });
    console.log("🗑 File deleted:", fileId);
  } catch (err) {
    console.error("❌ Delete error:", err);
    throw err;
  }
}



