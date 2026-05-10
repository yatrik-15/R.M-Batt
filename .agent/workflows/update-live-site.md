---
description: How to update the live website after making code changes
---

# Updating Your Live Website

Follow these steps every time you make changes to your code and want to deploy them to cPanel.

## Step 1: Make Code Changes

Edit any files in your project as needed:
- Components in `src/components/`
- Styles in `src/index.css`
- Configuration files, etc.

**Example:** Changing text, colors, adding new sections, etc.

---

## Step 2: Test Locally (Optional but Recommended)

```bash
npm run dev
```

- Open http://localhost:5173
- Check that your changes look good
- Press Ctrl+C to stop the dev server when done

---

## Step 3: Build Production Version

**IMPORTANT: You must rebuild every time you make changes!**

```bash
npm run build
```

This creates optimized files in the `dist` folder with your latest changes.

**What this does:**
- Compiles TypeScript to JavaScript
- Bundles and minifies your code
- Optimizes images and assets
- Creates the files ready for cPanel

---

## Step 4: Upload to cPanel

### Method A: Upload Individual Changed Files (Faster)

If you only changed a few files:

1. **Log into cPanel File Manager**
2. **Navigate to your website folder** (e.g., `public_html`)
3. **Upload only the changed files:**
   - If you changed code: Delete old `assets` folder, upload new one
   - If you changed `index.html`: Upload new `index.html`
   - **Always upload the new `assets` folder** (code changes are in there)

### Method B: Full Re-Upload (Safest)

For most updates, this is easiest:

1. **Log into cPanel File Manager**
2. **Go to your website folder** (e.g., `public_html`)
3. **Delete these:**
   - Old `assets` folder
   - `index.html` (if structure changed)
4. **Upload from `dist` folder:**
   - New `assets` folder
   - New `index.html` (if updated)
5. **Keep:** 
   - `.htaccess` (don't delete this unless you changed it)

**Quick Upload from:**
```
C:\Users\Yatrik\Desktop\R.M Batt\rm-batt\dist\
```

---

## Step 5: Clear Cache & Test

1. **Clear browser cache:**
   - Press `Ctrl + Shift + R` (Windows)
   - Or `Cmd + Shift + R` (Mac)

2. **Visit your website:**
   - https://rmbatt.in/

3. **Verify changes:**
   - Check that your updates are visible
   - Test functionality
   - Check browser console (F12) for errors

---

## Quick Reference Commands

```bash
# For development/testing
npm run dev

# Build for production (do this EVERY TIME before uploading)
npm run build

# Preview production build locally (optional)
npm run preview
```

---

## Important Notes

> [!IMPORTANT]
> **Always rebuild before uploading!**
> 
> Changes to files in `src/` won't affect your live site until you:
> 1. Run `npm run build`
> 2. Upload the new `dist` folder contents

> [!TIP]
> **The `assets` folder changes every build**
> 
> The filenames include a hash (e.g., `index-B7rpVgp4.js` becomes `index-XYZ123.js`)
> This ensures browsers load the latest version. Always upload the new `assets` folder!

> [!WARNING]
> **Don't edit files in the `dist` folder directly!**
> 
> The `dist` folder is auto-generated. Make changes in `src/` then rebuild.

---

## Troubleshooting

### "I don't see my changes on the live site"

1. Did you run `npm run build`? (Required!)
2. Did you upload the new `assets` folder?
3. Did you clear browser cache? (Ctrl+Shift+R)
4. Try opening in incognito/private mode

### "Website broke after update"

1. Check browser console (F12) for errors
2. Verify all files uploaded successfully
3. Make sure `assets` folder has all 4 files
4. Check that `.htaccess` is still there

### "Old version still showing"

1. Browser cache - clear it aggressively
2. Wait 1-2 minutes (server cache)
3. Check the actual uploaded files in cPanel
4. Verify asset filenames in `index.html` match `assets` folder

---

## Pro Tips

1. **Test locally first** with `npm run dev` before deploying
2. **Keep backups** of working versions
3. **Note what you changed** in each update
4. **Upload during low-traffic times** when possible
5. **Check mobile** after deploying changes

---

## Example: Your Current Change

You just changed "Est. 2010" to "Est. 1910" in Hero.tsx:

1. ✅ Made the change
2. ⏳ Run `npm run build`
3. ⏳ Upload new `assets` folder to cPanel
4. ⏳ Clear cache and test

That's it! Your change will be live. 🚀
