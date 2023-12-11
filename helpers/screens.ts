import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config, ScreensConfig } from "tailwindcss/types/config";

import tailwindConfig from "@/tailwind.config"; // Your tailwind config
import { useEffect, useState } from "react";
//use effect for cycle handling 
const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

const breakpoints = fullConfig?.theme?.screens;

type BreakpointKey = keyof ScreensConfig;

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const [loading, setLoading] = useState(true);
  const breakpointValue = breakpoints[breakpointKey as BreakpointKey];
  const bool = useMediaQuery({
    query: `(max-width: ${breakpointValue})`,
  });
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
    ["loading"]: loading,
  } as Record<typeof breakpointKey, number> & Record<KeyAbove | KeyBelow, boolean> & { loading?: boolean };
}
