"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  CheckSquare,
  Square,
  Clock,
  MapPin,
  RefreshCw,
  LogOut,
  Search,
  FileText,
} from "lucide-react";
import { StoredLead } from "@/app/api/lead/route";
import { SERVICES, PARISHES } from "@/lib/constants";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "contacted">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = document.cookie.includes("jorge_auth=true");
      if (auth) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setIsAuthenticated(false);
        router.push("/login");
      }
    }
  }, [router]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lead");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Erro ao carregar leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleContacted = async (leadId: string, currentStatus: boolean) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, contacted: !currentStatus } : l))
    );

    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, contacted: !currentStatus }),
      });
      if (!res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, contacted: currentStatus } : l))
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar estado:", err);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      document.cookie = "jorge_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.push("/login");
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div style={{ minHeight: "100vh", background: "#022c22", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        <p>A verificar autenticação...</p>
      </div>
    );
  }

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus === "pending" && lead.contacted) return false;
    if (filterStatus === "contacted" && !lead.contacted) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.includes(q);
      const matchParish = (lead.parish || "").toLowerCase().includes(q);
      const matchService = (lead.service || "").toLowerCase().includes(q);
      return matchName || matchPhone || matchParish || matchService;
    }
    return true;
  });

  const totalCount = leads.length;
  const pendingCount = leads.filter((l) => !l.contacted).length;
  const contactedCount = leads.filter((l) => l.contacted).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "4rem" }}>
      {/* Admin Top Navigation */}
      <header
        style={{
          background: "#022c22",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="section-container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img
              src="/logo1s.png"
              alt="Freitas Renovações LDA"
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
            />
            <div>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.0625rem" }}>
                Área de Trabalho
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
                Gestão de Contactos & Orçamentos
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={fetchLeads}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                padding: "0.5rem 0.875rem",
                borderRadius: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RefreshCw size={14} />
              <span>Atualizar</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                padding: "0.5rem 0.875rem",
                borderRadius: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Content */}
      <div className="section-container" style={{ paddingTop: "2rem" }}>
        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "0.5rem", border: "1.5px solid #e2e8f0" }}>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Total de Pedidos</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#022c22", marginTop: "0.25rem" }}>{totalCount}</div>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "0.5rem", border: "1.5px solid #fde68a" }}>
            <div style={{ fontSize: "0.75rem", color: "#d97706", fontWeight: 700, textTransform: "uppercase" }}>Pendentes de Contacto</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#d97706", marginTop: "0.25rem" }}>{pendingCount}</div>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "0.5rem", border: "1.5px solid #bbf7d0" }}>
            <div style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700, textTransform: "uppercase" }}>Já Contactados</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#16a34a", marginTop: "0.25rem" }}>{contactedCount}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            border: "1.5px solid #e2e8f0",
            marginBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Status Tabs */}
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {[
              { id: "all", label: `Todos (${totalCount})` },
              { id: "pending", label: `Pendentes (${pendingCount})` },
              { id: "contacted", label: `Contactados (${contactedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id as any)}
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  border: filterStatus === tab.id ? "1.5px solid #f59e0b" : "1.5px solid #cbd5e1",
                  background: filterStatus === tab.id ? "rgba(251, 191, 36, 0.12)" : "#ffffff",
                  color: filterStatus === tab.id ? "#022c22" : "#475569",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", minWidth: "220px", flex: 1, maxWidth: "320px" }}>
            <Search
              size={15}
              style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}
            />
            <input
              type="text"
              placeholder="Pesquisar por nome, telefone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "2.25rem", fontSize: "0.8125rem" }}
            />
          </div>
        </div>

        {/* Lead Cards List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#64748b" }}>
            Carregando pedidos...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              padding: "3rem 1.5rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <FileText size={36} style={{ color: "#cbd5e1", margin: "0 auto 0.75rem" }} />
            <h3 style={{ fontWeight: 700, color: "#022c22", marginBottom: "0.25rem" }}>
              Nenhum pedido encontrado
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Quando os clientes preencherem o formulário no site, os pedidos aparecerão aqui por ordem de entrada.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filteredLeads.map((lead) => {
              const serviceObj = SERVICES.find((s) => s.slug === lead.service);
              const parishObj = PARISHES.find((p) => p.slug === lead.parish);
              const formattedDate = new Date(lead.createdAt).toLocaleString("pt-PT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={lead.id}
                  style={{
                    background: "#ffffff",
                    border: `1.5px solid ${lead.contacted ? "#e2e8f0" : "#f59e0b"}`,
                    borderRadius: "0.5rem",
                    padding: "1.25rem 1.5rem",
                    boxShadow: lead.contacted ? "none" : "0 4px 15px rgba(245, 158, 11, 0.12)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    {/* Customer Header */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem" }}>
                        <h3 style={{ fontWeight: 800, fontSize: "1.125rem", color: "#022c22" }}>
                          {lead.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() => toggleContacted(lead.id, lead.contacted)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.375rem",
                            padding: "0.25rem 0.625rem",
                            borderRadius: "0.25rem",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            border: "none",
                            cursor: "pointer",
                            background: lead.contacted ? "rgba(34, 197, 94, 0.12)" : "rgba(251, 191, 36, 0.18)",
                            color: lead.contacted ? "#15803d" : "#d97706",
                          }}
                        >
                          {lead.contacted ? (
                            <>
                              <CheckSquare size={14} />
                              <span>Já Contactado</span>
                            </>
                          ) : (
                            <>
                              <Square size={14} />
                              <span>Marcar como Contactado</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", color: "#64748b", fontSize: "0.8125rem" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Clock size={13} /> {formattedDate}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <MapPin size={13} style={{ color: "#f59e0b" }} /> {parishObj ? parishObj.name : lead.parish}
                        </span>
                      </div>
                    </div>

                    {/* Quick Call Action */}
                    <a
                      href={`tel:${lead.phone}`}
                      className="btn-primary"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                    >
                      <Phone size={15} />
                      <span>Ligar ({lead.phone})</span>
                    </a>
                  </div>

                  {/* Details Grid */}
                  <div
                    style={{
                      marginTop: "1rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid #f1f5f9",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "0.875rem",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.6875rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                        Serviço Pretendido
                      </span>
                      <div style={{ fontWeight: 700, color: "#022c22", fontSize: "0.9375rem" }}>
                        {serviceObj ? serviceObj.title : lead.service}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: "0.6875rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                        Urgência Escolhida
                      </span>
                      <div style={{ fontWeight: 700, color: "#022c22", fontSize: "0.9375rem" }}>
                        {lead.urgency === "emergency" && "🔴 Urgência / Imediato"}
                        {lead.urgency === "this-week" && "🟡 Esta Semana"}
                        {lead.urgency === "planned" && "🟢 Planeado para Breve"}
                        {!["emergency", "this-week", "planned"].includes(lead.urgency) && lead.urgency}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {lead.description && (
                    <div style={{ marginTop: "0.875rem", background: "#f8fafc", padding: "0.75rem 1rem", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.6875rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>
                        Descrição do Cliente
                      </span>
                      <p style={{ color: "#334155", fontSize: "0.875rem", lineHeight: 1.5 }}>
                        {lead.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
