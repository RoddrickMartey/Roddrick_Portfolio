import { Home, FolderOpen, User, Mail } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import ThemeToggle from "./DarkModeButton";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";

function getInitials(fullName = "") {
  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase())
    .join("·");
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useUserDetailsStore();

  const initials = getInitials(data?.fullName);

  const nav = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <User className="w-4 h-4" /> },
    { name: "Projects", path: "/projects", icon: <FolderOpen className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4 pt-4">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-md px-4 py-2.5 shadow-lg shadow-black/5">

        {/* Initials logo */}
        <button
          onClick={() => navigate("/")}
          className="text-sm font-mono font-semibold tracking-widest text-primary/80 uppercase hover:text-primary transition-colors flex-shrink-0"
        >
          {initials}
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {nav.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}

export default Header;
