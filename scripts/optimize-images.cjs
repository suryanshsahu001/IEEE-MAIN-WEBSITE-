const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Track stats
let totalOriginalBytes = 0;
let totalOptimizedBytes = 0;
const manifest = {};

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Convert a single image to webp, avif, and optimized fallback
async function processImage(inputPath, options = {}) {
  const relPath = path.relative(PUBLIC_DIR, inputPath).replace(/\\/g, '/');
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);

  const stat = fs.statSync(inputPath);
  totalOriginalBytes += stat.size;

  const image = sharp(inputPath);
  const meta = await image.metadata();

  // Create low-quality placeholder blur (20px width)
  const lqipBuffer = await sharp(inputPath)
    .resize(24, null, { withoutEnlargement: true })
    .toFormat('webp', { quality: 30 })
    .toBuffer();
  const lqipBase64 = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;

  manifest[relPath] = {
    width: meta.width,
    height: meta.height,
    aspectRatio: (meta.width / meta.height).toFixed(3),
    lqip: lqipBase64,
    formats: {},
    variants: {},
  };

  // Full size WebP
  const webpPath = path.join(dir, `${baseName}.webp`);
  await sharp(inputPath)
    .resize(options.maxWidth || 1400, null, { withoutEnlargement: true })
    .webp({ quality: options.quality || 82, effort: 4 })
    .toFile(webpPath);
  manifest[relPath].formats.webp = path.relative(PUBLIC_DIR, webpPath).replace(/\\/g, '/');

  // Full size AVIF
  const avifPath = path.join(dir, `${baseName}.avif`);
  await sharp(inputPath)
    .resize(options.maxWidth || 1400, null, { withoutEnlargement: true })
    .avif({ quality: options.avifQuality || 70, effort: 4 })
    .toFile(avifPath);
  manifest[relPath].formats.avif = path.relative(PUBLIC_DIR, avifPath).replace(/\\/g, '/');

  // Optimized original format (JPEG or PNG)
  if (meta.format === 'jpeg' || meta.format === 'jpg') {
    const tmpJpg = path.join(dir, `${baseName}-opt.jpg`);
    await sharp(inputPath)
      .resize(options.maxWidth || 1400, null, { withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(tmpJpg);
    fs.renameSync(tmpJpg, inputPath);
  } else if (meta.format === 'png' && !inputPath.includes('community')) {
    // If it's a PNG logo or graphic
    const tmpPng = path.join(dir, `${baseName}-opt.png`);
    await sharp(inputPath)
      .resize(options.maxWidth || 1400, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 8 })
      .toFile(tmpPng);
    fs.renameSync(tmpPng, inputPath);
  }

  // Thumbnails (approx 360px width for mobile cards & grids)
  if (options.generateThumb !== false) {
    const thumbWidth = options.thumbWidth || 380;

    const thumbWebp = path.join(dir, `${baseName}-thumb.webp`);
    await sharp(inputPath)
      .resize(thumbWidth, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(thumbWebp);

    const thumbAvif = path.join(dir, `${baseName}-thumb.avif`);
    await sharp(inputPath)
      .resize(thumbWidth, null, { withoutEnlargement: true })
      .avif({ quality: 68, effort: 4 })
      .toFile(thumbAvif);

    const thumbFallback = path.join(dir, `${baseName}-thumb${ext}`);
    const thumbPipeline = sharp(inputPath).resize(thumbWidth, null, { withoutEnlargement: true });
    if (meta.format === 'jpeg' || meta.format === 'jpg') {
      await thumbPipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(thumbFallback);
    } else {
      await thumbPipeline.png({ compressionLevel: 9 }).toFile(thumbFallback);
    }

    manifest[relPath].variants.thumb = {
      webp: path.relative(PUBLIC_DIR, thumbWebp).replace(/\\/g, '/'),
      avif: path.relative(PUBLIC_DIR, thumbAvif).replace(/\\/g, '/'),
      fallback: path.relative(PUBLIC_DIR, thumbFallback).replace(/\\/g, '/'),
    };
  }

  const finalStat = fs.statSync(webpPath);
  totalOptimizedBytes += finalStat.size;
  console.log(`✓ Optimized ${relPath} -> WebP: ${(finalStat.size / 1024).toFixed(1)} KB (orig: ${(stat.size / 1024).toFixed(1)} KB)`);
}

// Special processing for hero background (responsive breakpoints: 640w, 1024w, 1600w)
async function processHero() {
  const heroPath = path.join(PUBLIC_DIR, 'hero-bg.jpeg');
  if (!fs.existsSync(heroPath)) return;

  const stat = fs.statSync(heroPath);
  totalOriginalBytes += stat.size;
  console.log(`Processing hero background responsive variants...`);

  const sizes = [
    { suffix: 'sm', width: 640, quality: 78, avifQuality: 65 },
    { suffix: 'md', width: 1024, quality: 80, avifQuality: 68 },
    { suffix: 'lg', width: 1600, quality: 82, avifQuality: 70 },
  ];

  const variants = {};

  for (const s of sizes) {
    const webpName = `hero-bg-${s.suffix}.webp`;
    const avifName = `hero-bg-${s.suffix}.avif`;
    const jpgName = `hero-bg-${s.suffix}.jpeg`;

    await sharp(heroPath).resize(s.width, null).webp({ quality: s.quality, effort: 4 }).toFile(path.join(PUBLIC_DIR, webpName));
    await sharp(heroPath).resize(s.width, null).avif({ quality: s.avifQuality, effort: 4 }).toFile(path.join(PUBLIC_DIR, avifName));
    await sharp(heroPath).resize(s.width, null).jpeg({ quality: s.quality, mozjpeg: true }).toFile(path.join(PUBLIC_DIR, jpgName));

    variants[s.suffix] = {
      width: s.width,
      webp: `./${webpName}`,
      avif: `./${avifName}`,
      jpeg: `./${jpgName}`,
    };
  }

  // Base fallback
  await sharp(heroPath).resize(1600, null).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(PUBLIC_DIR, 'hero-bg-opt.jpeg'));
  fs.renameSync(path.join(PUBLIC_DIR, 'hero-bg-opt.jpeg'), heroPath);

  manifest['hero-bg.jpeg'] = {
    responsive: true,
    variants,
  };
  console.log(`✓ Generated responsive Hero variants (sm: 640w, md: 1024w, lg: 1600w)`);
}

