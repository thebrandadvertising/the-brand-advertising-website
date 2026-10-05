import { useEffect, useRef } from "react";

export default function useVideoPlayback() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let visible = true;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const syncPlayback = () => {
      if (document.hidden || !visible || motionPreference.matches || connection?.saveData) {
        video.pause();
        return;
      }
      video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    motionPreference.addEventListener("change", syncPlayback);
    connection?.addEventListener?.("change", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motionPreference.removeEventListener("change", syncPlayback);
      connection?.removeEventListener?.("change", syncPlayback);
    };
  }, []);

  return videoRef;
}
