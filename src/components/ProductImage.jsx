import { useState } from 'react';
import SneakerArt from './SneakerArt.jsx';

// Product photo. If the file is missing, a neutral illustration shows instead of a broken image.
export default function ProductImage({ src, alt, eager = false }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return <SneakerArt />;
  return (
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
  );
}
