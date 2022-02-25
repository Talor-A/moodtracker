import { z } from "zod"

export const CreateEntry = z.object({
  energy: z.number().int().min(0).max(5),
  valence: z.number().int().min(0).max(5),
})
export type CreateEntryInput = z.infer<typeof CreateEntry>
