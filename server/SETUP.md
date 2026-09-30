# Class login setup (about 20 minutes, once)

Class sign-in needs three things: your **Google Sheet** (name list + records), a **Google Apps Script** (checks sign-ins, saves records), and a **Google OAuth Client ID** (shows the "Sign in with Google" button).

> 🔒 Student names and emails stay in **your private Google Sheet**. They are never put in the public website or GitHub repo.

---

## Step 1 · The Google Sheet
- Use the spreadsheet that already has your **`使用者 Users`** tab (same columns: Email · Role · Chinese Name · English Name · Class · Class No.).
- Copy its **Sheet ID** from the address bar: `docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
- The game creates two new tabs by itself: **`科學記錄 Science Records`** and **`科學進度 Science Progress`**. Your existing tabs are not touched.

## Step 2 · The Google Client ID
- If your maths game already has a Web **OAuth Client ID**, you can reuse it: open it in [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials) and add this to **Authorised JavaScript origins**:
  `https://kcchamaa-sys.github.io`
- Otherwise: **Create credentials → OAuth client ID → Web application**, add the origin above, then save.
- Copy the **Client ID** (ends with `.apps.googleusercontent.com`).

## Step 3 · The Apps Script
- Go to [script.google.com](https://script.google.com) → **New project** → name it `Mochi Science Pals server`.
- Delete the sample code and paste everything from **`server/Code.gs`**.
- **Project Settings (⚙️) → Script properties → Add**:
  | Property | Value |
  |---|---|
  | `SHEET_ID` | the Sheet ID from Step 1 |
  | `CLIENT_ID` | the Client ID from Step 2 |
  | `TEACHER_EMAILS` | *(optional)* e.g. `abc@school.edu.hk, def@school.edu.hk`. If you leave this empty, **every 教職員** in the Users tab can open the dashboard |

## Step 4 · Deploy it
- **Deploy → New deployment → ⚙️ Web app**
  - Execute as: **Me**
  - Who has access: **Anyone**
- Click **Deploy**, allow the permissions, and copy the **Web app URL** (ends with `/exec`).

## Step 5 · Connect the game
- Send me the **Client ID** and the **/exec URL**, or edit the top of `index.html` yourself:
  ```js
  window.S1_CONFIG={GOOGLE_CLIENT_ID:"…apps.googleusercontent.com",API_URL:"https://script.google.com/macros/s/…/exec"};
  ```

## Step 6 · Test
- Open the class website → **Sign in with Google** using your staff account → the **📊 Teacher** tab appears.
- Sign in once with a student test account → do one quiz → check that a row appears in `科學記錄 Science Records`.

---

### Good to know
- **Adding students later:** just add rows to `使用者 Users`. Changes apply within 5 minutes.
- **"Access blocked" for students:** your school's Google Workspace may block new apps. Ask IT to mark the Client ID as **Trusted** in Admin console → Security → API controls.
- **Updating Code.gs:** Deploy → **Manage deployments** → ✏️ → Version: **New version**. The /exec URL stays the same.
- **Guests** play without an account. Their progress stays on their own device and is not recorded.

## Updating the server later

When `Code.gs` changes (for example, the class leaderboard was added), replace ALL the code in the Apps Script editor, save, then choose **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The web app URL stays the same.
