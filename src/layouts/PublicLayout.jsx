// PublicLayout.jsx
import { Outlet } from "react-router";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import Header from "@/components/Header";

export default function PublicLayout() {
  const { isError, isLoading, error } = useUserDetailsStore();

  if (isLoading) return <Loading />;

  if (isError) {
    const msg =
      error?.response?.data?.message ||
      "Failed to load. Check internet connection or reload.";
    return <Error message={msg} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">

      {/* Grid — subtle, doesn't compete with text */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Orbs — pushed to corners, low opacity so text stays readable */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>

        {/* Teal — top left corner */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #14b8a6 0%, transparent 65%)",
            opacity: 0.18,
            top: "-200px",
            left: "-200px",
            animation: "drift1 8s ease-in-out infinite alternate",
          }}
        />

        {/* Indigo — bottom right corner */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #6366f1 0%, transparent 65%)",
            opacity: 0.18,
            bottom: "-200px",
            right: "-200px",
            animation: "drift2 10s ease-in-out infinite alternate",
          }}
        />

        {/* Amber — top right */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #f59e0b 0%, transparent 65%)",
            opacity: 0.12,
            top: "-100px",
            right: "-100px",
            animation: "drift3 12s ease-in-out infinite alternate",
          }}
        />

        {/* Purple — bottom left */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #a855f7 0%, transparent 65%)",
            opacity: 0.12,
            bottom: "-100px",
            left: "-100px",
            animation: "drift4 14s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Dark overlay in the CENTER so text in the middle is always readable */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          background: "radial-gradient(ellipse at center, hsl(var(--background) / 0.55) 0%, transparent 70%)",
        }}
      />

      <style>{`
        @keyframes drift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(60px, 80px) scale(1.15); }
        }
        @keyframes drift2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-60px, -80px) scale(1.15); }
        }
        @keyframes drift3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-50px, 60px) scale(1.1); }
        }
        @keyframes drift4 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(50px, -60px) scale(1.1); }
        }
      `}</style>

      {/* Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <Outlet />
      </div>

    </div>
  );
}
