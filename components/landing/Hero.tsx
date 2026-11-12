"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { AmbientVideo } from "./AmbientVideo";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        alt="An astronaut and their cat pause in a field of flowers beneath a starry dusk sky"
        className="hero-poster"
        fill
        priority
        sizes="100vw"
        src="/images/hero.jpg"
      />
      <AmbientVideo className="hero-video" poster="/images/hero.jpg" src="/videos/hero.mp4" />
      <div className="hero-shade" />
      <div aria-hidden="true" className="hero-stars">
        {Array.from({ length: 28 }, (_, index) => (
          <span
            key={index}
            style={{
              "--star-index": index,
              "--star-left": `${(index * 37 + 8) % 97}%`,
              "--star-top": `${(index * 53 + 7) % 89}%`,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="hero-content page-width">
        <div className="hero-copy">
          <p className="hero-kicker hero-enter hero-enter-one">
            <span className="hero-kicker-star"><Icon name="sparkle" /></span>
            A calmer way to get hired
          </p>
          <h1 className="hero-title hero-enter hero-enter-two" id="hero-title">
            Your next chapter<br />
            <em>starts here.</em>
          </h1>
          <p className="hero-description hero-enter hero-enter-three">
            Turn the experience you already have into a resume that feels like you—and gets you closer to work you love.
          </p>
          <div className="hero-actions hero-enter hero-enter-four">
            <Link className="button button-primary" href="/auth/sign-up">
              Make your free resume <Icon name="arrow-up-right" />
            </Link>
            <a className="hero-watch-link" href="#how-it-works">
              <span className="hero-play"><span /></span> See how it works
            </a>
          </div>
          <div className="hero-note hero-enter hero-enter-five">
            <span className="hero-note-check"><Icon name="check" /></span>
            <span>Free to start <i /> No card needed</span>
          </div>
        </div>

        <div className="hero-resume-wrap" aria-label="Preview of an AI-improved resume">
          <div className="hero-orbit-glow" />








        </div>
      </div>
      <a className="hero-scroll-cue" href="#how-it-works"><span /> Scroll to explore</a>
      <div className="hero-bottom-fade" />
    </section>
  );
}