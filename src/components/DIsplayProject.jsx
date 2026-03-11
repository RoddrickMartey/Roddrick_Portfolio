import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { CalendarDays, RefreshCw, ExternalLink, Github } from "lucide-react";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

function DisplayProject({ project }) {
  const gallery =
    project?.gallery?.length > 0 ? project.gallery : [PLACEHOLDER_IMG];
  const tech = Array.isArray(project?.tech) ? project.tech : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-full px-5 text-xs tracking-wide">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl border border-border bg-background">

        {/* Hero image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-muted">
          <img
            src={gallery[0]}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-xs font-mono tracking-[3px] text-primary/70 uppercase mb-1">
              Project
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-6 sm:p-8">

          {/* Summary */}
          {project.summary && (
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          )}

          {/* Gallery carousel */}
          {gallery.length > 1 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono tracking-[3px] text-primary/50 uppercase">
                Gallery
              </p>
              <div className="flex items-center justify-center">
                <Carousel className="w-full">
                  <CarouselContent>
                    {gallery.map((g, idx) => (
                      <CarouselItem key={idx}>
                        <div className="overflow-hidden rounded-xl border border-border aspect-video">
                          <img
                            src={g}
                            alt={`Screenshot ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>
          )}

          {/* Description */}
          {project.description?.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono tracking-[3px] text-primary/50 uppercase">
                About
              </p>
              <div className="space-y-3">
                {project.description.map((line, idx) => (
                  <p key={idx} className="text-sm font-light leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {tech.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono tracking-[3px] text-primary/50 uppercase">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <div
                    key={t._id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all hover:scale-105"
                    style={{
                      backgroundColor: t.color ? `${t.color}18` : "transparent",
                      borderColor: t.color ? `${t.color}40` : undefined,
                      color: t.color || "inherit",
                    }}
                  >
                    {t.icon && (
                      <img
                        src={t.icon}
                        alt={t.name}
                        className="w-4 h-4 object-contain"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dates + Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground/60 font-mono">
              {project.createdAt && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              )}
              {project.updatedAt && (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {(project.repoUrl || project.liveUrl) && (
              <div className="flex gap-2">
                {project.repoUrl && (
                  <Button variant="outline" size="sm" asChild className="rounded-full px-4 gap-2">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5" />
                      Repo
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="sm" asChild className="rounded-full px-4 gap-2">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DisplayProject;
