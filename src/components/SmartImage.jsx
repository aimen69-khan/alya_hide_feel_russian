import { useEffect, useRef, useState } from "react";

// Image with skeleton loading state, fallback artwork and lazy loading.
export default function SmartImage({ src, fallback, alt, className = "", eager = false }) {
  const [current, setCurrent] = useState(src || fallback);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setCurrent(src || fallback);
    setLoaded(false);
    setFailed(false);
  }, [src, fallback]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [current]);

  const handleError = () => {
    if (fallback && current !== fallback) setCurrent(fallback);
    else setFailed(true);
  };

  return (
    <div className={`smart-img ${loaded ? "is-loaded" : ""} ${className}`}>
      {!loaded && !failed && <span className="smart-img__skeleton" aria-hidden="true" />}
      {failed ? (
        <span className="smart-img__failed" role="img" aria-label={alt}>
          Image unavailable
        </span>
      ) : (
        <img
          ref={imgRef}
          src={current}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
    </div>
  );
}
