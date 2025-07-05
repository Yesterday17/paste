import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import type { AppContext } from "../types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "../generated/prisma";

export class PasteFetch extends OpenAPIRoute {
  schema = {
    tags: ["Pastes"],
    summary: "Get a single Paste by slug",
    request: {
      params: z.object({
        user: z.string(),
        pasteSlug: z.string(),
      }),
    },
    responses: {
      "200": {
        description: "Returns paste content if found",
        content: {},
      },
      "404": {
        description: "Paste not found",
        content: {},
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { user, pasteSlug } = data.params;

    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const paste = await prisma.paste.findUnique({
      where: {
        user_slug: {
          user,
          slug: pasteSlug,
        },
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!paste) {
      return c.text("Paste not found", 404);
    }

    return c.text(paste.content);
  }
}
