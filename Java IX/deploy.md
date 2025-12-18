# Vercel Deployment Guide për Java IX A-Frame Examples

## Përgatitja e Project-it për Deployment

### 1. Inicializimi i Git Repository

```bash
cd "Java IX"
git init
git add .
git commit -m "Initial commit: A-Frame VR/AR examples"
```

### 2. Krijimi i Remote Repository

1. Shkoni në GitHub dhe krijoni një repository të ri
2. Lidhni repository lokale me remote:

```bash
git remote add origin https://github.com/[username]/aframe-vr-ar-examples.git
git branch -M main
git push -u origin main
```

## Deployment në Vercel

### Opsioni 1: Vercel Dashboard

1. **Shkoni në [vercel.com](https://vercel.com)**
2. **Klikoni "Import Project"**
3. **Importoni GitHub repository**
4. **Konfiguroni projektin:**
   - Project Name: `aframe-vr-ar-examples`
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: `npm run build` (opsionale)
   - Output Directory: `dist` (opsionale)

### Opsioni 2: Vercel CLI

```bash
# Instaloni Vercel CLI
npm i -g vercel

# Login në Vercel
vercel login

# Deploy projektin
vercel

# Per production deployment
vercel --prod
```

## Konfigurimi i Vercel.json

Projekti përfshin `vercel.json` që konfiguron:

- **Multi-page routing** për çdo shembull
- **HTTPS redirects** për AR examples
- **CORS headers** për asset loading
- **Camera/GPS permissions** për AR features

## URL Structure pas Deployment

```
https://your-domain.vercel.app/                     # Homepage
https://your-domain.vercel.app/hello-world/         # Hello World VR
https://your-domain.vercel.app/interaction/         # Interaction demo
https://your-domain.vercel.app/import-assets/       # GLTF loading
https://your-domain.vercel.app/magic-window/        # Marker-based AR
https://your-domain.vercel.app/magic-window-locations/  # Location AR
https://your-domain.vercel.app/magic-window-surface/    # Surface AR
```

## Environment Variables (nëse nevojitet)

Për features specifike, mund të nevojiten environment variables:

```bash
# Vercel CLI
vercel env add [VARIABLE_NAME]

# Ose në Vercel Dashboard > Settings > Environment Variables
```

## Domain Configuration

### Custom Domain Setup

1. **Vercel Dashboard > Domains**
2. **Add Domain**: `your-domain.com`
3. **Configure DNS** sipas udhëzimeve të Vercel

### Subdomains për çdo shembull (opsionale)

```
vr-hello.your-domain.com        -> /hello-world/
vr-interaction.your-domain.com  -> /interaction/
ar-marker.your-domain.com       -> /magic-window/
ar-location.your-domain.com     -> /magic-window-locations/
ar-surface.your-domain.com      -> /magic-window-surface/
```

## Performance Optimization

### 1. Asset Optimization

```bash
# Optimizoni modelet GLTF
npx gltf-pipeline -i model.gltf -o model-optimized.gltf

# Kompresoni teksturat
# Përdorni format WebP për imazhe
```

### 2. Vercel Configuration

```json
{
  "functions": {
    "app/**/*.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    }
  ]
}
```

## Testing dhe Debugging

### Local Testing

```bash
# Test lokal me HTTPS (i nevojshëm për AR)
npx serve -s . --ssl-cert cert.pem --ssl-key key.pem

# Ose me local tunnel
npx localtunnel --port 3000
```

### Production Testing

1. **Desktop browsers:** Të gjitha features VR
2. **Mobile browsers:** AR features (camera required)
3. **HTTPS:** E detyrueshme për AR
4. **Permissions:** Camera, GPS, Device Orientation

## Troubleshooting

### Common Issues

1. **HTTPS Required Error**
   - Solution: Vercel automatic HTTPS

2. **Camera Permission Denied**
   - Solution: User must grant permission manually

3. **AR.js Loading Errors**
   - Solution: Check CDN availability

4. **GLTF Loading Failed**
   - Solution: Verify CORS headers

### Debug Commands

```bash
# Check deployment status
vercel list

# View deployment logs
vercel logs [deployment-url]

# Check domains
vercel domains ls
```

## Production Checklist

- [ ] Git repository created and pushed
- [ ] Vercel project configured
- [ ] HTTPS enabled (automatic)
- [ ] All routes working
- [ ] AR examples require camera permission
- [ ] Location examples require GPS permission
- [ ] Performance optimized
- [ ] Error handling implemented
- [ ] Mobile responsive design
- [ ] Cross-browser testing completed

## Security Headers

Vercel.json përfshin security headers të nevojshme:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Permissions-Policy",
          "value": "camera=*, microphone=*, geolocation=*"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:"
        }
      ]
    }
  ]
}
```

## Continuous Deployment

Vercel automatic deployment kur push në main branch:

```bash
# Update dhe deploy
git add .
git commit -m "Update VR/AR examples"
git push origin main
# Auto-deploy në Vercel
```

---

**Shënim:** AR features kërkojnë pajisje të vërtetë me kamera dhe sensors. Disa features janë në simulim për qëllime demonstrimi në desktop browsers.