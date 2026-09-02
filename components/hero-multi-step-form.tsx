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
import { SERVICES, PARISHES, URGENCY_OPTIONS, CONTRACTOR_INFO } from "@/lib/constants";

const serviceIcons: Record<string, React.ReactNode> = {
  Home: <Home size={22} />,
  Droplets: <Droplets size={22} />,
  Zap: <Zap size={22} />,
  CloudRain: <CloudRain size={22} />,
  Paintbrush: <Paintbrush size={22} />,
  Layers: <Layers size={22} />,
};

interface FormData {
  service: string;
  urgency: string;
  parish: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  photo: File | null;
}

const initialFormData: FormData = {
  service: "",
  urgency: "",
  parish: "",
  name: "",
  phone: "",
  email: "",
  description: "",
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

export function HeroMultiStepForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
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
      const payload = {
        nome: formData.name.trim(),
        telefone: formData.phone.trim(),
        email: formData.email.trim(),
        localidade: formData.parish,
        servico: formData.service,
        mensagem: formData.description.trim(),
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
        className="glass-card"
        style={{
          borderRadius: "0.5rem",
          padding: "2.5rem 1.75rem",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.35)",
          }}
        >
          <CheckCircle size={32} color="#ffffff" />
        </div>
        <h3 style={{ color: "#071a3a", fontWeight: 800, fontSize: "1.375rem", marginBottom: "0.5rem" }}>
          Pedido Recebido com Sucesso!
        </h3>
        <p style={{ color: "#475569", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          Obrigado, <strong>{submittedCustomer.name || "estimado cliente"}</strong>! O Jorge Freitas recebeu a sua solicitação diretamente no Telegram e entrará em contacto para o número{" "}
          <strong>{submittedCustomer.phone}</strong>.
        </p>
        <div
          style={{
            background: "rgba(251, 191, 36, 0.12)",
            border: "1px solid rgba(251, 191, 36, 0.3)",
            borderRadius: "0.375rem",
            padding: "0.875rem",
            marginBottom: "1.25rem",
          }}
        >
          <p style={{ color: "#d97706", fontSize: "0.8125rem", fontWeight: 700 }}>
            🔔 Notificação enviada em tempo real. Resposta garantida até 12 horas com orçamento transparente e preço justo.
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
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      }}
    >
      {/* Form Header */}
      <div
        style={{
          background: "#071a3a",
          padding: "1.25rem 1.5rem 1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem", fontWeight: 600 }}>
            Passo {step} de {TOTAL_STEPS}
          </span>
          <span
            style={{
              background: "rgba(251, 191, 36, 0.18)",
              color: "#fbbf24",
              fontSize: "0.6875rem",
              fontWeight: 800,
              padding: "0.2rem 0.625rem",
              borderRadius: "0.25rem",
              border: "1px solid rgba(251, 191, 36, 0.35)",
            }}
          >
            Preço Justo & Sem Compromisso
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

        <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.0625rem", marginTop: "0.875rem" }}>
          {stepTitles[step - 1]}
        </h3>
      </div>

      {/* Form Body */}
      <div style={{ padding: "1.25rem 1.5rem", minHeight: "260px", position: "relative", overflow: "hidden" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.625rem" }}>
                {SERVICES.map((service) => {
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
                        padding: "0.875rem 0.75rem",
                        border: `1.5px solid ${isSelected ? "#f59e0b" : "#cbd5e1"}`,
                        borderRadius: "0.375rem",
                        background: isSelected ? "rgba(251, 191, 36, 0.1)" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.375rem",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ color: isSelected ? "#d97706" : "#475569" }}>
                        {serviceIcons[service.icon]}
                      </span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.8125rem",
                          color: isSelected ? "#071a3a" : "#334155",
                        }}
                      >
                        {service.shortTitle}
                      </span>
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
                        border: `1.5px solid ${isSelected ? "#f59e0b" : "#cbd5e1"}`,
                        borderRadius: "0.375rem",
                        background: isSelected ? "rgba(251, 191, 36, 0.1)" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.875rem",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ fontSize: "1.25rem" }}>{opt.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#071a3a" }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          {opt.description}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle size={18} style={{ color: "#d97706", flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 3: Parish */}
            {step === 3 && (
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
                  Selecione a sua Freguesia
                </label>
                <div style={{ position: "relative" }}>
                  <MapPin
                    size={16}
                    style={{
                      position: "absolute",
                      left: "0.875rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#64748b",
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
                    {PARISHES.map((parish) => (
                      <option key={parish.slug} value={parish.slug}>
                        {parish.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.875rem",
                    background: "rgba(251, 191, 36, 0.08)",
                    border: "1px solid rgba(251, 191, 36, 0.25)",
                    borderRadius: "0.375rem",
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "flex-start",
                  }}
                >
                  <AlertTriangle size={16} style={{ color: "#d97706", flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>
                    Cobrimos todo o município de Aveiro. Se preferir ligar diretamente:{" "}
                    <a href={`tel:${CONTRACTOR_INFO.phone}`} style={{ color: "#d97706", fontWeight: 700 }}>
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
                        color: "#64748b",
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
                        color: "#64748b",
                      }}
                    />
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="Contacto telefónico (ex: 961 455 997) *"
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
                    border: "1.5px dashed #cbd5e1",
                    borderRadius: "0.375rem",
                    background: "#f8fafc",
                    color: "#475569",
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
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Form Navigation */}
      <div
        style={{
          padding: "1rem 1.5rem 1.25rem",
          borderTop: "1px solid #e2e8f0",
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
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "0.375rem",
              color: "#475569",
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
            {isSubmitting ? "A enviar..." : "Solicitar Orçamento Grátis →"}
          </button>
        )}
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.725rem",
          color: "#64748b",
          paddingBottom: "1rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        🔒 Dados confidenciais. Resposta garantida até 12 horas.
      </p>
    </div>
  );
}
