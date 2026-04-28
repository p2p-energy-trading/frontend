/**
 * Format power value with appropriate unit (W, kW, MW, GW)
 * @param {number} watts - Power value in Watts
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {object} Object with value and unit { value: number, unit: string, formatted: string }
 */
export const formatPower = (watts, decimals = 2) => {
  if (watts === null || watts === undefined || isNaN(watts)) {
    return { value: 0, unit: "W", formatted: "0 W" };
  }

  // watts = watts * 1000000000;

  const absWatts = Math.abs(watts);
  const sign = watts < 0 ? "-" : "";

  if (absWatts >= 1_000_000_000) {
    // GW (Gigawatt)
    const value = absWatts / 1_000_000_000;
    return {
      value: parseFloat(value.toFixed(decimals)),
      unit: "GW",
      formatted: `${sign}${value.toFixed(decimals)} GW`,
    };
  } else if (absWatts >= 1_000_000) {
    // MW (Megawatt)
    const value = absWatts / 1_000_000;
    return {
      value: parseFloat(value.toFixed(decimals)),
      unit: "MW",
      formatted: `${sign}${value.toFixed(decimals)} MW`,
    };
  } else if (absWatts >= 1_000) {
    // kW (Kilowatt)
    const value = absWatts / 1_000;
    return {
      value: parseFloat(value.toFixed(decimals)),
      unit: "kW",
      formatted: `${sign}${value.toFixed(decimals)} kW`,
    };
  } else {
    // W (Watt)
    return {
      value: parseFloat(absWatts.toFixed(decimals)),
      unit: "W",
      formatted: `${sign}${absWatts.toFixed(decimals)} W`,
    };
  }
};

/**
 * Format energy value with appropriate unit (Wh, kWh, MWh, GWh)
 * @param {number} wattHours - Energy value in Watt-hours
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {object} Object with value and unit { value: number, unit: string, formatted: string }
 */
export const formatEnergy = (wattHours, decimals = 2) => {
  if (wattHours === null || wattHours === undefined || isNaN(wattHours)) {
    return { value: 0, unit: "Wh", formatted: "0 Wh" };
  }

  // wattHours = wattHours * 1000000000;

  const absWattHours = Math.abs(wattHours);
  const sign = wattHours < 0 ? "-" : "";

  if (absWattHours >= 1_000_000_000) {
    // GWh (Gigawatt-hour)
    const value = absWattHours / 1_000_000_000;
    return {
      value: parseFloat(value.toFixed(decimals)),
      unit: "GWh",
      formatted: `${sign}${value.toFixed(decimals)} GWh`,
    };
  } else if (absWattHours >= 1_000_000) {
    // MWh (Megawatt-hour)
    const value = absWattHours / 1_000_000;
    return {
      value: parseFloat(value.toFixed(decimals)),
      unit: "MWh",
      formatted: `${sign}${value.toFixed(decimals)} MWh`,
    };
  } else if (absWattHours >= 1_000) {
    // kWh (Kilowatt-hour)
    const value = absWattHours / 1_000;
    return {
      value: parseFloat(value.toFixed(decimals)),
      unit: "kWh",
      formatted: `${sign}${value.toFixed(decimals)} kWh`,
    };
  } else {
    // Wh (Watt-hour)
    return {
      value: parseFloat(absWattHours.toFixed(decimals)),
      unit: "Wh",
      formatted: `${sign}${absWattHours.toFixed(decimals)} Wh`,
    };
  }
};

/**
 * Get just the formatted string for power
 * @param {number} watts - Power value in Watts
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted string like "1.5 kW"
 */
export const formatPowerString = (watts, decimals = 2) => {
  return formatPower(watts, decimals).formatted;
};

/**
 * Get just the formatted string for energy
 * @param {number} wattHours - Energy value in Watt-hours
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted string like "2.3 kWh"
 */
export const formatEnergyString = (wattHours, decimals = 2) => {
  return formatEnergy(wattHours, decimals).formatted;
};

/**
 * Format value for chart axis (shorter format without space)
 * @param {number} value - Value to format
 * @param {string} type - 'power' or 'energy'
 * @returns {string} Formatted string like "1.5kW"
 */
export const formatChartAxis = (value, type = "power") => {
  const formatter = type === "energy" ? formatEnergy : formatPower;
  const result = formatter(value, 1); // Use 1 decimal for charts
  return `${result.value}${result.unit}`;
};
