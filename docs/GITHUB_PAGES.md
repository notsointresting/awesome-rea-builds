# Publish Awesome REA Builds with GitHub Pages

No Vercel or other hosting platform is used. The repo includes a static HTML generator and an official GitHub Pages Actions workflow.

## 1. Create the GitHub repository

1. Visit <https://github.com/new?name=awesome-rea-builds> while logged in as `notsointresting`.
2. Name it **awesome-rea-builds**; choose **Public**.
3. **Do not** initialize with a README/license/gitignore, since this package already contains them.
4. Click **Create repository**.

## 2. Upload the project

Extract the ZIP, then use a terminal in the extracted `awesome-rea-builds` folder:

```bash
git init
git checkout -b main
git add .
git commit -m "feat: launch 44-case REA builds atlas"
git remote add origin https://github.com/notsointresting/awesome-rea-builds.git
git push -u origin main
```

This requires the repo to exist and Git to be authenticated to your account. Alternatively, upload the extracted files in the GitHub web interface, keeping the `.github/workflows` directory.

## 3. Enable GitHub Pages

1. Open **Settings → Pages** in the new repository.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions**; check the **Deploy GitHub Pages** workflow.
4. When it reports a successful deployment, the site should be at: <https://notsointresting.github.io/awesome-rea-builds/>.
5. Add this URL as the GitHub repository homepage and optionally pin the repository on your profile.

GitHub Pages sometimes requires a first run of Actions and an enabled Pages environment. If there is an error, inspect `.github/workflows/pages.yml` logs. Do not enable broad repository write permissions; the workflow only needs `contents: read`, `pages: write` and `id-token: write`.

## 4. Check the deployment

- Visit the site, ensure **44 catalogued cases** appear in the hero and directory.
- Test the **Official showcases** filter (5) and **REA ecosystem** (6).
- Search for `Aegis` and `Open Scrantic`.
- Open a project and copy its deep-linked URL (`?build=aegis-totp`). Refresh it to confirm the page restores the passport.
- Test mobile navigation and the comparison drawer.
- Check the two GitHub Discussion entries are tagged **Discussion listed**, not “independently verified.”

## 5. Local verification

```bash
python3 scripts/build.py
python3 -m http.server 8080 --directory dist
```

For optional browser tests, install Playwright and Chromium as documented in your environment, then run `python3 scripts/test_site.py`.