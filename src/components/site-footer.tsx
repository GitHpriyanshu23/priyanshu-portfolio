import Link from "next/link";
import { ArrowUpRight, GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { siteConfig } from "@/config/meta";

const footerSocial = [
  { name: "X", href: "https://x.com/imdevPU23", icon: XLogo },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/priyanshu-urmaliya-1183b425a/", icon: LinkedinLogo },
  { name: "GitHub", href: "https://github.com/GitHpriyanshu23", icon: GithubLogo },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="font-mono text-sm text-secondary">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p className="mt-1">Built with love, late nights, coffee</p>
        </div>

        <div className="flex items-center gap-2">
          {footerSocial.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-5" />
              </Link>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
