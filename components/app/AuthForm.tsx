"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticateDemo, initializeDemo } from "../../lib/demo/store";
import { Brand } from "../landing/Brand";
import { Icon } from "../landing/Icon";
import { useToast } from "./Toast";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { showToast } = useToast();
  const isSignUp = mode === "sign-up";
  const continueDemo = (useEnteredDetails = false) => {
    if (useEnteredDetails) authenticateDemo(email, isSignUp ? name : undefined);
    else initializeDemo();
    router.push("/dashboard");
  };

  return (
    <main className="auth-page">
      <div className="auth-topbar"><Brand /><Link href="/">Back to Orbit <Icon name="arrow-up-right" /></Link></div>
      <div className="auth-layout">
        <section className="auth-story">
          <span className="auth-story-star">✦</span>
          <p className="eyebrow">A CALMER WAY FORWARD</p>
          <h1>Your next chapter<br /><em>starts with your story.</em></h1>
          <p>Make a resume that feels like you, with just enough thoughtful help along the way.</p>
          <div className="auth-story-note"><span className="auth-mini-paper"><i /><i /><i /></span><span><strong>One small step at a time.</strong><small>Your work is saved on this device.</small></span></div>
        </section>
        <section className="auth-card">
          <p className="eyebrow">{isSignUp ? "LET’S GET STARTED" : "WELCOME BACK"}</p>
          <h2>{isSignUp ? "Create your account" : "Sign in to Orbit"}</h2>
          <p className="auth-card-copy">{isSignUp ? "Your next step can start right here." : "Pick up where you left off."}</p>
          <form onSubmit={(event) => { event.preventDefault(); continueDemo(true); }}>
            {isSignUp && <label className="form-field">Your name<input autoComplete="name" onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" required value={name} /></label>}
            <label className="form-field">Email address<input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} /></label>
            <label className="form-field">Password<input autoComplete={isSignUp ? "new-password" : "current-password"} minLength={6} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" required type="password" value={password} /></label>
            {!isSignUp && <button className="forgot-link" onClick={() => showToast("Password reset is simulated in this demo.", "info")} type="button">Forgot password?</button>}
            <button className="button-primary-app auth-submit" type="submit">{isSignUp ? "Create account" : "Sign in"} <Icon name="arrow-right" /></button>
          </form>
          <div className="auth-divider"><span>or continue with</span></div>
          <button className="google-button" onClick={() => continueDemo()} type="button"><span className="google-mark">G</span> Continue with Google</button>
          <p className="auth-switch">{isSignUp ? "Already have an account?" : "New to Orbit?"} <Link href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}>{isSignUp ? "Sign in" : "Create an account"}</Link></p>
          <p className="auth-demo-note"><Icon name="shield" /> Demo only — no password or personal data is sent anywhere.</p>
        </section>
      </div>
      <footer className="auth-footer">A little closer to your next chapter <i>✦</i></footer>
    </main>
  );
}