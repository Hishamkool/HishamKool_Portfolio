import { useMemo, useState } from "react";
import { getScreenshotUrl } from "../lib/screenshot";

type ProjectImageProps = {
  slug: string;
  live?: string;
  fallback: string;
  alt: string;
  className?: string;
};

export function ProjectImage({
  slug,
  live,
  fallback,
  alt,
  className,
}: ProjectImageProps) {
  const candidates = useMemo(() => {
    const list = [`/projects/${slug}/project_thumb.jpg`];
    if (live) list.push(getScreenshotUrl(live));
    list.push(fallback);
    return list;
  }, [slug, live, fallback]);

  const [index, setIndex] = useState(0);

  return (
    <img
      src={candidates[index]}
      alt={alt}
      loading="lazy"
      onError={() =>
        setIndex((current) => Math.min(current + 1, candidates.length - 1))
      }
      className={className}
    />
  );
}
