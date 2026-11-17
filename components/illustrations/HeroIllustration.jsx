// Hero illustration — vector mockup (scales crisply at any width).
// Asset: public/illustrations/mockup-header-arcilla.svg

import Image from "next/image";

export default function HeroIllustration({
  className,
  src = "/illustrations/mockup-header-arcilla.svg",
  priority = true,
  ...props
}) {
  const WIDTH = 1407;
  const HEIGHT = 752;

  return (
    <Image
      src={src}
      alt="Arcilla app: a taqueria challenge with floating conversation moments"
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      sizes="(max-width: 1000px) 100vw, 1000px"
      className={className}
      unoptimized={src.endsWith(".svg")}
      {...props}
    />
  );
}