// Special processing for logos (crisp retina 2x, tiny file size)
async function processLogos() {
  const logoFiles = [
    { name: 'adypu-logo.png', targetWidth: 240 },
    { name: 'ieee-stb-logo.png', targetWidth: 260 },
    { name: 'ieee-maharashtra-logo.png', targetWidth: 420 },
  ];

  for (const item of logoFiles) {
    const filePath = path.join(PUBLIC_DIR, 'logos', item.name);
    if (!fs.existsSync(filePath)) continue;

    const baseName = path.basename(item.name, path.extname(item.name));
    const origStat = fs.statSync(filePath);

    // WebP version (lossless or high-quality)
    const webpPath = path.join(PUBLIC_DIR, 'logos', `${baseName}.webp`);
    await sharp(filePath)
      .resize(item.targetWidth, null, { withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 95, effort: 6 })
      .toFile(webpPath);

    // Optimized PNG (downsized to targetWidth to replace bloated 1024px PNG)
    const tmpPng = path.join(PUBLIC_DIR, 'logos', `${baseName}-opt.png`);
    await sharp(filePath)
      .resize(item.targetWidth, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 8 })
      .toFile(tmpPng);
    fs.renameSync(tmpPng, filePath);

    const newStat = fs.statSync(filePath);
    const webpStat = fs.statSync(webpPath);

    console.log(`✓ Logo ${item.name}: PNG ${Math.round(origStat.size/1024)}KB -> ${Math.round(newStat.size/1024)}KB | WebP: ${Math.round(webpStat.size/1024)}KB`);
  }
}

// Process community member images
async function processCommunity() {
  const communityDir = path.join(PUBLIC_DIR, 'members', 'community');
  if (!fs.existsSync(communityDir)) return;

  const files = fs.readdirSync(communityDir).filter(f => /\.(png|jpe?g)$/i.test(f) && !f.includes('-thumb'));
  console.log(`Processing ${files.length} community members...`);

  for (const file of files) {
    const inputPath = path.join(communityDir, file);
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);

    // Generate 320x400 WebP and AVIF (perfect for retina 100-150px cards)
    const webpPath = path.join(communityDir, `${baseName}.webp`);
    const avifPath = path.join(communityDir, `${baseName}.avif`);

    await sharp(inputPath)
      .resize(320, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(webpPath);

    await sharp(inputPath)
      .resize(320, null, { withoutEnlargement: true })
      .avif({ quality: 68, effort: 4 })
      .toFile(avifPath);

    // Also optimize fallback image
    const tmpFallback = path.join(communityDir, `${baseName}-opt${ext}`);
    await sharp(inputPath)
      .resize(320, null, { withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(tmpFallback);
    fs.renameSync(tmpFallback, inputPath);
  }
  console.log(`✓ Optimized all community avatars to 320px WebP/AVIF`);
}

// Process gallery & report images & extraMoments
async function processGalleryAndMoments() {
  const dirs = [
    path.join(PUBLIC_DIR, 'gallery'),
    path.join(PUBLIC_DIR, 'gallery', 'icicis'),
    path.join(PUBLIC_DIR, 'gallery', 'next-gen'),
    path.join(PUBLIC_DIR, 'gallery', 'ai-health'),
    path.join(PUBLIC_DIR, 'members'),
  ];

  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    const files = fs.readdirSync(d).filter(f => {
      const full = path.join(d, f);
      return fs.statSync(full).isFile() &&
             /\.(jpe?g|png)$/i.test(f) &&
             !f.includes('-thumb') &&
             !f.includes('-opt') &&
             !f.includes('-sm') &&
             !f.includes('-md') &&
             !f.includes('-lg');
    });

    for (const f of files) {
      const full = path.join(d, f);
      // Skip hero or logos here (handled separately)
      if (f.includes('hero-bg') || d.includes('logos') || d.includes('community')) continue;
      await processImage(full, {
        maxWidth: 1280,
        thumbWidth: 380,
        quality: 80,
        avifQuality: 68,
      });
    }
  }
}

// Posters
async function processPosters() {
  const posters = [
    path.join(PUBLIC_DIR, 'gallery', 'video-1-poster.jpg'),
    path.join(PUBLIC_DIR, 'videos', 'pv-poster.jpg'),
  ];

  for (const p of posters) {
    if (fs.existsSync(p)) {
      await processImage(p, { maxWidth: 800, thumbWidth: 400 });
    }
  }
}

async function run() {
  console.log('🚀 Starting comprehensive image optimization pipeline...');
  await processHero();
  await processLogos();
  await processCommunity();
  await processGalleryAndMoments();
  await processPosters();

  // Write manifest into src/image-manifest.json
  const manifestPath = path.resolve(__dirname, '../src/image-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n🎉 Image optimization complete! Manifest saved to src/image-manifest.json`);
}

run().catch(err => {
  console.error('Fatal optimization error:', err);
  process.exit(1);
});
