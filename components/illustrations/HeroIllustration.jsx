// Hero illustration — vector mockup (scales crisply at any width).
// Asset: public/illustrations/group-5969.svg

import Image from "next/image";

export default function HeroIllustration({
  className,
  src = "/illustrations/group-5969.svg",
  priority = true,
  ...props
}) {
  const WIDTH = 1263;
  const HEIGHT = 670;

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