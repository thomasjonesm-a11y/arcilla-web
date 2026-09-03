// Hero illustration — phone mockup with the taqueria challenge artwork.
//
// The source SVG (illo_header.svg, ~751KB) embeds a raster image as a
// luminance-masked pattern plus many filtered sub-rects. Inlining that as JSX
// would bloat the bundle and gain nothing, so it's served as a static asset.
//
// SETUP: copy the asset into your Next.js /public folder, e.g.
//   public/illustrations/illo_header.svg
// (or the lighter raster, public/illustrations/hero.webp — ~150KB, static).
//
// Using next/image is recommended for the webp; for the SVG a plain <img>
// avoids next/image's SVG caveats. Swap `src` below to whichever you ship.

import Image from "next/image";

export default function HeroIllustration({
  className,
  src = "/illustrations/illo_header.svg",
  priority = true,
  ...props
}) {
  // Native dimensions of the source SVG.
  const WIDTH = 1263;
  const HEIGHT = 670;

  return (
    <Image
      src={src}
      alt="Arcilla app: a taqueria challenge with floating conversation moments"
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      className={className}
      // SVGs need this to render via next/image; harmless for the webp too.
      unoptimized={src.endsWith(".svg")}
      {...props}
    />
  );
}
