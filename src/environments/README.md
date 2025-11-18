# Environment Configuration

## ⚠️ Important Security Notice

The actual environment files (`environment.ts` and `environment.prod.ts`) are **NOT tracked in git** because they contain sensitive Firebase credentials.

## Files in This Directory

- ✅ `environment.template.ts` - Template for development config (committed to git)
- ✅ `environment.prod.template.ts` - Template for production config (committed to git)
- 🚫 `environment.ts` - Actual development config (NOT committed, generated from .env)
- 🚫 `environment.prod.ts` - Actual production config (NOT committed, generated from .env)

## Setup for New Developers

If you just cloned this repository and the actual environment files are missing:

### Option 1: Auto-generate from .env (Recommended)

1. Get the `.env` file from a team member (securely)
2. Place it in the project root
3. Run: `npm run config:env`

This will automatically generate both `environment.ts` and `environment.prod.ts` with the correct values.

### Option 2: Manual Setup

1. Copy the template files:
   ```bash
   copy environment.template.ts environment.ts
   copy environment.prod.template.ts environment.prod.ts
   ```

2. Edit both files and fill in your Firebase credentials

## Why This Approach?

**Security Benefits:**
- ✅ No secrets in version control
- ✅ No secrets in git history
- ✅ Each developer can use their own credentials
- ✅ Different credentials for dev/prod environments
- ✅ Template files show structure without exposing secrets

## Daily Development

Just work normally! The environment files exist locally and Angular will use them. When you run:

```bash
npm start   # Auto-generates env files from .env, then starts
npm build   # Auto-generates env files from .env, then builds
```

## What Gets Committed?

| File | Committed to Git? | Contains Secrets? |
|------|------------------|-------------------|
| `.env` | ❌ No | ✅ Yes |
| `.env.example` | ✅ Yes | ❌ No |
| `environment.ts` | ❌ No | ✅ Yes |
| `environment.prod.ts` | ❌ No | ✅ Yes |
| `environment.template.ts` | ✅ Yes | ❌ No |
| `environment.prod.template.ts` | ✅ Yes | ❌ No |

## Troubleshooting

### Build Error: Cannot find 'environment.ts'

**Solution:** Run `npm run config:env` to generate the files from your `.env` file.

### I accidentally committed environment.ts

**Solution:** 
1. Run: `git rm --cached src/environments/environment.ts`
2. Verify it's in `.gitignore`
3. Commit the removal

### Need to update Firebase config?

**Solution:** Update `.env` file, then run `npm run config:env`

## Questions?

See the main project files:
- `SECURITY_SETUP.md` - Complete security setup guide
- `SECURITY_FIX_SUMMARY.md` - Summary of security changes
- `.env.example` - List of required environment variables

