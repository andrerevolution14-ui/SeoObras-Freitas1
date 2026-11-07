"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Droplets,
  Zap,
  CloudRain,
  Paintbrush,
  Layers,
  ChefHat,
  Bath,
  Building,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  User,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { FORM_SERVICES, FORM_PARISHES, URGENCY_OPTIONS, CONTRACTOR_INFO } from "@/lib/constants";

const serviceIcons: Record<string, React.ReactNode> = {
  Home: <Home size={22} />,
  Droplets: <Droplets size={22} />,
  Zap: <Zap size={22} />,
  CloudRain: <CloudRain size={22} />,
  Paintbrush: <Paintbrush size={22} />,
  Layers: <Layers size={22} />,
  ChefHat: <ChefHat size={22} />,
  Bath: <Bath size={22} />,
  Building: <Building size={22} />,
};

export const BUDGET_OPTIONS = [
  "Ainda a avaliar / A definir com orçamento",
  "Até 5.000 € (intervenção pontual / renovação simples)",
  "5.000 € a 15.000 € (casa de banho ou cozinha completa)",
  "15.000 € a 35.000 € (remodelação de apartamento T1/T2)",
  "35.000 € a 70.000 € (remodelação integral T3/T4)",
  "Mais de 70.000 € (moradia / reabilitação profunda)",
];

interface FormData {
  service: string;
  urgency: string;
  parish: string;
  approxSize: string;
  budgetRange: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  needsCredit: boolean;
  photo: File | null;
}

const initialFormData: FormData = {
  service: "",
  urgency: "",
  parish: "",
  approxSize: "",
  budgetRange: BUDGET_OPTIONS[0],
  name: "",
  phone: "",
  email: "",
  description: "",
  needsCredit: false,
  photo: null,
};

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

interface HeroMultiStepFormProps {
  initialService?: string;
  initialParish?: string;
}

