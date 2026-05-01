"use client";

import { useGAClickTracking } from "@/lib/useGAClickTracking";
import { useGAPageTracking } from "@/lib/useGAPageTracking";

export function AnalyticsTracker() {
  useGAPageTracking();
  useGAClickTracking();
  return null;
}
