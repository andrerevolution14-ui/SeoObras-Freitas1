import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LeadSchema = z.object({
  service: z.string().min(1, "Serviço obrigatório"),
  urgency: z.string().min(1, "Urgência obrigatória"),
  parish: z.string().min(1, "Localização obrigatória"),
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(9, "Telefone inválido"),
  description: z.string().optional(),
});

export interface StoredLead {
  id: string;
  createdAt: string;
  service: string;
  urgency: string;
  parish: string;
  name: string;
  phone: string;
  description?: string;
  contacted: boolean;
  contactedAt?: string;
}

// Urgency label map
const URGENCY_LABELS: Record<string, string> = {
  urgente: "🚨 URGENTE (hoje/amanhã)",
  "esta-semana": "⚡ Esta semana",
  "este-mes": "📅 Este mês",
  "sem-pressa": "🕐 Sem pressa",
};

// POST — New lead submission → sends email via Resend
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const rawData = {
      service: (formData.get("service") as string) || "",
      urgency: (formData.get("urgency") as string) || "",
      parish: (formData.get("parish") as string) || "",
      name: (formData.get("name") as string) || "",
      phone: (formData.get("phone") as string) || "",
      description: (formData.get("description") as string) || "",
    };

    const result = LeadSchema.safeParse(rawData);
    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const lead = result.data;
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const createdAt = new Date().toLocaleString("pt-PT", { timeZone: "Europe/Lisbon" });
    const urgencyLabel = URGENCY_LABELS[lead.urgency] || lead.urgency;

    console.log("📥 Nova Lead Recebida:", { ...lead, id: leadId, createdAt });

    // Send email via Resend SDK
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.LEAD_EMAIL_TO || "Freitasrenovacoes@gmail.com";

    const { data, error } = await resend.emails.send({
      from: `Freitas Renovações <${fromEmail}>`,
      to: [toEmail],
      subject: `🏠 Novo Pedido: ${lead.service} em ${lead.parish} — ${lead.name}`,
      html: `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#071a3a,#0f2d5e);padding:28px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">🏠 Novo Pedido de Orçamento</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:14px;">Freitas Renovações LDA — ${createdAt}</p>
          </td>
        </tr>
        <!-- Alert badge -->
        <tr>
          <td style="padding:20px 32px 0;">
            <div style="background:#fef3c7;border:1.5px solid #f59e0b;border-radius:8px;padding:12px 16px;display:inline-block;">
              <span style="color:#92400e;font-weight:700;font-size:14px;">${urgencyLabel}</span>
            </div>
          </td>
        </tr>
        <!-- Details grid -->
        <tr>
          <td style="padding:20px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Cliente</span>
                  <div style="color:#0f172a;font-size:16px;font-weight:700;margin-top:4px;">${lead.name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Telefone</span>
                  <div style="margin-top:4px;">
                    <a href="tel:${lead.phone}" style="color:#0f2d5e;font-size:20px;font-weight:800;text-decoration:none;">${lead.phone}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Serviço</span>
                  <div style="color:#0f172a;font-size:15px;font-weight:600;margin-top:4px;">${lead.service}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Localização</span>
                  <div style="color:#0f172a;font-size:15px;font-weight:600;margin-top:4px;">${lead.parish}</div>
                </td>
              </tr>
              ${lead.description ? `
              <tr>
                <td style="padding:10px 0;">
                  <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Descrição</span>
                  <div style="color:#334155;font-size:14px;line-height:1.6;margin-top:4px;background:#f8fafc;border-radius:6px;padding:10px 12px;">${lead.description}</div>
                </td>
              </tr>` : ""}
            </table>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 28px;">
            <a href="tel:${lead.phone}" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#071a3a;font-size:15px;font-weight:800;text-decoration:none;padding:14px 28px;border-radius:8px;">
              📞 Ligar Agora para ${lead.name}
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">ID: ${leadId} · Freitas Renovações LDA · freitasrenovacoes.pt</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error("⚠️ Erro Resend ao enviar email:", error);
    } else {
      console.log("✅ Email de lead enviado com sucesso via Resend:", data);
    }

    return NextResponse.json(
      { success: true, message: "Pedido recebido com sucesso!", leadId, emailSent: !error },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar pedido" },
      { status: 500 }
    );
  }
}

// GET — compatibility endpoint
export async function GET() {
  return NextResponse.json({ message: "API de pedidos ativa." });
}
