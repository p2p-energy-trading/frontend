export function rgbToHex(rgb) {
  // rgb = "rgb(159, 232, 141)"
  const result = rgb.match(/\d+/g);
  if (!result) return "#2563eb";
  return (
    "#" +
    result
      .slice(0, 3)
      .map((x) => (+x).toString(16).padStart(2, "0"))
      .join("")
  );
}