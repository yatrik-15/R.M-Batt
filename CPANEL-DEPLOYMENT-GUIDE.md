# 🚀 Complete cPanel Deployment Guide for RM BATT Website

This guide will walk you through deploying your RM BATT website to cPanel step-by-step. No technical experience required!

---

## 📋 What You'll Need

- ✅ cPanel login credentials (provided by your hosting company)
- ✅ Your domain name (e.g., example.com)
- ✅ The `dist` folder from your project (already built and ready!)

---

## 🎯 Deployment Options

Choose ONE of the following based on where you want your website to appear:

### Option A: Deploy to Main Domain (Recommended)
**Result:** `https://yourdomain.com`
- Upload files to: `public_html` folder
- This is what most people do

### Option B: Deploy to Subdirectory
**Result:** `https://yourdomain.com/rmbatt`
- Upload files to: `public_html/rmbatt` folder
- Good if you have other content on your main domain

### Option C: Deploy to Subdomain
**Result:** `https://rmbatt.yourdomain.com`
- First create subdomain in cPanel, then upload files
- Good for keeping the website separate

> [!TIP]
> **For beginners, choose Option A** - it's the simplest!

---

## 📂 Step 1: Locate Your Built Website Files

On your computer, navigate to:
```
C:\Users\Yatrik\Desktop\R.M Batt\rm-batt\dist
```

This folder contains everything your website needs:
- `index.html` - Your main page
- `.htaccess` - Configuration file
- `assets/` folder - All images, CSS, JavaScript

> [!IMPORTANT]
> You will upload **EVERYTHING** inside the `dist` folder, not the `dist` folder itself!

---

## 🌐 Step 2: Log into cPanel

1. Open your web browser
2. Go to your cPanel URL (usually one of these):
   - `https://yourdomain.com/cpanel`
   - `https://yourdomain.com:2083`
   - Or check the email from your hosting provider
3. Enter your cPanel username and password
4. Click **Log in**

---

## 📁 Step 3: Upload Files Using File Manager

### 3.1 Open File Manager

1. Once logged into cPanel, scroll down to the **FILES** section
2. Click on **File Manager**
3. A new tab will open showing your server files

### 3.2 Navigate to the Correct Folder

**For Option A (Main Domain):**
- Click on `public_html` folder on the left sidebar
- This should show you the contents (might be empty or have some files)

**For Option B (Subdirectory):**
- Click on `public_html` folder
- Click **+ New Folder** at the top
- Name it `rmbatt` (or your preferred name)
- Double-click to enter this new folder

**For Option C (Subdomain):**
- First, go back to cPanel main page
- Find **Domains** section → Click **Subdomains**
- Create subdomain (e.g., `rmbatt`)
- Note the document root (e.g., `public_html/rmbatt`)
- Return to File Manager and navigate to that folder

### 3.3 Clear Existing Files (if needed)

> [!CAUTION]
> **Only do this if you're replacing an old website!**
**How to backup your old website first:**
1. Select all files and folders currently in the folder
2. Click **Compress** in the top menu
3. Select **Zip Archive** and click **Compress File(s)**
4. Select the newly created ZIP file and click **Download** to save it to your computer


If you see old files in the folder:
1. Select all files (click checkbox at the top)
2. Click **Delete** button
3. Confirm deletion

### 3.4 Upload Your Website Files

1. Click the **Upload** button at the top
2. A new page will open
3. Click **Select File** or drag-and-drop

**IMPORTANT: Upload ALL files from inside the `dist` folder:**

**Method 1: Upload Multiple Files** (Easier)
- Hold `Ctrl` key (or `Cmd` on Mac)
- Click to select all files inside `dist`:
  - `index.html`
  - `.htaccess`
  - The `assets` folder
- Click **Open**
- Wait for upload to complete (green progress bar)

