"use client";

import { useEffect } from "react";
import { setBearerToken } from "@/providers";

export const SetTokenClientSide = () => {
  useEffect(() => {
    setBearerToken();
  }, []);

  return null;
};
