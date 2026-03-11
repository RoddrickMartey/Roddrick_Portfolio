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
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* Grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "#14b8a6",
            opacity: 0.25,
            filter: "blur(60px)",
            top: "-100px",
            left: "-100px",
            animation: "drift1 8s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "#6366f1",
            opacity: 0.25,
            filter: "blur(60px)",
            bottom: "-100px",
            right: "-100px",
            animation: "drift2 10s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "#f59e0b",
            opacity: 0.2,
            filter: "blur(50px)",
            top: "40%",
            left: "40%",
            animation: "drift3 12s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, hsl(var(--background)) 90%)",
        }}
      />

      <style>{`
        @keyframes drift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(80px, 100px) scale(1.2); }
        }
        @keyframes drift2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-80px, -100px) scale(1.2); }
        }
        @keyframes drift3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-60px, 80px) scale(1.15); }
        }
      `}</style>

      <Header />
      <Outlet />
    </div>
  );
}
