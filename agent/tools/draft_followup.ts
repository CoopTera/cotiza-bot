import { defineTool } from "eve/tools";
import { z } from "zod";

const inputSchema = z.object({
  clientName: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().nonnegative(),
  sentAt: z.string().optional(),
  context: z.string().optional(),
  differentiator: z.string().optional(),
});

export default defineTool({
  description:
    "Analiza un presupuesto y prepara un borrador de seguimiento comercial. No envía mensajes ni modifica datos.",
  inputSchema,
  outputSchema: z.object({
    recommendedTiming: z.string(),
    angle: z.string(),
    reason: z.string(),
    draftMessage: z.string(),
    needsHumanReview: z.boolean(),
  }),
  execute({ clientName, description, amount, sentAt, context, differentiator }) {
    const highValue = amount >= 1000000;
    const timing = sentAt ? "entre 24 y 48 horas después del envío" : "dentro de la primera hora del envío";
    const valueAngle = differentiator?.trim() || (highValue
      ? "reducir riesgos y dejar claros el alcance y los próximos pasos"
      : "hacer simple la decisión y confirmar si el alcance responde a lo que necesita");
    const contextLine = context?.trim() ? ` Mencioná también: ${context.trim()}.` : "";

    return {
      recommendedTiming: timing,
      angle: valueAngle,
      reason: highValue
        ? "Por el monto, conviene reforzar confianza, alcance y próximos pasos antes de hablar de precio."
        : "Un seguimiento temprano ayuda a detectar dudas mientras el presupuesto todavía está presente.",
      draftMessage: `Hola ${clientName}, ¿cómo estás? Quería saber si pudiste revisar el presupuesto por ${description}. Podemos ayudarte a ${valueAngle}.${contextLine} ¿Te parece si revisamos juntos cualquier duda y coordinamos el próximo paso?`,
      needsHumanReview: true,
    };
  },
});
