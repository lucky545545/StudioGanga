import { ArrowUpRight, Mail, Phone, X } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { projectCategories } from "../data/categories.js";
import courtyardHouse from "../../assets/architecture/Architecture- terra heaven farmhouse/t2.png";
import architectureWorkImage from "../../assets/architecture/Architecture- terra heaven farmhouse/t1.png";
import interiorWorkImage from "../../assets/Interior/Interior - Aman's residence/living room/LV1.png";
import heroVideo from "../../assets3/SkyAman1  Urban Hillside Sanctuary  Architecture Walkthrough Animation - MULTIPLY (1080p, h264).mp4";
import heroLogo from "../../assets3/studio-ganga-logo-transparent.png";
import aboutSketchLeft from "../../assets3/WhatsApp Image 2026-07-19 at 1.22.47 AM.jpeg";
import aboutSketchRight from "../../assets3/WhatsApp Image 2026-07-19 at 1.22.47 mmm.jpeg";
import aboutImageOne from "../../assets4/1.jpeg";
import aboutImageTwo from "../../assets4/2.jpeg";
import aboutImageThree from "../../assets4/3.jpeg";
import jalajCutout from "../../assets4/jalaj-garg-cutout.png";

const orbitImages = Object.values(
  import.meta.glob("../../assets2/*.jpg", { eager: true, query: "?url", import: "default" })
);
const orbitSequence = [...orbitImages, ...orbitImages, ...orbitImages];

const architectureSlideshowImages = Object.values(
  import.meta.glob("../../assets/architecture/**/*.png", { eager: true, query: "?url", import: "default" })
);
const interiorSlideshowImages = Object.values(
  import.meta.glob("../../assets/Interior/**/*.png", { eager: true, query: "?url", import: "default" })
);

const milestones = [
  ["2+", "Years of experience"],
  ["10+", "Ongoing projects"],
];

const workCategories = [
  {
    number: "01",
    title: "Architecture",
    description: "Homes and buildings shaped by climate, context, material, and the rhythms of everyday life.",
    image: architectureWorkImage,
    slideshowImages: architectureSlideshowImages,
    href: "/architecture",
    categorySlug: "architecture",
  },
  {
    number: "02",
    title: "Interior",
    description: "Warm, practical interiors developed through proportion, light, detail, and natural finishes.",
    image: interiorWorkImage,
    slideshowImages: interiorSlideshowImages,
    href: "/interior",
    categorySlug: "interior",
  },
];