**Method 2: Create a ZIP first** (Faster for slow internet)
- On your computer, go to the `dist` folder
- Select everything inside it
- Right-click → **Send to** → **Compressed (zipped) folder**
- Name it `website.zip`
- Upload this single ZIP file to cPanel
- After upload, go back to File Manager
- Right-click on `website.zip` → **Extract**
- Choose to extract to current directory
- Delete `website.zip` after extraction

### 3.5 Verify Upload

After uploading, you should see in File Manager:
```
public_html/
  ├── .htaccess
  ├── index.html
  └── assets/
      ├── index-[hash].js
      ├── index-[hash].css
      ├── three-vendor-[hash].js
      └── vendor-[hash].js
```

> [!NOTE]
> The `[hash]` part will be random letters/numbers - this is normal!

---

## 🔒 Step 4: Set Up HTTPS (SSL Certificate)

**HTTPS makes your website secure and trusted by browsers.**
### 4.0 Using Pre-existing SSL Files
If you already have an `ssl` folder with your certificates:
1. Go to **SECURITY** → **SSL/TLS**
2. Click **Manage SSL sites**
3. Select your domain from the dropdown
4. Click **Autofill by Domain** (cPanel will attempt to pull the files from your folder)
5. Click **Install Certificate**
### 4.1 Manual Installation from `ssl` Folder (cPanel v108)
If you cannot find "SSL/TLS Status" and have a folder named `ssl` with your credentials:

1. In **File Manager**, navigate to your `ssl` folder.
2. Identify your files:
   - `yourdomain.crt` (Certificate)
   - `yourdomain.key` (Private Key)
   - `yourdomain.ca-bundle` (CA Bundle)
3. Go to cPanel → **SECURITY** → **SSL/TLS**.
4. Click **Manage SSL sites**.
5. Select your domain from the dropdown.
6. Open each file in File Manager (Right-click → **View** or **Edit**), copy the text (including `-----BEGIN...` and `-----END...`), and paste them into the corresponding boxes in cPanel.
7. Click **Install Certificate**.


### 4.1 Check if You Have SSL

1. Go back to cPanel main page
2. Find **SECURITY** section
3. Click **SSL/TLS Status**
4. Look for your domain

### 4.2 Install Free SSL Certificate

If you don't have SSL:

1. In cPanel, go to **SECURITY** → **SSL/TLS**
2. Look for **Let's Encrypt SSL** or **AutoSSL**
3. Click **Issue** or **Install** next to your domain
4. Wait 1-2 minutes for installation

OR:

1. Go to **SECURITY** → **Let's Encrypt SSL**
2. Check your domain
3. Click **Issue**

> [!TIP]
> Most modern cPanel accounts install SSL automatically. If you can't find it, contact your hosting support - they'll help!

### 4.3 Enable HTTPS Redirect

After SSL is installed, force all traffic to use HTTPS:

1. Go to File Manager → `public_html`
2. Find `.htaccess` file
3. Right-click → **Edit**
4. Find these lines near the top:
   ```apache
   # Redirect HTTP to HTTPS (uncomment if you have SSL certificate)
   # RewriteCond %{HTTPS} off
   # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
5. **Remove the `#` symbols** to uncomment:
   ```apache
   # Redirect HTTP to HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
6. Click **Save Changes**

---

## ✅ Step 5: Test Your Website

### 5.1 Visit Your Website

Open a new browser tab and go to:
- **Option A:** `https://yourdomain.com`
- **Option B:** `https://yourdomain.com/rmbatt`
- **Option C:** `https://rmbatt.yourdomain.com`

### 5.2 What to Check

✅ **Home page loads** - You should see your RM BATT website
✅ **Navigation works** - Click menu items
✅ **Images display** - All photos and graphics load
✅ **Animations play** - Scroll to see animations
✅ **Styling is correct** - Colors, fonts, layout look good
✅ **No errors** - Press `F12` → Check Console tab (should be clean)

### 5.3 Test on Mobile

1. Open your website on your phone
2. Check that it looks good and works smoothly
3. Test all sections by scrolling

---

## 🐛 Troubleshooting Common Issues

