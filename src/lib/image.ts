const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";

export function getImageUrl(path: string, size: "w500" | "original" | "w200" | "w185" = "w500") {
  if (!path) return "/no-image.png"; // fallback image if missing
  return `${BASE_IMAGE_URL}/${size}${path}`;
}
