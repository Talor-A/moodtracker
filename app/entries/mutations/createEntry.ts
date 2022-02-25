import { resolver } from "blitz"
import db from "db"
import { CreateEntry } from "../validations"

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
