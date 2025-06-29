import { useMemo } from "react";
import { getColor } from "../../../components/charts/chartUtils";
import { rgbToHex } from "../../../helper/colors";

export function useChartColors(theme) {
  const colorPrimary = useMemo(
    () => rgbToHex(getColor("--color-primary")?.trim() || "#2563eb"),
    [theme]
  );
  const colorSecondary = useMemo(
    () => rgbToHex(getColor("--color-secondary")?.trim() || "#f43f5e"),
    [theme]
  );
  const colorAccent = useMemo(
    () => rgbToHex(getColor("--color-accent")?.trim() || "#4f46e5"),
    [theme]
  );
  const colorSuccess = useMemo(
    () => rgbToHex(getColor("--color-success")?.trim() || "#22c55e"),
    [theme]
  );
  const colorWarning = useMemo(
    () => rgbToHex(getColor("--color-warning")?.trim() || "#fbbf24"),
    [theme]
  );
  const colorError = useMemo(
    () => rgbToHex(getColor("--color-error")?.trim() || "#ef4444"),
    [theme]
  );
  const colorBaseContent = useMemo(
    () => rgbToHex(getColor("--color-base-content")?.trim() || "#f3f4f6"),
    [theme]
  );
  return {
    colorPrimary,
    colorSecondary,
    colorAccent,
    colorSuccess,
    colorWarning,
    colorError,
    colorBaseContent,
  };
}
