import { motion } from "framer-motion";
import useVideoPlayback from "../hooks/useVideoPlayback";
import tbaPoster from "../assets/services/auto-hood-branding.webp";

export default function RelaxingHero({ eyebrow, title, video }) {
  const videoRef = useVideoPlayback();

  return (
    <section className="page-film-hero">
      <img className="page-film-poster" src={tbaPoster} alt="" aria-hidden="true" width="1600" height="1000" decoding="async" fetchPriority="high" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        poster={tbaPoster}
        aria-hidden="true"
        onLoadedData={(event) => event.currentTarget.classList.add("video-ready")}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="page-film-veil" />
      <div className="page-film-orb" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="page-film-eyebrow">
          {eyebrow}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
