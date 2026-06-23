import { Wordmark } from "./Logo";
import { profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-bg2">
      <div className="mx-auto flex w-[min(1100px,92vw)] flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <Wordmark />
        <p className="font-term text-base text-muted">
          built on-chain energy · no templates · {new Date().getFullYear()}
        </p>
        <div className="flex gap-4 font-display text-[9px] tracking-widest text-muted">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-mint">
            GH
          </a>
          <a href={profile.links.x} target="_blank" rel="noreferrer" className="hover:text-mint">
            X
          </a>
          <a href={profile.links.email} className="hover:text-mint">
            MAIL
          </a>
        </div>
      </div>
      <div className="bg-ink py-2 text-center font-term text-sm text-muted/70">
        INSERT COIN — © {profile.handle} · GG
      </div>
    </footer>
  );
}
