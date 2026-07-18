import Link from "next/link";
import { ArrowSquareOut, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { resumeConfig } from "@/config/resume";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pageTitle("Resume"),
  description: resumeConfig.description,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="space-y-8 pb-16 pt-8">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{resumeConfig.title}</h1>
            <p className="mt-3 max-w-xl text-secondary">{resumeConfig.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={resumeConfig.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Open PDF
              <ArrowSquareOut className="size-4" />
            </Link>
            <Link
              href={resumeConfig.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Download
              <DownloadSimple className="size-4" />
            </Link>
          </div>
        </div>
      </Container>

      <Container>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <iframe
            src={resumeConfig.embedUrl}
            title="Priyanshu Urmaliya resume"
            className="aspect-[3/4] w-full min-h-[70vh] bg-muted sm:aspect-auto sm:min-h-[80vh]"
            allow="autoplay"
          />
        </div>
      </Container>
    </div>
  );
}
