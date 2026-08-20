import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

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

const DATA_FILE = path.join(process.cwd(), "leads.json");

function getLeads(): StoredLead[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading leads file:", err);
  }
  return [];
}

function saveLeads(leads: StoredLead[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing leads file:", err);
  }
}

// GET — Retrieve all leads for Jorge's Workspace
export async function GET() {
  const leads = getLeads();
  // Sort newest first
  leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ leads });
}

// POST — New lead submission
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
    const leads = getLeads();

    const newLead: StoredLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      service: lead.service,
      urgency: lead.urgency,
      parish: lead.parish,
      name: lead.name,
      phone: lead.phone,
      description: lead.description,
      contacted: false,
    };

    leads.push(newLead);
    saveLeads(leads);

    console.log("📥 Nova Lead Registada no Sistema:", newLead);

    return NextResponse.json(
      { success: true, message: "Pedido recebido com sucesso!", lead: newLead },
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

// PATCH — Toggle lead contacted status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, contacted } = body;

    if (!id) {
      return NextResponse.json({ error: "ID de lead não fornecido" }, { status: 400 });
    }

    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Lead não encontrada" }, { status: 404 });
    }

    leads[index].contacted = !!contacted;
    leads[index].contactedAt = contacted ? new Date().toISOString() : undefined;

    saveLeads(leads);

    return NextResponse.json({ success: true, lead: leads[index] });
  } catch (error) {
    console.error("PATCH lead error:", error);
    return NextResponse.json({ error: "Erro ao atualizar lead" }, { status: 500 });
  }
}
