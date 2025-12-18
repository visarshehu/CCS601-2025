# Java IX - A-Frame VR/AR Examples

Koleksion shembujsh për zhvillimin e aplikacioneve VR dhe AR duke përdorur A-Frame dhe AR.js për kursin CCS601 në SEEU.

## 📋 Përmbajtja

### VR Examples
1. **Hello World** - Koncepte bazë të A-Frame (ECS, koordinata, animacione)
2. **Interaction** - Ndërveprime gaze-based dhe event handling
3. **Import Assets** - Ngarkimi dhe menaxhimi i modeleve GLTF

### AR Examples
4. **Magic Window** - AR me marker HIRO
5. **Magic Window Locations** - AR me vendodhje GPS
6. **Magic Window Surface** - AR me gjurmim sipërfaqeje

## 🚀 Quick Start

### Development Environment

```bash
# Install dependencies
npm install

# Start development servers (nga folder root)
npm run hello-world      # Port 3000
npm run interaction       # Port 3001  
npm run import-assets     # Port 3002
npm run magic-window      # Port 3003
npm run magic-window-locations  # Port 3004
npm run magic-window-surface    # Port 3005
```

### Individual Projects

```bash
# Navigate në një projekt specifik
cd hello-world

# Start dev server për atë projekt
npx vite
```

## 📱 Kërkesa të Sistemit

### VR Examples
- **Browser:** Chrome, Firefox, Safari të fundit
- **Hardware:** Desktop, Laptop, Mobile
- **Kontrollet:** Mouse, touch, VR headset (optional)

### AR Examples  
- **Browser:** Chrome, Firefox, Safari mobile
- **HTTPS:** E detyrueshme për qasje në kamerë
- **Hardware:** Mobile device me kamerë
- **Permissions:** Camera, GPS (për location-based)

## 🛠 Teknologjitë e Përdorura

- **A-Frame 1.6.0** - Web VR framework
- **AR.js 3.4.5** - Web AR library
- **Vite 7.1.7** - Build tool dhe dev server
- **Three.js** - 3D graphics library (nën A-Frame)

## 📖 Struktura e Projektit

```
Java IX/
├── hello-world/           # VR Hello World
│   ├── index.html
│   └── vite.config.js
├── interaction/           # Gaze Interactions
│   ├── index.html  
│   └── vite.config.js
├── import-assets/         # GLTF Models
│   ├── index.html
│   ├── vite.config.js
│   ├── models/
│   └── textures/
├── magic-window/          # Marker AR
│   ├── index.html
│   ├── vite.config.js
│   └── markers/
├── magic-window-locations/  # Location AR
│   ├── index.html
│   └── vite.config.js
├── magic-window-surface/    # Surface AR
│   ├── index.html
│   └── vite.config.js
├── package.json
├── vercel.json
└── deploy.md
```

## 🎓 Objektivat Mësimore

### Hello World
- **ECS Architecture:** Entity-Component-System pattern
- **3D Coordinate System:** Right-Hand Rule
- **Scene Graph:** Hierarkia e objekteve
- **Basic Animations:** Transform animations
- **Camera Controls:** OrbitControls dhe WASD

### Interaction  
- **Gaze-based Interaction:** Eye tracking simulation
- **Cursor Components:** Fuse timeout dhe visual feedback
- **Event Handling:** Click, hover, focus events
- **Animation System:** A-Frame animation components
- **Audio Integration:** Sound effects

### Import Assets
- **GLTF Loading:** 3D model import
- **Asset Management:** Preloading dhe caching 
- **Animation Mixer:** Skeletal animations
- **Material System:** PBR materials
- **Performance:** Optimization techniques

### Magic Window (Marker AR)
- **Marker Detection:** HIRO pattern recognition
- **Camera Integration:** WebRTC camera access
- **3D Registration:** Anchoring objects to markers
- **Tracking Quality:** Stable 6DOF tracking
- **Real-time Rendering:** AR rendering pipeline

### Magic Window Locations
- **GPS Integration:** Geolocation API
- **Coordinate Systems:** Geographic coordinates
- **Compass Orientation:** Device orientation
- **Distance Calculation:** Haversine formula
- **Location Anchoring:** Geographic AR anchors

### Magic Window Surface
- **Plane Detection:** Computer vision algorithms
- **SLAM:** Simultaneous Localization and Mapping
- **6DOF Tracking:** Full positional tracking
- **Anchor Management:** Persistent anchors
- **Environmental Understanding:** Surface analysis

## 🌐 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Manual Configuration

1. **Git Repository Setup**
2. **Vercel Import** nga GitHub
3. **Environment Configuration** 
4. **Domain Setup** (optional)

Shiko `deploy.md` për udhëzime të detajuara.

## 📚 Resurse Shtesë

### Dokumentimi
- [A-Frame Documentation](https://aframe.io/docs/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [Three.js Documentation](https://threejs.org/docs/)

### Tutoriale
- [A-Frame School](https://aframe.io/aframe-school/)
- [WebXR Samples](https://immersive-web.github.io/webxr-samples/)

### Tools
- [A-Frame Inspector](https://aframe.io/docs/1.6.0/introduction/visual-inspector-and-dev-tools.html)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)
- [AR.js Marker Generator](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)

## 🔧 Troubleshooting

### Common Issues

**VR Examples:**
- **Performance Issues:** Reduce geometry complexity
- **Controls Not Working:** Check browser compatibility  
- **Assets Not Loading:** Verify CORS headers

**AR Examples:**
- **Camera Not Accessible:** Require HTTPS
- **Marker Not Detected:** Ensure proper lighting
- **GPS Not Working:** Enable location permissions
- **Tracking Unstable:** Improve environmental conditions

### Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|---------|------|
| WebXR VR | ✅ | ✅ | ⚠️ | ✅ |
| WebRTC Camera | ✅ | ✅ | ✅ | ✅ |
| Device Orientation | ✅ | ✅ | ✅ | ✅ |
| Geolocation | ✅ | ✅ | ✅ | ✅ |

## 👨‍🏫 Përdorimi në Mësim

### Demo Sequence
1. **Hello World** - Bazat e VR
2. **Interaction** - User interface në VR
3. **Import Assets** - Content creation workflow
4. **Magic Window** - Kthim në AR basics
5. **Locations** - Location-aware computing
6. **Surface** - Advanced computer vision

### Aktivitete Praktike
- Modifikoni animacionet në Hello World
- Krijoni lojë të re në Interaction
- Importoni modelet tuaja në Import Assets  
- Krijoni marker-a customizuar për AR
- Shtoni POI të reja në Location AR
- Experimentoni me surface detection

## 📄 Licenca

Ky projekt është i destinuar për qëllime edukative në SEEU. Shembujt janë bazuar në dokumentimin e A-Frame dhe AR.js.

## 🤝 Kontributi

Për të kontribuar në këtë projekt:

1. Fork repository
2. Krijo branch të ri: `git checkout -b feature/new-example`
3. Commit ndryshimet: `git commit -m 'Add new example'`
4. Push në branch: `git push origin feature/new-example`
5. Krijo Pull Request

---

**Universiteti Evropian i Evropës Juglindore (SEEU)**  
**CCS601 - Computer Graphics dhe Virtual Reality**  
**2024-2025**