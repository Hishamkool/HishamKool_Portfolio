import { useEffect, useState } from "react";
import { getScreenshotUrl } from "../lib/screenshot";

type ProjectImageProps = {
  slug: string;
  live?: string;
  appStore?: string;
  fallback: string;
  alt: string;
  className?: string;
};

type Candidate = { src: string; kind: "photo" | "icon" };

function extractAppleAppId(appStoreUrl: string): string | null {
  const match = appStoreUrl.match(/id(\d+)/);
  return match ? match[1] : null;
}

// The iTunes Lookup API is Apple's public, unauthenticated app-metadata
// endpoint — it returns the app's icon artwork for a given App Store app id.
// There is no equivalent public/unauthenticated endpoint for Play Store, so
// Android-only listings fall through to the local thumbnail or fallback.
// We use the icon rather than an in-app screenshot: a tall phone screenshot
// stretched into a wide card looks cropped and messy, while a square icon
// composes cleanly.
function useAppStoreIcon(appStoreUrl?: string) {
  const [icon, setIcon] = useState<string | null>(null);

  useEffect(() => {
    setIcon(null);
    if (!appStoreUrl) return;
    const appId = extractAppleAppId(appStoreUrl);
    if (!appId) return;

    let cancelled = false;
    fetch(`https://itunes.apple.com/lookup?id=${appId}`)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const artwork = data?.results?.[0]?.artworkUrl512;
        if (artwork) setIcon(artwork);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [appStoreUrl]);

  return icon;
}

export function ProjectImage({
  slug,
  live,
  appStore,
  fallback,
  alt,
  className,
}: ProjectImageProps) {
  const appStoreIcon = useAppStoreIcon(appStore);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  const candidates: Candidate[] = [
    {
      src: `${import.meta.env.BASE_URL}projects/${slug}/project_thumb.jpg`,
      kind: "photo",
    },
    ...(live ? [{ src: getScreenshotUrl(live), kind: "photo" as const }] : []),
    ...(appStoreIcon ? [{ src: appStoreIcon, kind: "icon" as const }] : []),
    { src: fallback, kind: "photo" },
  ];

  const current =
    candidates.find((candidate) => !failed.has(candidate.src)) ??
    candidates[candidates.length - 1];

  const markFailed = (src: string) =>
    setFailed((prev) => new Set(prev).add(src));

  if (current.kind === "icon") {
    return (
      <div className={`relative overflow-hidden bg-[var(--color-bg-soft)] ${className ?? ""}`}>
        <img
          aria-hidden="true"
          src={current.src}
          onError={() => markFailed(current.src)}
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
          <img
            src={current.src}
            alt={alt}
            onError={() => markFailed(current.src)}
            className="h-20 w-20 rounded-2xl object-cover shadow-[0_8px_24px_rgba(0,0,0,0.3)] ring-1 ring-white/50"
          />
          <p className="text-sm font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={current.src}
      alt={alt}
      loading="lazy"
      onError={() => markFailed(current.src)}
      className={className}
    />
  );
}