### Issue: "404 Not Found" or Blank Page

**Solution:**
1. Go to File Manager
2. Check that `index.html` is in the correct folder
3. Verify all files uploaded successfully
4. Check file permissions: Right-click `index.html` → **Permissions** → Should be `644`

### Issue: Page Looks Broken or Unstyled

**Solution:**
1. Press `F12` in your browser
2. Check **Console** tab for errors
3. Look for 404 errors on CSS/JS files
4. Make sure the `assets` folder uploaded completely
5. Verify `.htaccess` file is present

### Issue: "Only Text, No Styling"

**Solution:**
This usually means CSS files didn't load:
1. Right-click on the page → **View Page Source**
2. Look for `<link>` tags - click them
3. If they show 404, the paths are wrong
4. Re-upload the `assets` folder

### Issue: Navigation Links Don't Work

**Solution:**
1. Make sure `.htaccess` file is in the same folder as `index.html`
2. Check that `.htaccess` uploaded (it's hidden, click **Settings** in File Manager → Show hidden files)
3. Ensure your hosting has `mod_rewrite` enabled (ask support)

### Issue: Website Shows Old Content

**Solution:**
1. Hard refresh: Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Try in incognito/private mode

### Issue: HTTPS Not Working

**Solution:**
1. Make sure SSL certificate is installed (Step 4)
2. Wait 5-10 minutes after SSL installation
3. Clear browser cache and try again
4. Contact hosting support if still not working

---

## 🎨 Optional: Customize for Subdirectory Deployment

If you chose **Option B** (subdirectory), you need to update one file:

### Update vite.config.ts (Before Building Again)

1. Open: `C:\Users\Yatrik\Desktop\R.M Batt\rm-batt\vite.config.ts`
2. Find this line:
   ```typescript
   base: '/',
   ```
3. Change it to:
   ```typescript
   base: '/rmbatt/',  // Use your subdirectory name
   ```
4. Save the file
5. Run `npm run build` again
6. Re-upload the `dist` folder to cPanel

---

## 📊 Performance Tips

### Enable Compression (Already Done!)

The `.htaccess` file already includes GZIP compression to make your site load faster!

### Check Website Speed

Visit these sites to test performance:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### Optimize Further (Optional)

If your site is slow:
1. Compress images before uploading
2. Enable cPanel caching features
3. Use a CDN like Cloudflare (free)

---

## 🔄 How to Update Your Website Later

When you make changes to your website:

1. Make changes to your code locally
2. Run `npm run build` to create new `dist` folder
3. Log into cPanel File Manager
4. Navigate to your website folder
5. **Delete old `assets` folder**
6. Upload new files from `dist` folder
7. **Keep `.htaccess`** (unless you changed it)
8. Test the website

---

## 📞 Need Help?

If you get stuck:

1. **Check your hosting provider's documentation** - Most have cPanel guides
2. **Contact hosting support** - They can help with cPanel-specific issues
3. **Common support topics:**
   - SSL installation
   - mod_rewrite enabling
   - File permissions
   - Domain configuration

---

## ✨ Congratulations!

Your RM BATT website is now live on cPanel! 🎉

**Quick Reference:**
- Website files location: `public_html/` (or your chosen folder)
- Update files: File Manager → Upload
- Check errors: Browser F12 → Console tab
- Force HTTPS: Edit `.htaccess` to uncomment redirect

---

## 📝 Quick Checklist

Before considering deployment complete:

- [ ] All files uploaded successfully
- [ ] Website loads at your domain
- [ ] Navigation works (all pages/sections accessible)
- [ ] Images and assets load correctly
- [ ] Animations and effects work
- [ ] Mobile responsive (test on phone)
- [ ] HTTPS/SSL working (🔒 lock icon in browser)
- [ ] No console errors (F12)
- [ ] Contact form handled (if applicable)

**Note about Contact Form:**
Since we deployed frontend-only, your contact form won't submit data yet. Let me know if you want to set up a free contact form service!
