import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateEntry = z.object({
  energy: z.number().int().min(0).max(5),
  valence: z.number().int().min(0).max(5),
})

export default resolver.pipe(
  resolver.zod(CreateEntry),
  resolver.authorize(),
  async ({ energy, valence }, ctx) => {
    const entry = await db.entry.create({
      data: {
        energy,
        valence,
        user: {
          connect: {
            id: ctx.session.userId,
          },
        },
      },
    })

    return entry
  }
)
