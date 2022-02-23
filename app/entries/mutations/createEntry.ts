import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateEntry = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateEntry), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const entry = await db.entry.create({ data: input })

  return entry
})
