"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      if (username.trim().toLowerCase() === "jorge" && password.trim().toLowerCase() === "matilde") {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("jorge_auth", "true");
          window.location.href = "/admin";
        }
      } else {
        setError("Utilizador ou palavra-passe incorretos.");
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 3rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "0.5rem",
          padding: "2.25rem 2rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          border: "1.5px solid #e2e8f0",
        }}
      >
        {/* Logo & Title */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <img
            src="/logo1s.png"
            alt="Freitas Renovações LDA"
            style={{ height: "48px", width: "auto", margin: "0 auto 0.75rem", objectFit: "contain" }}
          />
          <h1 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#022c22", marginBottom: "0.25rem" }}>
            Área de Trabalho
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.8125rem" }}>
            Acesso reservado à gestão de contactos e orçamentos
          </p>
        </div>

        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#dc2626",
              padding: "0.625rem 0.875rem",
              borderRadius: "0.375rem",
              fontSize: "0.8125rem",
              marginBottom: "1rem",
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "0.375rem" }}>
              Utilizador
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={16}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <input
                id="login-username"
                type="text"
                placeholder="Nome de utilizador"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "2.5rem" }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "0.375rem" }}>
              Palavra-passe
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <input
                id="login-password"
                type="password"
                placeholder="Palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "2.5rem" }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            {isSubmitting ? "A autenticar..." : "Entrar na Área de Trabalho"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: "1px solid #f1f5f9", paddingTop: "1rem" }}>
          <Link href="/" style={{ fontSize: "0.8125rem", color: "#64748b", textDecoration: "none", fontWeight: 600 }}>
            ← Voltar ao site principal
          </Link>
        </div>
      </div>
    </div>
  );
}
