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

      {/* Animated grid background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--primary-rgb, 99,102,241) / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary-rgb, 99,102,241) / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
            animation: "drift1 18s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[90px]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            bottom: "-10%",
            right: "-10%",
            animation: "drift2 22s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            top: "40%",
            left: "50%",
            animation: "drift3 26s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Vignette edges */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, hsl(var(--background)) 100%)",
        }}
      />

      <style>{`
        @keyframes drift1 {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(60px, 80px) scale(1.15); }
        }
        @keyframes drift2 {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(-80px, -60px) scale(1.2); }
        }
        @keyframes drift3 {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(-50px, 70px) scale(1.1); }
        }
      `}</style>

      <Header />
      <Outlet />
    </div>
  );
}
