import Link from "next/link";
import {
  EnvelopeSimple,
  GithubLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { HighlightedText } from "@/components/highlighted-text";
import { aboutConfig } from "@/config/about";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

const connectIconMap = {
  mail: EnvelopeSimple,
  x: XLogo,
  github: GithubLogo,
};

export const metadata = createPageMetadata({
  title: pageTitle("About"),
  description: aboutConfig.intro.replace(/\*\*/g, ""),
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20 pt-8">
      <Container>
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {aboutConfig.headline[0]}
              <br />
              {aboutConfig.headline[1]}
            </h1>
            <p className="text-base leading-relaxed text-secondary sm:text-lg">
              <HighlightedText text={aboutConfig.intro} />
            </p>
          </div>

          <blockquote className="border-l-2 border-border pl-4 text-sm italic leading-relaxed text-secondary sm:text-base">
            {aboutConfig.quote}
          </blockquote>

          <div className="relative flex flex-wrap items-center gap-2 py-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border"
            />
            {aboutConfig.traits.map((trait) => (
              <span
                key={trait}
                className={`relative rounded-full border px-3 py-1 text-xs font-medium ${aboutConfig.traitStyles[trait]}`}
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {aboutConfig.meta.map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container>
        <section className="max-w-2xl space-y-5">
          <h2 className="text-xl font-bold tracking-tight">{aboutConfig.story.title}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-secondary sm:text-base">
            {aboutConfig.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <HighlightedText text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="max-w-2xl space-y-6">
          <h2 className="text-xl font-bold tracking-tight">{aboutConfig.principles.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutConfig.principles.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card/60 p-4"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="max-w-2xl space-y-4">
          <h2 className="text-xl font-bold tracking-tight">{aboutConfig.beyond.title}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-secondary sm:text-base">
            {aboutConfig.beyond.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <HighlightedText text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="text-xl font-bold tracking-tight">Let&apos;s connect</h2>
          <p className="text-sm leading-relaxed text-secondary sm:text-base">
            Whether you want to collaborate, talk about AI, or just say hi — I&apos;d love to
            hear from you.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {aboutConfig.connectLinks.map((link) => {
              const Icon = connectIconMap[link.icon];
              const external =
                link.href.startsWith("http") || link.href.startsWith("mailto:");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={link.name}
                  className="flex size-10 items-center justify-center rounded-xl border border-border text-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
