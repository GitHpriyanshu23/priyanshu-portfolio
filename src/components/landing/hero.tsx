"use client";

import Link from "next/link";
import { Copy, Check, SealCheck } from "@phosphor-icons/react";
import { useState } from "react";
import {
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  MediumLogo,
  XLogo,
} from "@phosphor-icons/react";
import { ProfileAvatar } from "@/components/profile-avatar";
import { Container } from "@/components/container";
import { RotatingTitle } from "@/components/landing/rotating-title";
import { SpotifyLastPlayed } from "@/components/landing/spotify-last-played";
import { TimezoneWidget } from "@/components/landing/timezone-widget";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { heroConfig, socialLinks } from "@/config/hero";

const iconMap = {
  x: XLogo,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  medium: MediumLogo,
  mail: EnvelopeSimple,
  resume: FileText,
};

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(heroConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container className="pt-4">
      <div className="animate-in-up-on-view flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <ProfileAvatar />
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {heroConfig.name}
              <SealCheck
                className="size-6 shrink-0 text-[#1D9BF0] sm:size-7"
                weight="fill"
                aria-label="Verified"
              />
            </h1>
            <RotatingTitle />
            <p className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1 text-sm sm:text-base">
              <button
                type="button"
                onClick={() => void copyEmail()}
                className="group inline-flex cursor-pointer items-center gap-1.5 text-secondary transition-colors hover:text-foreground"
                aria-label="Copy email"
              >
                <span className="hidden md:block">{heroConfig.email}</span>
                <span className="block md:hidden">Email</span>
                <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                  {copied ? (
                    <Check className="size-4 text-foreground" />
                  ) : (
                    <Copy className="size-4 transition-transform group-hover:scale-110" />
                  )}
                </span>
              </button>
            </p>
          </div>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-secondary sm:text-base">
          {heroConfig.bio}
        </p>

        <div className="flex flex-wrap gap-0.5">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const external = link.href.startsWith("http") || link.href.startsWith("mailto:");

            return (
              <Tooltip key={link.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.name}
                    className="flex items-center gap-2 p-1 text-secondary transition-colors hover:text-foreground"
                  >
                    <Icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{link.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="flex flex-wrap items-stretch justify-between gap-5 pt-1">
          <SpotifyLastPlayed />
          <TimezoneWidget />
        </div>
      </div>
    </Container>
  );
}
