import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import studioGangaLogo from "../../assets3/studio-ganga-logo-transparent.png";
import { projects } from "../data/projects.js";

function fitImageInside(image, container) {
  const maximumWidth = Math.min(
    container.width,
    window.innerWidth <= 820
      ? window.innerWidth * 0.86
      : Math.min(window.innerWidth * 0.58, 980)
  );
  const maximumHeight = Math.min(
    container.height,
    window.innerHeight * (window.innerWidth <= 820 ? 0.66 : 0.72)
  );
  const scale = Math.min(
    maximumWidth / image.naturalWidth,
    maximumHeight / image.naturalHeight
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;

  return {
    left: container.left + (container.width - width) / 2,
    top: container.top + (container.height - height) / 2,
    width,
    height,
  };
}

function makeFlyingImage(src, bounds) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = "";
  image.className = "project-lightbox-flying-image";
  Object.assign(image.style, {
    left: `${bounds.left}px`,
    top: `${bounds.top}px`,
    width: `${bounds.width}px`,
    height: `${bounds.height}px`,
  });
  document.body.appendChild(image);
  return image;
}

function ProjectPage({ project }) {
  const heroStageRef = useRef(null);
  const lightboxStageRef = useRef(null);
  const lightboxImageRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxTransitioning, setLightboxTransitioning] = useState(false);
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const gallery = project.gallery ?? [project.image];
  const allImages = [project.image, ...gallery];

  const closeLightbox = () => {
    if (lightboxTransitioning) return;
    setLightboxIndex(null);
  };

  const selectLightboxImage = (nextIndex) => {
    if (
      nextIndex === lightboxIndex
      || lightboxTransitioning
      || lightboxIndex === null
    ) {
      return;
    }

    const normalizedIndex = (nextIndex + allImages.length) % allImages.length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLightboxIndex(normalizedIndex);
      thumbnailRefs.current[normalizedIndex]?.scrollIntoView({ block: "nearest" });
      return;
    }

    const currentImage = lightboxImageRef.current;
    const stage = lightboxStageRef.current;
    const oldThumbnail = thumbnailRefs.current[lightboxIndex];
    const newThumbnail = thumbnailRefs.current[normalizedIndex];

    if (!currentImage || !stage || !oldThumbnail || !newThumbnail) {
      setLightboxIndex(normalizedIndex);
      return;
    }

    const preload = new Image();
    preload.onload = () => {
      const currentBounds = currentImage.getBoundingClientRect();
      const oldThumbnailBounds = oldThumbnail.getBoundingClientRect();
      const newThumbnailBounds = newThumbnail.getBoundingClientRect();
      const destinationBounds = fitImageInside(preload, stage.getBoundingClientRect());
      const outgoingImage = makeFlyingImage(allImages[lightboxIndex], currentBounds);
      const incomingImage = makeFlyingImage(allImages[normalizedIndex], newThumbnailBounds);
      const timing = {
        duration: 680,
        easing: "cubic-bezier(.76, 0, .24, 1)",
        fill: "forwards",
      };

      setLightboxTransitioning(true);
      setLightboxIndex(normalizedIndex);
      thumbnailRefs.current[normalizedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });

      const outgoingAnimation = outgoingImage.animate(
        [
          {
            left: `${currentBounds.left}px`,
            top: `${currentBounds.top}px`,
            width: `${currentBounds.width}px`,
            height: `${currentBounds.height}px`,
          },
          {
            left: `${oldThumbnailBounds.left}px`,
            top: `${oldThumbnailBounds.top}px`,
            width: `${oldThumbnailBounds.width}px`,
            height: `${oldThumbnailBounds.height}px`,
          },
        ],
        timing
      );
      const incomingAnimation = incomingImage.animate(
        [
          {
            left: `${newThumbnailBounds.left}px`,
            top: `${newThumbnailBounds.top}px`,
            width: `${newThumbnailBounds.width}px`,
            height: `${newThumbnailBounds.height}px`,
          },
          {
            left: `${destinationBounds.left}px`,
            top: `${destinationBounds.top}px`,
            width: `${destinationBounds.width}px`,
            height: `${destinationBounds.height}px`,
          },
        ],
        timing
      );

      Promise.allSettled([outgoingAnimation.finished, incomingAnimation.finished])
        .then(() => {
          outgoingImage.remove();
          incomingImage.remove();
          setLightboxTransitioning(false);
        });
    };
    preload.onerror = () => setLightboxIndex(normalizedIndex);
    preload.src = allImages[normalizedIndex];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${project.title} — Studio Ganga`;

    return () => {
      document.title = "Studio Ganga";
    };
  }, [project]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    let touchStartY = 0;
    document.body.style.overflow = "hidden";

    const handleLightboxKeys = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        selectLightboxImage(lightboxIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectLightboxImage(lightboxIndex - 1);
      }
    };

    const dismissWithScroll = (distance) => {
      if (lightboxTransitioning) return;
      closeLightbox();
      window.requestAnimationFrame(() => {
        window.scrollBy({ top: distance, behavior: "auto" });
      });
    };

    const handleLightboxWheel = (event) => {
      if (
        Math.abs(event.deltaY) < 8
        || Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      event.preventDefault();
      dismissWithScroll(event.deltaY);
    };

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchEnd = (event) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const distance = touchStartY - touchEndY;
      if (Math.abs(distance) >= 35) dismissWithScroll(distance);
    };

    window.addEventListener("keydown", handleLightboxKeys);
    window.addEventListener("wheel", handleLightboxWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleLightboxKeys);
      window.removeEventListener("wheel", handleLightboxWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightboxIndex, lightboxTransitioning]);

  useEffect(() => {
    const stage = heroStageRef.current;
    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;
      const stageScroll = Math.max(0, -stage.getBoundingClientRect().top);
      const imageOffset = Math.min(stageScroll * 0.18, window.innerHeight * 0.22);

      stage.style.setProperty("--project-image-parallax", `${imageOffset}px`);
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      stage.style.removeProperty("--project-image-parallax");
    };
  }, [project.slug]);

  useEffect(() => {
    if (
      lightboxIndex !== null
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const root = document.documentElement;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let scrollFrame = 0;

    const maximumScroll = () => Math.max(0, root.scrollHeight - window.innerHeight);

    const animateScroll = () => {
      const distance = targetScroll - currentScroll;
      currentScroll += distance * 0.075;

      if (Math.abs(distance) < 0.4) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        scrollFrame = 0;
        return;
      }

      window.scrollTo(0, currentScroll);
      scrollFrame = window.requestAnimationFrame(animateScroll);
    };

    const moveTo = (nextTarget) => {
      if (!scrollFrame) {
        currentScroll = window.scrollY;
        targetScroll = currentScroll;
      }

      targetScroll = Math.max(0, Math.min(maximumScroll(), nextTarget));
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(animateScroll);
    };

    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      const deltaScale = event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
      moveTo(targetScroll + event.deltaY * deltaScale * 0.72);
    };

    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement
        && target.closest("input, textarea, select, [contenteditable='true']")
      ) {
        return;
      }

      const pageStep = window.innerHeight * 0.82;
      const keyDistance = {
        ArrowDown: 90,
        ArrowUp: -90,
        PageDown: pageStep,
        PageUp: -pageStep,
        " ": event.shiftKey ? -pageStep : pageStep,
      }[event.key];

      if (event.key === "Home") {
        event.preventDefault();
        moveTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        moveTo(maximumScroll());
      } else if (keyDistance !== undefined) {
        event.preventDefault();
        moveTo(targetScroll + keyDistance);
      }
    };

    const synchronizeScroll = () => {
      if (scrollFrame) return;
      currentScroll = window.scrollY;
      targetScroll = window.scrollY;
    };

    const handleResize = () => {
      targetScroll = Math.min(targetScroll, maximumScroll());
      currentScroll = Math.min(currentScroll, maximumScroll());
    };

    root.classList.add("project-smooth-scroll-active");
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", synchronizeScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      root.classList.remove("project-smooth-scroll-active");
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", synchronizeScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, [project.slug, lightboxIndex]);

  return (
    <div className={`project-page project-page--${project.slug}`}>
      <header className="project-nav">
        <a className="project-brand" href="/#home" aria-label="Studio Ganga — return to homepage">
          <img src={studioGangaLogo} alt="Studio Ganga" />
        </a>
        <nav aria-label="Project navigation">
          <a href="/#about">About us</a>
          <a href="/#work">Portfolio</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <main>
        <div className="project-hero-stage" ref={heroStageRef}>
          <section className="project-hero">
            <img src={project.image} alt={`${project.title} featured view`} />
            <div className="project-hero-copy">
              <h1>{project.title}</h1>
              <span>{project.number} / {String(projects.length).padStart(2, "0")}</span>
            </div>
            <span className="project-scroll-note">Scroll to explore</span>
          </section>
        </div>

        <section className="project-introduction">
          <div className="project-index">
            <span>Project</span>
            <strong>{project.number}</strong>
          </div>
          <div className="project-introduction-main">
            <p>{project.intro}</p>
          </div>
          <dl className="project-details">
            {project.details.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="project-gallery" aria-label={`${project.title} gallery`}>
          {gallery.map((image, index) => (
            <figure
              className={`project-gallery-item project-gallery-item-${(index % 6) + 1}`}
              key={image}
            >
              <button
                className="project-gallery-open"
                type="button"
                aria-label={`Open ${project.title} view ${index + 2}`}
                onClick={() => setLightboxIndex(index + 1)}
              >
                <img src={image} alt={`${project.title} view ${index + 2}`} loading="lazy" />
              </button>
              <figcaption>{String(index + 2).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </section>

        <a className="project-next" href={`/projects/${nextProject.slug}`}>
          <span>Next project</span>
          <div>
            <h2>{nextProject.title}</h2>
            <ArrowRight size={42} strokeWidth={1.1} />
          </div>
        </a>
      </main>

      <footer className="footer">
        <span>© 2026 Studio Ganga</span>
        <span>Architecture, interiors, and renovation</span>
      </footer>

      {lightboxIndex !== null && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} image gallery`}
        >
          <button
            className="project-lightbox-close"
            type="button"
            aria-label="Close image gallery"
            onClick={closeLightbox}
          >
            <X size={20} strokeWidth={1.6} />
          </button>

          <div className="project-lightbox-thumbnails" aria-label="Gallery thumbnails">
            {allImages.map((image, index) => (
              <button
                className={`project-lightbox-thumbnail ${index === lightboxIndex ? "is-active" : ""}`}
                type="button"
                aria-label={`View image ${index + 1} of ${allImages.length}`}
                aria-current={index === lightboxIndex ? "true" : undefined}
                onClick={() => selectLightboxImage(index)}
                disabled={lightboxTransitioning}
                key={`${image}-${index}`}
              >
                <img
                  src={image}
                  alt=""
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                />
              </button>
            ))}
          </div>

          <div className="project-lightbox-stage" ref={lightboxStageRef}>
            <img
              className={lightboxTransitioning ? "is-transitioning" : ""}
              src={allImages[lightboxIndex]}
              alt={`${project.title} view ${lightboxIndex + 1}`}
              ref={lightboxImageRef}
            />
          </div>

          <span className="project-lightbox-count">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
