// Hero illustration — phone mockup with floating conversation moments.
// Asset: public/illustrations/illo_header.png

import Image from "next/image";

export default function HeroIllustration({
  className,
  src = "/illustrations/illo_header.png",
  priority = true,
  ...props
}) {
  const WIDTH = 1024;
  const HEIGHT = 547;

  return (
    <Image
      src={src}
      alt="Arcilla app: a taqueria challenge with floating conversation moments"
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      className={className}
      unoptimized={src.endsWith(".svg")}
      {...props}
    />
  );
}
