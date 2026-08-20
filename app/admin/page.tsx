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
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Admin Top Navigation */}
      <header className="bg-emerald-950 border-b border-white/10 sticky top-0 z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo1s.png" alt="Freitas Renovações LDA" className="h-9 w-auto object-contain" />
            <div>
              <div className="text-white font-extrabold text-lg leading-tight">Área de Trabalho</div>
              <div className="text-white/60 text-xs">Gestão de Contactos & Orçamentos</div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={fetchLeads}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/10 border border-white/15 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              <RefreshCw size={16} />
              <span>Atualizar</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/15 border border-red-500/30 text-red-300 py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-500/25 transition-colors"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total de Pedidos</div>
            <div className="text-3xl font-black text-emerald-950 mt-1">{totalCount}</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-amber-200 shadow-sm">
            <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">Pendentes de Contacto</div>
            <div className="text-3xl font-black text-amber-600 mt-1">{pendingCount}</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-green-200 shadow-sm">
            <div className="text-xs text-green-700 font-bold uppercase tracking-wider">Já Contactados</div>
            <div className="text-3xl font-black text-green-600 mt-1">{contactedCount}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: `Todos (${totalCount})` },
              { id: "pending", label: `Pendentes (${pendingCount})` },
              { id: "contacted", label: `Contactados (${contactedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id as any)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-bold border transition-colors ${
                  filterStatus === tab.id
                    ? "border-amber-500 bg-amber-500/10 text-emerald-950"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Lead Cards List */}
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            Carregando pedidos...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white py-12 px-6 rounded-lg border border-slate-200 text-center shadow-sm">
            <FileText size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-emerald-950 text-lg mb-2">Nenhum pedido encontrado</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Quando os clientes preencherem o formulário no site, os pedidos aparecerão aqui por ordem de entrada.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
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
                  className={`bg-white rounded-lg p-5 sm:p-6 transition-all border-2 ${
                    lead.contacted
                      ? "border-slate-200"
                      : "border-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.12)]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    {/* Customer Header */}
                    <div className="w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <h3 className="font-extrabold text-xl text-emerald-950">
                          {lead.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() => toggleContacted(lead.id, lead.contacted)}
                          className={`inline-flex items-center self-start gap-1.5 px-3 py-1 rounded text-xs font-bold transition-colors ${
                            lead.contacted
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          }`}
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

                      <div className="flex flex-wrap gap-3 text-slate-500 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} /> {formattedDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-amber-500" /> {parishObj ? parishObj.name : lead.parish}
                        </span>
                      </div>
                    </div>

                    {/* Quick Call Action */}
                    <a
                      href={`tel:${lead.phone}`}
                      className="w-full sm:w-auto btn-primary flex items-center justify-center py-2.5 px-5 text-sm"
                    >
                      <Phone size={16} />
                      <span>Ligar ({lead.phone})</span>
                    </a>
                  </div>

                  {/* Details Grid */}
                  <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Serviço Pretendido
                      </span>
                      <div className="font-bold text-emerald-950 text-base">
                        {serviceObj ? serviceObj.title : lead.service}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Urgência Escolhida
                      </span>
                      <div className="font-bold text-emerald-950 text-base">
                        {lead.urgency === "emergency" && "🔴 Urgência / Imediato"}
                        {lead.urgency === "this-week" && "🟡 Esta Semana"}
                        {lead.urgency === "planned" && "🟢 Planeado para Breve"}
                        {!["emergency", "this-week", "planned"].includes(lead.urgency) && lead.urgency}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {lead.description && (
                    <div className="mt-4 bg-slate-50 p-4 rounded-md border border-slate-200">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                        Descrição do Cliente
                      </span>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
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
