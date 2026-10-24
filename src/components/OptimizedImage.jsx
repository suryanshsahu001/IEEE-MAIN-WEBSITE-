import React, { useState } from 'react';
import manifest from '../image-manifest.json';

/**
 * High-performance responsive image component
 * - Modern AVIF & WebP format support with fallback
 * - Responsive srcset & thumbnails
 * - Native lazy loading & async decoding
 * - Progressive blur / smooth fade-in
 * - Zero Cumulative Layout Shift (CLS)
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  style = {},
  priority = false,
  useThumb = false,
  sizes = '100vw',
  onClick,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!src) return null;

  // Clean relative path prefix: "./gallery/abc.jpg" -> "gallery/abc.jpg"
  const cleanKey = src.replace(/^\.\//, '');
  const manifestData = manifest[cleanKey];

  // Derive file paths
  const lastDot = src.lastIndexOf('.');
  const basePath = lastDot !== -1 ? src.substring(0, lastDot) : src;
  const ext = lastDot !== -1 ? src.substring(lastDot) : '';

  // Determine AVIF, WebP and Fallback paths
  let avifSrc = `${basePath}.avif`;
  let webpSrc = `${basePath}.webp`;
  let fallbackSrc = src;

  if (useThumb) {
    // If thumbnail requested
    if (manifestData?.variants?.thumb) {
      avifSrc = `./${manifestData.variants.thumb.avif}`;
      webpSrc = `./${manifestData.variants.thumb.webp}`;
      fallbackSrc = `./${manifestData.variants.thumb.fallback}`;
    } else {
      avifSrc = `${basePath}-thumb.avif`;
      webpSrc = `${basePath}-thumb.webp`;
      fallbackSrc = `${basePath}-thumb${ext}`;
    }
  } else if (manifestData?.formats) {
    if (manifestData.formats.avif) avifSrc = `./${manifestData.formats.avif}`;
    if (manifestData.formats.webp) webpSrc = `./${manifestData.formats.webp}`;
  }

  const lqip = manifestData?.lqip;

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName || 'w-full h-full'}`}
      style={{
        backgroundColor: '#f4f4f5',
        backgroundImage: lqip && !isLoaded ? `url(${lqip})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={onClick}
    >
      <picture className="w-full h-full block">
        {/* Modern AVIF format (ultra-fast, next-gen compression) */}
        <source type="image/avif" srcSet={avifSrc} sizes={sizes} />
        {/* Modern WebP format (universal modern browser & mobile support) */}
        <source type="image/webp" srcSet={webpSrc} sizes={sizes} />
        {/* Optimized fallback format (JPEG / PNG) */}
        <img
          src={fallbackSrc}
          alt={alt}
          width={manifestData?.width}
          height={manifestData?.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          style={style}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            // If thumb fails, try original src
            if (e.target.src !== src) {
              e.target.src = src;
            } else {
              setHasError(true);
            }
          }}
          {...rest}
        />
      </picture>

      {/* Shimmer loading placeholder if not yet loaded */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
