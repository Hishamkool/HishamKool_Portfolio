export function getScreenshotUrl(liveUrl: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(liveUrl)}?w=900&h=600`;
}