function shuffleImages(images, currentImage) {
  const shuffled = [...new Set(images)].filter((image) => image !== currentImage);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function WorkCategoryCard({ category, onOpen }) {
  const [currentImage, setCurrentImage] = useState(category.image);
  const [previousImage, setPreviousImage] = useState(null);
  const currentImageRef = useRef(category.image);
  const sequenceRef = useRef([]);
  const sequenceIndexRef = useRef(0);
  const startTimerRef = useRef(null);
  const intervalRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const sessionRef = useRef(0);

  const clearTimers = () => {
    window.clearTimeout(startTimerRef.current);
    window.clearInterval(intervalRef.current);
    window.clearTimeout(transitionTimerRef.current);
  };

  const showImage = (nextImage, session, onShown) => {
    if (!nextImage || nextImage === currentImageRef.current) return;

    const preload = new Image();
    preload.onload = () => {
      if (session !== sessionRef.current) return;

      window.clearTimeout(transitionTimerRef.current);
      setPreviousImage(currentImageRef.current);
      currentImageRef.current = nextImage;
      setCurrentImage(nextImage);
      transitionTimerRef.current = window.setTimeout(() => setPreviousImage(null), 850);
      onShown();
    };
    preload.src = nextImage;
  };

  const startSlideshow = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    clearTimers();
    sessionRef.current += 1;
    const session = sessionRef.current;
    sequenceRef.current = shuffleImages(category.slideshowImages, currentImageRef.current);
    sequenceIndexRef.current = 0;

    const advance = () => {
      if (sequenceIndexRef.current >= sequenceRef.current.length) {
        sequenceRef.current = shuffleImages(category.slideshowImages, currentImageRef.current);
        sequenceIndexRef.current = 0;
      }

      const nextImage = sequenceRef.current[sequenceIndexRef.current];
      sequenceIndexRef.current += 1;
      showImage(nextImage, session, () => {
        intervalRef.current = window.setTimeout(advance, 1900);
      });
    };

    startTimerRef.current = window.setTimeout(() => {
      advance();
    }, 400);
  };

  const stopSlideshow = () => {
    clearTimers();
    sessionRef.current += 1;

    if (currentImageRef.current !== category.image) {
      setPreviousImage(currentImageRef.current);
      currentImageRef.current = category.image;
      setCurrentImage(category.image);
      transitionTimerRef.current = window.setTimeout(() => setPreviousImage(null), 850);
    }
  };

  const openCategory = (event) => {
    event.preventDefault();
    clearTimers();
    sessionRef.current += 1;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const overlay = document.createElement("div");
    const overlayImage = document.createElement("img");
    const entryImage = currentImageRef.current;

    overlay.className = "category-transition-overlay";
    overlay.style.top = `${bounds.top}px`;
    overlay.style.left = `${bounds.left}px`;
    overlay.style.width = `${bounds.width}px`;
    overlay.style.height = `${bounds.height}px`;
    overlayImage.src = entryImage;
    overlayImage.alt = "";
    overlay.appendChild(overlayImage);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    onOpen(category.categorySlug);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => overlay.classList.add("is-fullscreen"));
    });

    const transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 850;

    window.setTimeout(() => {
      overlay.classList.add("is-leaving");
      window.setTimeout(() => overlay.remove(), 320);
    }, transitionDuration);
  };

  useEffect(() => () => {
    clearTimers();
    sessionRef.current += 1;
  }, []);

  return (
    <a
      className="work-category section-reveal"
      href={category.href}
      aria-label={`Explore ${category.title} projects`}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      onFocus={startSlideshow}
      onBlur={stopSlideshow}
      onClick={openCategory}
    >
      <div className="work-category-media">
        {previousImage && (
          <img
            className="work-category-slide work-category-slide-previous"
            src={previousImage}
            alt=""
            aria-hidden="true"
          />
        )}
        <img
          className="work-category-slide work-category-slide-current"
          key={currentImage}
          src={currentImage}
          alt={`${category.title} work by Studio Ganga`}
        />
      </div>
      <span className="work-category-index">{category.number}</span>
      <div className="work-category-copy">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
        <strong>
          Explore projects <ArrowUpRight size={18} strokeWidth={1.8} />
        </strong>
      </div>
    </a>
  );
}

