"use client";

import { useEffect, useRef } from "react";
import { RealtimeEvent, subscribeRealtime } from "../services/realtime/events";

export default function useRealtimeEvents(
  onEvent: (event: RealtimeEvent) => void,
) {
  const handler = useRef(onEvent);

  useEffect(() => {
    handler.current = onEvent;
  });

  useEffect(() => subscribeRealtime((event) => handler.current(event)), []);
}
