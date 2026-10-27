import { defineTool } from "eve/tools";
import { z } from "zod";

const inputSchema = z.object({
  client: z.string().min(1),
  phone: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().nonnegative(),
  due: z.string().min(1),
  notes: z.string().optional(),
});

export default defineTool({
  description: "Guarda un presupuesto real en Cotiza. Usala solo cuando el vendedor confirme explícitamente que quiere cargarlo.",
  inputSchema,
  outputSchema: z.object({ id: z.number(), client: z.string(), description: z.string(), amount: z.number(), source: z.string() }),
  async execute(input) {
    const baseUrl = process.env.COTIZA_API_URL || "http://127.0.0.1:3000";
    const response = await fetch(`${baseUrl}/api/quotes`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...input, source: "eve" }) });
    if (!response.ok) throw new Error(`Cotiza API respondió ${response.status}`);
    const data = await response.json() as { quote: { id: number; client: string; description: string; amount: number; source: string } };
    return data.quote;
  },
});
