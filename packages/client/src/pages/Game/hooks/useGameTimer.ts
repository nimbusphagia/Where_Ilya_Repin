import { useState } from "react";
import { useRef } from "react";

export function useGameTimer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = () => { intervalRef.current = setInterval(() => setTime(p => p + 1), 10) };
  const stop = () => { if (intervalRef.current) clearInterval(intervalRef.current) };
  return { time, start, stop };
}
