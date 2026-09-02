import { NextRequest, NextResponse } from "next/server";
import { SERVICES, PARISHES, URGENCY_OPTIONS } from "@/lib/constants";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  try {
    let rawBody: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      rawBody = await request.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      rawBody = {
        nome: formData.get("nome") || formData.get("name"),
        telefone: formData.get("telefone") || formData.get("phone"),
        email: formData.get("email"),
        localidade: formData.get("localidade") || formData.get("parish"),
        servico: formData.get("servico") || formData.get("service"),
        urgencia: formData.get("urgencia") || formData.get("urgency"),
        mensagem: formData.get("mensagem") || formData.get("description"),
      };
    } else {
      try {
        rawBody = await request.json();
      } catch {
        rawBody = {};
      }
    }

    const nome = (rawBody.nome || rawBody.name || "").toString().trim();
    const telefone = (rawBody.telefone || rawBody.phone || "").toString().trim();
    const email = (rawBody.email || "").toString().trim();
    const rawLocalidade = (rawBody.localidade || rawBody.parish || "").toString().trim();
    const rawServico = (rawBody.servico || rawBody.service || "").toString().trim();
    const rawUrgencia = (rawBody.urgencia || rawBody.urgency || "").toString().trim();
    const mensagem = (rawBody.mensagem || rawBody.description || "").toString().trim();

    // Validação dos campos obrigatórios
    if (!nome || nome.length < 2) {
      return NextResponse.json(
        { success: false, error: "Nome é obrigatório (mínimo 2 caracteres)." },
        { status: 400 }
      );
    }

    if (!telefone || telefone.length < 9) {
      return NextResponse.json(
        { success: false, error: "Telefone é obrigatório (mínimo 9 dígitos)." },
        { status: 400 }
      );
    }

    // Mapeamento amigável de serviço e localidade
    const foundService = SERVICES.find((s) => s.slug === rawServico || s.title === rawServico);
    const servicoTitle = foundService ? foundService.title : (rawServico || "Geral");

    const foundParish = PARISHES.find((p) => p.slug === rawLocalidade || p.name === rawLocalidade);
    const localidadeName = foundParish ? foundParish.name : (rawLocalidade || "Não informada");

    const foundUrgency = URGENCY_OPTIONS.find((u) => u.id === rawUrgencia);
    const urgenciaLabel = foundUrgency ? `${foundUrgency.emoji} ${foundUrgency.label}` : rawUrgencia;

    // Formatação da mensagem em HTML para o Telegram
    let telegramMessage = `🚨 <b>NOVO PEDIDO DE ORÇAMENTO</b> 🚨\n\n` +
      `👤 <b>Cliente:</b> ${escapeHtml(nome)}\n` +
      `📞 <b>Telefone:</b> ${escapeHtml(telefone)}\n` +
      `✉️ <b>Email:</b> ${email ? escapeHtml(email) : "Não informado"}\n` +
      `📍 <b>Localidade:</b> ${escapeHtml(localidadeName)}\n` +
      `🛠️ <b>Serviço:</b> ${escapeHtml(servicoTitle)}\n`;

    if (urgenciaLabel) {
      telegramMessage += `⚡ <b>Urgência:</b> ${escapeHtml(urgenciaLabel)}\n`;
    }

    telegramMessage += `\n📝 <b>Mensagem:</b>\n${mensagem ? escapeHtml(mensagem) : "Sem mensagem adicional"}`;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let telegramSent = false;

    if (botToken && chatId) {
      try {
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const telegramRes = await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        });

        const telegramData = await telegramRes.json();
        if (telegramRes.ok && telegramData.ok) {
          console.log("✅ Notificação enviada para o Telegram:", telegramData.result?.message_id);
          telegramSent = true;
        } else {
          console.error("❌ Erro da API do Telegram:", telegramData);
        }
      } catch (tgError) {
        console.error("❌ Erro na requisição do Telegram:", tgError);
      }
    } else {
      console.warn("⚠️ TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID não configurados.");
    }

    // Envio complementar por email via Resend (se configurado)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const toEmail = process.env.LEAD_EMAIL_TO || "Freitasrenovacoes@gmail.com";

        await resend.emails.send({
          from: `Freitas Renovações <${fromEmail}>`,
          to: [toEmail],
          subject: `🏠 Novo Pedido: ${servicoTitle} em ${localidadeName} — ${nome}`,
          html: `
            <h2>Novo Pedido de Orçamento</h2>
            <p><strong>Cliente:</strong> ${escapeHtml(nome)}</p>
            <p><strong>Telefone:</strong> <a href="tel:${escapeHtml(telefone)}">${escapeHtml(telefone)}</a></p>
            <p><strong>Email:</strong> ${email ? escapeHtml(email) : "Não informado"}</p>
            <p><strong>Localidade:</strong> ${escapeHtml(localidadeName)}</p>
            <p><strong>Serviço:</strong> ${escapeHtml(servicoTitle)}</p>
            ${urgenciaLabel ? `<p><strong>Urgência:</strong> ${escapeHtml(urgenciaLabel)}</p>` : ""}
            <p><strong>Mensagem:</strong> ${mensagem ? escapeHtml(mensagem) : "Sem mensagem adicional"}</p>
          `,
        });
      } catch (emailErr) {
        console.error("⚠️ Erro secundário no envio por email:", emailErr);
      }
    }

    return NextResponse.json(
      { success: true, message: "Pedido enviado com sucesso!", telegramSent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno no endpoint /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno ao processar o contacto." },
      { status: 500 }
    );
  }
}
