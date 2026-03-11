import React from "react";
import { useProjects } from "@/hooks/useProjects";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import { Laptop, FolderOpen, AlertTriangle } from "lucide-react";
import DisplayProject from "@/components/DIsplayProject";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

// -------------------
// Project Card
// -------------------
function ProjectCard({ project, index }) {
  const { title, summary, image } = project || {};
  const cover = image || PLACEHOLDER_IMG;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-muted/30 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <img
          src={cover}
          alt={title || "Project cover"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3 p-5">
        <h3 className="text-base font-semibold text-foreground leading-snug">
          {title || "Untitled Project"}
        </h3>
        <p className="text-sm font-light leading-relaxed text-muted-foreground flex-1 line-clamp-3">
          {summary || "No summary provided."}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/admin/edit-project/${project.slug}`)}
              className="text-xs rounded-full px-4 hover:bg-primary/10 hover:text-primary"
            >
              Edit
            </Button>
          )}
          <DisplayProject project={project} />
        </div>
      </div>
    </motion.div>
  );
}

// -------------------
// Main Projects Page
// -------------------
function ProjectPage() {
  const { data, isError, isLoading, error, refetch } = useProjects();

  if (isLoading) return <Loading />;

  if (isError) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load projects.";
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
        <Error message={msg} />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => refetch?.()}
          className="flex items-center gap-2 rounded-full"
        >
          <AlertTriangle className="w-4 h-4" />
          Retry
        </Button>
      </div>
    );
  }

  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const total = projects.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 md:px-12 lg:px-20 flex flex-col gap-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <p className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">
            My Work
          </p>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight flex items-center gap-3">
              <Laptop className="w-8 h-8 text-primary" />
              Projects
            </h1>
            <span className="px-3 py-1 rounded-full border border-border bg-muted/50 text-sm font-mono text-muted-foreground">
              {total}
            </span>
          </div>
          <div className="h-px w-full bg-border mt-2" />
        </motion.div>

        {/* Empty state */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl border border-dashed border-border text-center"
          >
            <FolderOpen className="w-14 h-14 text-muted-foreground/40" />
            <p className="text-muted-foreground font-light">No projects available yet.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p._id || p.slug} project={p} index={i} />
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

export default ProjectPage;