export function HeroMultiStepForm({ initialService = "", initialParish = "" }: HeroMultiStepFormProps = {}) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => ({
    ...initialFormData,
    service: initialService,
    parish: initialParish,
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedCustomer, setSubmittedCustomer] = useState<{ name: string; phone: string }>({ name: "", phone: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = async () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Nome obrigatório";
    if (!formData.phone.trim() || formData.phone.length < 9) newErrors.phone = "Telefone inválido (mínimo 9 dígitos)";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors as any);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      let utmSource = "";
      let utmMedium = "";
      let utmCampaign = "";
      let paginaOrigem = "";

      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        utmSource = urlParams.get("utm_source") || "";
        utmMedium = urlParams.get("utm_medium") || "";
        utmCampaign = urlParams.get("utm_campaign") || "";
        paginaOrigem = window.location.pathname;
      }

      const payload = {
        nome: formData.name.trim(),
        telefone: formData.phone.trim(),
        email: formData.email.trim(),
        localidade: formData.parish,
        servico: formData.service,
        urgencia: formData.urgency,
        orcamentoEstimado: formData.budgetRange,
        dimensaoAprox: formData.approxSize.trim(),
        mensagem: formData.description.trim(),
        ajudaCredito: formData.needsCredit ? "Sim (Solicita Intermediação 100% Gratuita)" : "Não",
        utmSource,
        utmMedium,
        utmCampaign,
        paginaOrigem,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Disparar conversão Google Ads (Enviar formulário de leads)
        if (typeof window !== "undefined") {
          const win = window as unknown as { gtag_report_conversion?: () => boolean };
          if (typeof win.gtag_report_conversion === "function") {
            win.gtag_report_conversion();
          }
        }

        setSubmittedCustomer({ name: formData.name, phone: formData.phone });
        setIsSubmitted(true);
        setFormData(initialFormData);
        setErrors({});
      } else {
        setErrorMessage(data.error || "Ocorreu um erro ao enviar o pedido. Por favor tente novamente.");
      }
    } catch (err) {
      console.error("Erro na submissão:", err);
      setErrorMessage("Erro de ligação ao servidor. Por favor verifique a sua ligação ou contacte por telefone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    "Qual o tipo de serviço?",
    "Qual a urgência da obra?",
    "Qual a sua localização em Aveiro?",
    "Dados para contacto",
  ];

  const progressPercent = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card on-light"
        style={{
          borderRadius: "2px",
          padding: "2.5rem 1.75rem",
          textAlign: "center",
          boxShadow: "0 40px 80px -30px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "#0A0A0A",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "none",
          }}
        >
          <CheckCircle size={30} color="#ffffff" strokeWidth={1.5} />
        </div>
        <h3 style={{ color: "#0A0A0A", fontWeight: 800, fontSize: "1.375rem", marginBottom: "0.5rem" }}>
          Pedido Recebido com Sucesso!
        </h3>
        <p style={{ color: "#525252", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          Obrigado, <strong>{submittedCustomer.name || "estimado cliente"}</strong>! O Jorge Freitas recebeu a sua solicitação diretamente no Telegram e entrará em contacto para o número{" "}
          <strong>{submittedCustomer.phone}</strong>.
        </p>
        <div
          style={{
            background: "rgba(128, 128, 128, 0.12)",
            border: "1px solid rgba(128, 128, 128, 0.3)",
            borderRadius: "2px",
            padding: "0.875rem",
            marginBottom: "1.25rem",
          }}
        >
          <p style={{ color: "#525252", fontSize: "0.8125rem", fontWeight: 700 }}>
            Notificação enviada em tempo real. Resposta garantida até 12 horas com orçamento transparente e preço justo.
          </p>
        </div>
        <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          <Phone size={18} />
          Ligar Direto: {CONTRACTOR_INFO.phoneDisplay}
        </a>
      </motion.div>
    );
  }

  return (
    <div
      id="hero-form"
      className="glass-card"
      style={{
        borderRadius: "2px",
        overflow: "hidden",
        boxShadow: "0 40px 80px -30px rgba(0,0,0,0.55)",
      }}
    >
      {/* Form Header */}
      <div
        className="hero-form-header"
        style={{
          background: "#0A0A0A",
          padding: "1.5rem 1.75rem 1.375rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Passo {step} de {TOTAL_STEPS}
          </span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Sem compromisso
          </span>
        </div>

        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <h3 style={{ color: "#ffffff", fontWeight: 500, fontSize: "1.375rem", marginTop: "1.125rem", letterSpacing: "-0.02em" }}>
          {stepTitles[step - 1]}
        </h3>
      </div>

      {/* Form Body */}
      <div className="hero-form-body" style={{ padding: "1.25rem 1.5rem", minHeight: "260px", position: "relative", overflow: "hidden" }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* STEP 1: Service selection */}
            {step === 1 && (
              <div className="form-service-grid">
                {FORM_SERVICES.map((service) => {
                  const isSelected = formData.service === service.slug;
                  return (
                    <button
                      key={service.slug}
                      type="button"
                      id={`service-btn-${service.slug}`}
                      onClick={() => {
                        setFormData((d) => ({ ...d, service: service.slug }));
                      }}
                      style={{
                        padding: "0.8rem 0.75rem",
                        border: `1.5px solid ${isSelected ? "#0A0A0A" : "#DCDCDA"}`,
                        borderRadius: "2px",
                        background: isSelected ? "#F2F2F0" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.55rem",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                        minWidth: 0,
                        maxWidth: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          color: isSelected ? "#0A0A0A" : "#6B6B6B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {serviceIcons[service.icon]}
                      </span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          color: "#0A0A0A",
                          lineHeight: 1.2,
                          flex: 1,
                          minWidth: 0,
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        {service.shortTitle}
                      </span>
                      {isSelected && (
                        <CheckCircle size={15} style={{ color: "#525252", flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 2: Urgency */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {URGENCY_OPTIONS.map((opt) => {
                  const isSelected = formData.urgency === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      id={`urgency-btn-${opt.id}`}
                      onClick={() => setFormData((d) => ({ ...d, urgency: opt.id }))}
                      style={{
                        padding: "0.875rem 1rem",
                        border: `1.5px solid ${isSelected ? "#0A0A0A" : "#DCDCDA"}`,
                        borderRadius: "2px",
                        background: isSelected ? "#F2F2F0" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.875rem",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                    >
                                            <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0A0A0A" }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>
                          {opt.description}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle size={18} style={{ color: "#525252", flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 3: Localização & Estimativa */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "0.35rem" }}>
                    Freguesia / Concelho da Obra *
                  </label>
                  <div style={{ position: "relative" }}>
                    <MapPin
                      size={16}
                      style={{
                        position: "absolute",
                        left: "0.875rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#6B6B6B",
                        pointerEvents: "none",
                      }}
                    />
                    <select
                      id="parish-select"
                      value={formData.parish}
                      onChange={(e) => setFormData((d) => ({ ...d, parish: e.target.value }))}
                      className="form-input"
                      style={{ paddingLeft: "2.5rem", appearance: "none" }}
                    >
                      <option value="">Escolha a freguesia...</option>
                      {FORM_PARISHES.map((parish) => (
                        <option key={parish.slug} value={parish.name}>
                          {parish.name}
                        </option>
                      ))}
                      <option value="Outro Concelho Vizinho">Outro Concelho Vizinho (Ílhavo, Águeda, Estarreja, Vagos)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "0.35rem" }}>
                    Intervalo de Investimento Previsto
                  </label>
                  <select
                    id="budget-select"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData((d) => ({ ...d, budgetRange: e.target.value }))}
                    className="form-input"
                    style={{ appearance: "none" }}
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#525252", marginBottom: "0.35rem" }}>
                    Dimensão aproximada / Tipologia (opcional)
                  </label>
                  <input
                    id="size-input"
                    type="text"
                    placeholder="Ex: 15 m², Apartamento T2, Moradia 2 pisos..."
                    value={formData.approxSize}
                    onChange={(e) => setFormData((d) => ({ ...d, approxSize: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.875rem",
                    background: "rgba(128, 128, 128, 0.08)",
                    border: "1px solid rgba(128, 128, 128, 0.25)",
                    borderRadius: "2px",
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "flex-start",
                  }}
                >
                  <AlertTriangle size={16} style={{ color: "#525252", flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ fontSize: "0.75rem", color: "#6B6B6B", lineHeight: 1.5 }}>
                    Cobrimos todo o município de Aveiro. Se preferir ligar diretamente:{" "}
                    <a href={`tel:${CONTRACTOR_INFO.phone}`} style={{ color: "#525252", fontWeight: 700 }}>
                      {CONTRACTOR_INFO.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: Contact details */}
            {step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <div style={{ position: "relative" }}>
                    <User
                      size={15}
                      style={{
                        position: "absolute",
                        left: "0.875rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#6B6B6B",
                      }}
                    />
                    <input
                      id="form-name"
                      type="text"
                      placeholder="O seu nome completo *"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((d) => ({ ...d, name: e.target.value }));
                        setErrors((e2) => ({ ...e2, name: "" }));
                      }}
                      className="form-input"
                      style={{ paddingLeft: "2.5rem", borderColor: errors.name ? "#ef4444" : undefined }}
                    />
                  </div>
                  {errors.name && (
                    <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.2rem" }}>{errors.name}</p>
                  )}
                </div>

                <div>
                  <div style={{ position: "relative" }}>
                    <Phone
                      size={15}
                      style={{
                        position: "absolute",
                        left: "0.875rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#6B6B6B",
                      }}
                    />
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="Telefone (ex: 961 455 997) *"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((d) => ({ ...d, phone: e.target.value }));
                        setErrors((e2) => ({ ...e2, phone: "" }));
                      }}
                      className="form-input"
                      style={{ paddingLeft: "2.5rem", borderColor: errors.phone ? "#ef4444" : undefined }}
                    />
                  </div>
                  {errors.phone && (
                    <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.2rem" }}>{errors.phone}</p>
                  )}
                </div>

                <textarea
                  id="form-description"
                  placeholder="Descreva brevemente a obra ou reparação... (opcional)"
                  value={formData.description}
                  onChange={(e) => setFormData((d) => ({ ...d, description: e.target.value }))}
                  className="form-input"
                  rows={2}
                  style={{ resize: "vertical" }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.625rem",
                    border: "1.5px dashed #DCDCDA",
                    borderRadius: "2px",
                    background: "#F7F7F5",
                    color: "#525252",
                    cursor: "pointer",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    transition: "all 0.15s",
                  }}
                >
                  <Upload size={14} />
                  {formData.photo ? formData.photo.name : "Anexar fotografia da área (opcional)"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData((d) => ({ ...d, photo: e.target.files![0] }));
                    }
                  }}
                />

                {/* Opção de Apoio a Crédito / Financiamento */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                    background: formData.needsCredit ? "rgba(128, 128, 128, 0.12)" : "#F8F8F7",
                    border: formData.needsCredit ? "1px solid #0A0A0A" : "1px solid #E5E5E3",
                    borderRadius: "2px",
                    padding: "0.625rem 0.75rem",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <input
                    type="checkbox"
                    id="form-needs-credit"
                    checked={formData.needsCredit}
                    onChange={(e) => setFormData((d) => ({ ...d, needsCredit: e.target.checked }))}
                    style={{ marginTop: "2px", accentColor: "#0A0A0A", width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <div style={{ fontSize: "0.75rem", color: "#1F1F1F", lineHeight: 1.45 }}>
                    <span style={{ fontWeight: 700, color: "#0A0A0A", display: "block" }}>
                      Precisa de crédito para a obra? (100% grátis)
                    </span>
                    <span style={{ color: "#6B6B6B" }}>
                      Simular financiamento com o nosso parceiro de intermediação autorizado. Sem custos nem compromisso.
                    </span>
                  </div>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Form Navigation */}
      <div
        className="hero-form-footer"
        style={{
          padding: "1rem 1.5rem 1.25rem",
          borderTop: "1px solid #E5E5E3",
          display: "flex",
          gap: "0.625rem",
          alignItems: "center",
        }}
      >
        {step > 1 && (
          <button
            type="button"
            onClick={goPrev}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.625rem 1rem",
              background: "transparent",
              border: "1px solid #DCDCDA",
              borderRadius: "2px",
              color: "#525252",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={15} />
            Voltar
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            id={`form-next-step-${step}`}
            onClick={() => {
              if (step === 1 && !formData.service) return;
              if (step === 2 && !formData.urgency) return;
              if (step === 3 && !formData.parish) return;
              goNext();
            }}
            className="btn-primary"
            style={{
              flex: 1,
              justifyContent: "center",
              opacity:
                (step === 1 && !formData.service) ||
                (step === 2 && !formData.urgency) ||
                (step === 3 && !formData.parish)
                  ? 0.5
                  : 1,
              cursor:
                (step === 1 && !formData.service) ||
                (step === 2 && !formData.urgency) ||
                (step === 3 && !formData.parish)
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Continuar
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            id="form-submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center" }}
          >
            {isSubmitting ? "A enviar..." : <>Solicitar Orçamento Grátis <ArrowRight size={16} /></>}
          </button>
        )}
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.725rem",
          color: "#6B6B6B",
          paddingBottom: "1rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        Dados protegidos nos termos do RGPD. Consulte a nossa{" "}
        <a href="/privacidade" style={{ color: "#525252", textDecoration: "underline" }}>
          Política de Privacidade
        </a>
        . Primeira estimativa técnica em até 12 a 24 horas.
      </p>
    </div>
  );
}