function CategoryPopup({ category, onClose }) {
  const popupRef = useRef(null);
  const scrollRef = useRef(null);
  const slideRefs = useRef([]);
  const loopedProjects = [...category.projects, category.projects[0]];

  useEffect(() => {
    popupRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return undefined;

    let animationFrame = 0;
    let loopTimer = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderTriangleWipe = () => {
      animationFrame = 0;
      const viewportHeight = Math.max(1, scroller.clientHeight);
      const scrollPosition = scroller.scrollTop / viewportHeight;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;

        if (index === 0) {
          slide.style.clipPath = "none";
          return;
        }

        const rawProgress = Math.min(1, Math.max(0, scrollPosition - (index - 1)));
        const progress = reducedMotion
          ? Number(rawProgress >= 0.5)
          : rawProgress < 0.5
            ? 2 * rawProgress * rawProgress
            : 1 - ((-2 * rawProgress + 2) ** 2) / 2;
        const trianglePoint = 100 - progress * 125;
        const triangleShoulder = trianglePoint + 25;

        slide.style.clipPath = `polygon(
          ${triangleShoulder}% 0,
          100% 0,
          100% 100%,
          ${triangleShoulder}% 100%,
          ${trianglePoint}% 50%
        )`;
      });
    };

    const requestTriangleWipe = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderTriangleWipe);

      window.clearTimeout(loopTimer);
      loopTimer = window.setTimeout(() => {
        const viewportHeight = Math.max(1, scroller.clientHeight);
        const loopEnd = category.projects.length * viewportHeight;

        if (scroller.scrollTop < loopEnd - 2) return;

        scroller.style.scrollSnapType = "none";
        scroller.scrollTop = 0;
        renderTriangleWipe();
        window.requestAnimationFrame(() => {
          scroller.style.scrollSnapType = "";
        });
      }, 120);
    };

    renderTriangleWipe();
    scroller.addEventListener("scroll", requestTriangleWipe, { passive: true });
    window.addEventListener("resize", requestTriangleWipe);

    return () => {
      scroller.removeEventListener("scroll", requestTriangleWipe);
      window.removeEventListener("resize", requestTriangleWipe);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(loopTimer);
    };
  }, [category]);

  return (
    <div
      className="category-popup"
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} projects`}
      ref={popupRef}
      tabIndex="-1"
    >
      <button className="category-popup-close" type="button" onClick={onClose} aria-label="Close projects">
        <X size={20} strokeWidth={1.6} />
        <span>Close</span>
      </button>

      <div className="category-popup-scroll" id={`${category.slug}-projects`} ref={scrollRef}>
        <div
          className="category-popup-track"
          style={{ "--category-project-count": loopedProjects.length }}
        >
          <div className="category-popup-stage">
            {loopedProjects.map((project, index) => (
              <a
                className="category-popup-project"
                href={`/projects/${project.slug}`}
                aria-label={`Open ${project.title} project`}
                key={`${project.slug}-${index}`}
                ref={(element) => {
                  slideRefs.current[index] = element;
                }}
                style={{ zIndex: index + 1 }}
              >
                <img src={project.image} alt="" />
                <div className="category-popup-shade" aria-hidden="true" />
                <h2>{project.title}</h2>
              </a>
            ))}
          </div>

          <div className="category-popup-snap-points" aria-hidden="true">
            {loopedProjects.map((project, index) => (
              <div className="category-popup-snap-point" key={`${project.slug}-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const heroVideoRef = useRef(null);
  const categoryFromPath = () => {
    const categorySlug = window.location.pathname.match(/^\/(architecture|interior)\/?$/)?.[1];
    return categorySlug ? projectCategories[categorySlug] : null;
  };
  const [activeCategory, setActiveCategory] = useState(categoryFromPath);

  const closeCategory = () => {
    setActiveCategory(null);
    if (/^\/(architecture|interior)\/?$/.test(window.location.pathname)) {
      window.history.replaceState(null, "", "/");
    }
    document.body.style.overflow = "";
  };

  const openCategory = (categorySlug) => {
    setActiveCategory(projectCategories[categorySlug]);
    if (window.location.pathname !== `/${categorySlug}`) {
      window.history.pushState({ categorySlug }, "", `/${categorySlug}`);
    }
  };

  useEffect(() => {
    const syncCategoryWithHistory = () => {
      setActiveCategory(categoryFromPath());
    };

    window.addEventListener("popstate", syncCategoryWithHistory);
    return () => {
      window.removeEventListener("popstate", syncCategoryWithHistory);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCategory ? "hidden" : "";
  }, [activeCategory]);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId || targetId === "home") return undefined;

    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    };

    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(scrollToTarget);
    });
    const loadTimer = window.setTimeout(scrollToTarget, 350);
    window.addEventListener("load", scrollToTarget, { once: true });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(loadTimer);
      window.removeEventListener("load", scrollToTarget);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;

    let animationFrame;
    const startClip = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const keepInsideClip = () => {
      if (video.currentTime >= 16.9) startClip();
      animationFrame = requestAnimationFrame(keepInsideClip);
    };

    if (video.readyState >= 1) startClip();
    else video.addEventListener("loadedmetadata", startClip, { once: true });
    animationFrame = requestAnimationFrame(keepInsideClip);

    return () => {
      video.removeEventListener("loadedmetadata", startClip);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return undefined;

    const hero = document.querySelector(".video-hero");
    const heroMedia = document.querySelector(".video-hero-media");
    const heroTitle = document.querySelector(".video-hero-title");
    const heroNav = document.querySelector(".video-hero-nav");
    const isMobileOrbit = window.matchMedia("(max-width: 620px)").matches;
    const secondOrbitRadius = isMobileOrbit ? "82vmin" : "68vmin";
    const thirdOrbitRadius = isMobileOrbit ? "84vmin" : "70vmin";
    const settledOrbitCardScale = isMobileOrbit ? 0.9 : 1;
    let heroFrame = 0;

    const updateHeroTransition = () => {
      if (heroFrame) return;

      heroFrame = requestAnimationFrame(() => {
        const heroHeight = Math.max(1, hero.offsetHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / (heroHeight * 0.9)));

        gsap.set(heroMedia, {
          scale: 1 + progress * 0.065,
          opacity: 1 - progress * 0.42,
        });
        gsap.set(heroTitle, {
          y: progress * -54,
          opacity: Math.max(0, 1 - progress * 1.35),
        });
        gsap.set(heroNav, {
          y: progress * -22,
          opacity: Math.max(0, 1 - progress * 1.6),
        });

        heroFrame = 0;
      });
    };

    window.addEventListener("scroll", updateHeroTransition, { passive: true });
    window.addEventListener("resize", updateHeroTransition);
    updateHeroTransition();

    const context = gsap.context(() => {
      const story = gsap.timeline({ paused: true });

      story
        .to(".orbit-ring", { rotation: 540, ease: "none", duration: 13.1 }, 0)
        .to(".orbit-ring", {
          left: "50%",
          "--orbit-radius": secondOrbitRadius,
          duration: 1.3,
          ease: "power3.inOut",
        }, 1.5)
        .to(".orbit-stage", { "--orbit-center-y": "86%", duration: 1.3, ease: "power3.inOut" }, 1.5)
        .to(".orbit-card:not(.orbit-card-extra)", {
          "--orbit-card-scale": settledOrbitCardScale,
          duration: 1.3,
          ease: "power3.inOut",
        }, 1.5)
        .to(".orbit-card:not(.orbit-card-extra)", {
          "--orbit-angle": (_, card) => card.style.getPropertyValue("--orbit-next-angle"),
          duration: 1.3,
          ease: "power3.inOut",
        }, 1.5)
        .to(".orbit-card-extra", { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" }, 1.5)
        .to(".orbit-card:not(.orbit-card-extra) img", {
          scale: 1.02,
          duration: 1.3,
          ease: "power2.inOut",
        }, 1.5)
        .to(".orbit-card img", { rotation: 0, duration: 1.3, ease: "power2.inOut" }, 1.5)
        .to(".orbit-stage", { "--orbit-center-y": "14%", duration: 2.8, ease: "none" }, 2.85)
        .to(".orbit-ring", {
          left: "-7%",
          "--orbit-radius": thirdOrbitRadius,
          duration: 1.3,
          ease: "power2.inOut",
        }, 6.15)
        .to(".orbit-stage", { "--orbit-center-y": "85%", duration: 1.3, ease: "power2.inOut" }, 6.15)
        .to(".orbit-card:not(.orbit-card-extra) img", { scale: 1.1, duration: 1.3, ease: "power2.inOut" }, 6.15)
        .to(".orbit-stage", { "--orbit-center-y": "15%", duration: 2.48, ease: "none" }, 7.45)
        .to(".orbit-intro", { y: -90, autoAlpha: 0, duration: 0.8 }, 1.2)
        .fromTo(".orbit-founded", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65 }, 2.75)
        .to(".orbit-founded", { autoAlpha: 0, duration: 0.7 }, 5.85)
        .set(".orbit-rail-item", { opacity: 0.14 }, 0)
        .set(".orbit-stats-rail", { autoAlpha: 0, y: 0 }, 0)
        .to(".orbit-stats-rail", { autoAlpha: 1, duration: 0.45 }, 7.15)
        .to(".orbit-stats-rail", { y: "-124vh", duration: 2.3, ease: "none" }, 7.35);

      const railItems = gsap.utils.toArray(".orbit-rail-item");
      railItems.forEach((stat, index) => {
        const at = 7.35 + index * 1.15;
        story.to(stat, { opacity: 1, duration: 0.28, ease: "power2.out" }, at);

        if (index < railItems.length - 1) {
          story.to(stat, { opacity: 0.14, duration: 0.34, ease: "power2.in" }, at + 0.82);
        }
      });

      const orbitSection = document.querySelector(".orbit-story");
      let displayedProgress = 0;
      let targetProgress = 0;
      let orbitFrame = 0;

      const renderOrbitProgress = () => {
        displayedProgress += (targetProgress - displayedProgress) * 0.16;
        if (Math.abs(targetProgress - displayedProgress) < 0.0005) displayedProgress = targetProgress;
        story.progress(displayedProgress);
        orbitFrame = displayedProgress !== targetProgress
          ? requestAnimationFrame(renderOrbitProgress)
          : 0;
      };

      const updateOrbitScroll = () => {
        const rect = orbitSection.getBoundingClientRect();
        const distance = Math.max(1, orbitSection.offsetHeight - window.innerHeight);
        targetProgress = Math.min(1, Math.max(0, -rect.top / distance));
        if (!orbitFrame) orbitFrame = requestAnimationFrame(renderOrbitProgress);
      };

      window.addEventListener("scroll", updateOrbitScroll, { passive: true });
      window.addEventListener("resize", updateOrbitScroll);
      updateOrbitScroll();

      const sections = gsap.utils.toArray(".section-reveal");
      gsap.set(sections, { y: 34, autoAlpha: 0 });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            gsap.to(entry.target, {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.18 }
      );

      sections.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateOrbitScroll);
        window.removeEventListener("resize", updateOrbitScroll);
        if (orbitFrame) cancelAnimationFrame(orbitFrame);
      };
    });

    return () => {
      window.removeEventListener("scroll", updateHeroTransition);
      window.removeEventListener("resize", updateHeroTransition);
      if (heroFrame) cancelAnimationFrame(heroFrame);
      context.revert();
    };
  }, []);

  return (
    <div className="site" id="home">
      <section className="video-hero" aria-label="Studio Ganga architecture film">
        <video
          ref={heroVideoRef}
          className="video-hero-media"
          src={heroVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="video-hero-shade" aria-hidden="true" />

        <nav className="video-hero-nav" aria-label="Primary navigation">
          <a href="#about">About us</a>
          <a href="#work">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>

        <h1 className="video-hero-title">
          <img src={heroLogo} alt="Studio Ganga — Architecture and Interior" />
        </h1>
      </section>

      <main>
        <section className="orbit-story" aria-label="Studio Ganga story and milestones">
          <div className="orbit-stage">
            <div className="orbit-ring" aria-hidden="true">
              {orbitSequence.map((image, index) => (
                <div
                  className={`orbit-card ${index >= 15 ? "orbit-card-extra" : ""}`}
                  key={`${image}-${index}`}
                  style={{
                    "--orbit-angle": `${(360 / orbitSequence.length) * index}deg`,
                    "--orbit-next-angle": index < 15
                      ? `${(360 / 15) * index}deg`
                      : `${(360 / orbitSequence.length) * index}deg`,
                  }}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>

            <div className="orbit-copy orbit-intro">
              <p>A studio shaped by clarity, trust, and a collective pursuit of thoughtful design.</p>
            </div>

            <div className="orbit-copy orbit-founded">
              <strong>2024</strong>
              <span>Year of Foundation</span>
              <small>Built from a belief that enduring architecture begins with listening closely.</small>
            </div>

            <div className="orbit-stats-rail">
              {milestones.map(([number, label]) => (
                <div className="orbit-rail-item orbit-stat" key={label}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}

              <div className="orbit-rail-item orbit-finale">
                <p>The spaces behind ambitious lives.</p>
              </div>
            </div>

            <span className="orbit-scroll-hint">Scroll to explore</span>
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-heading section-reveal">
            <span>Portfolio</span>
            <h2>Two disciplines. One design language.</h2>
          </div>

          <div className="work-categories">
            {workCategories.map((category) => (
              <WorkCategoryCard category={category} key={category.title} onOpen={openCategory} />
            ))}
          </div>
        </section>

        <section className="about-editorial section-reveal" id="about">
          <div className="about-editorial-frame">
            <div className="about-editorial-meta" aria-label="About Studio Ganga">
              <span>Studio Ganga</span>
              <span>Founder / Principal Architect</span>
              <span>Uttar Pradesh, India</span>
            </div>

            <h2 className="about-editorial-name about-editorial-intro">
              I’m Jalaj Garg—an architect and interior designer. I turn bold ideas into
              spaces with soul.
            </h2>

            <div className="about-editorial-sketches" aria-hidden="true">
              <figure className="about-editorial-sketch about-editorial-sketch-left">
                <img src={aboutSketchLeft} alt="" />
              </figure>
              <figure className="about-editorial-sketch about-editorial-sketch-right">
                <img src={aboutSketchRight} alt="" />
              </figure>
            </div>

            <figure className="about-editorial-portrait">
              <img src={jalajCutout} alt="Jalaj Garg, founder of Studio Ganga" />
            </figure>

            <div className="about-editorial-statement">
              <span>Est. 2024</span>
              <p>Architecture and interiors shaped by honesty, clarity, and nature.</p>
            </div>

            <h2 className="about-title" aria-label="About us">
              <span>AB</span>
              <span className="about-title-o">O<i>✦</i></span>
              <span>UT US</span>
            </h2>

            <div className="about-grid">
              <figure className="about-image about-image-one">
                <img src={aboutImageOne} alt="Jalaj Garg overlooking the mountain landscape" />
              </figure>

              <div className="about-text-box about-text-one">
                <p>Studio Ganga is a multidisciplinary architecture and interior design practice founded by Jalaj Garg, based in Uttar Pradesh. We work across residential, interior, retail, and institutional projects — approaching each with the same core belief: good design is honest about what it's made of.</p>
                <p>We work with raw and natural materials — stone, wood, exposed textures, unpolished finishes — because they don't stay static. They weather, patina, and settle into their surroundings, growing more expressive with time rather than fading. A building shouldn't look its best only on the day it's completed.</p>
              </div>

              <div className="about-text-box about-text-two">
                <p>Alongside this, we treat green pockets — courtyards, planted breaks, framed views of the outdoors — as essential to how a space feels to inhabit, not as decoration added at the end. Bringing nature into daily proximity changes how a space is used and experienced, often more than any single material choice.</p>
                <p>This shapes how we design: spaces that are contextually responsive, materially honest, and built to be lived in — not just photographed.</p>
              </div>

              <figure className="about-image about-image-two">
                <img src={aboutImageTwo} alt="Portrait of Studio Ganga founder Jalaj Garg" />
              </figure>

              <figure className="about-image about-image-three">
                <img src={aboutImageThree} alt="Jalaj Garg beside a mountain lake" />
              </figure>
            </div>
          </div>

          <div className="about-editorial-story">
            <header className="about-editorial-story-heading">
              <span>About the studio</span>
              <h3>Our approach</h3>
            </header>

            <div className="about-editorial-story-copy">
              <div>
                <p>
                  Studio Ganga is a multidisciplinary architecture and interior design practice
                  founded by Jalaj Garg, based in Uttar Pradesh. We work across residential,
                  interior, retail, and institutional projects — approaching each with the same
                  core belief: good design is honest about what it's made of.
                </p>
                <p>
                  We work with raw and natural materials — stone, wood, exposed textures,
                  unpolished finishes — because they don't stay static. They weather, patina, and
                  settle into their surroundings, growing more expressive with time rather than
                  fading. A building shouldn't look its best only on the day it's completed.
                </p>
              </div>

              <div>
                <p>
                  Alongside this, we treat green pockets — courtyards, planted breaks, framed
                  views of the outdoors — as essential to how a space feels to inhabit, not as
                  decoration added at the end. Bringing nature into daily proximity changes how
                  a space is used and experienced, often more than any single material choice.
                </p>
                <p className="about-editorial-story-conclusion">
                  This shapes how we design: spaces that are contextually responsive, materially
                  honest, and built to be lived in — not just photographed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-image section-reveal">
            <img src={courtyardHouse} alt="Courtyard residence with shaded verandah and planting" />
          </div>
          <div className="contact-copy section-reveal">
            <span>Contact</span>
            <h2>Let us discuss your site, space, or renovation.</h2>
            <p>
              Send a short note about the location, scope, timeline, and what you want the space to become. Studio Ganga will respond with the next practical step.
            </p>
            <div className="contact-links">
              <a href="mailto:hello@studioganga.com">
                <Mail size={18} strokeWidth={1.8} /> jalajgarg.02@gmail.com
              </a>
              <a href="tel:+9045634883">
                <Phone size={18} strokeWidth={1.8} /> +91 9045634883
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 Studio Ganga</span>
        <span>Architecture, interiors, and renovation</span>
      </footer>

      {activeCategory && (
        <CategoryPopup category={activeCategory} onClose={closeCategory} />
      )}
    </div>
  );
}

export default HomePage;
