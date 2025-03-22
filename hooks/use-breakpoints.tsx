import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;
const LARGE_SCREEN_BREAKPOINT = 1440;
const LARGE_PLUS_SCREEN_BREAKPOINT = 1600;
const EXTRA_LARGE_SCREEN_BREAKPOINT = 1920;
const ULTRA_WIDE_SCREEN_BREAKPOINT = 2560;
const FOUR_K_SCREEN_BREAKPOINT = 3840;

export const useBreakpoints = () => {
  const [isAtMostMobile, setIsAtMostMobile] = useState(false);
  const [isAtMostTablet, setIsAtMostTablet] = useState(false);
  const [isAtMostDesktop, setIsAtMostDesktop] = useState(false);
  const [isAtLeastTablet, setIsAtLeastTablet] = useState(false);
  const [isAtLeastDesktop, setIsAtLeastDesktop] = useState(false);
  const [isAtLeastLargeScreen, setIsAtLeastLargeScreen] = useState(false);
  const [isAtLeastLargePlusScreen, setIsAtLeastLargePlusScreen] = useState(false);
  const [isAtLeastExtraLargeScreen, setIsAtLeastExtraLargeScreen] =
    useState(false);
  const [isAtLeastUltraWideScreen, setIsAtLeastUltraWideScreen] =
    useState(false);
  const [isAtLeastFourKScreen, setIsAtLeastFourKScreen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;

      setIsAtMostMobile(width <= MOBILE_BREAKPOINT);
      setIsAtMostTablet(width <= TABLET_BREAKPOINT);
      setIsAtMostDesktop(width <= DESKTOP_BREAKPOINT);
      setIsAtLeastTablet(width >= TABLET_BREAKPOINT);
      setIsAtLeastDesktop(width >= DESKTOP_BREAKPOINT);
      setIsAtLeastLargeScreen(width >= LARGE_SCREEN_BREAKPOINT);
      setIsAtLeastLargePlusScreen(width >= LARGE_PLUS_SCREEN_BREAKPOINT);
      setIsAtLeastExtraLargeScreen(width >= EXTRA_LARGE_SCREEN_BREAKPOINT);
      setIsAtLeastUltraWideScreen(width >= ULTRA_WIDE_SCREEN_BREAKPOINT);
      setIsAtLeastFourKScreen(width >= FOUR_K_SCREEN_BREAKPOINT);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  // "AtMost" → até aquele tamanho (inclusive)
  // "AtLeast" → a partir daquele tamanho (inclusive)

  return {
    isAtMostMobile,
    isAtMostTablet,
    isAtMostDesktop,
    isAtLeastTablet,
    isAtLeastDesktop,
    isAtLeastLargeScreen,
    isAtLeastLargePlusScreen,
    isAtLeastExtraLargeScreen,
    isAtLeastUltraWideScreen,
    isAtLeastFourKScreen,
  };
};
