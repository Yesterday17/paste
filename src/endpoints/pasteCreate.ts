import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import type { AppContext } from "../types";
import { nanoid } from "nanoid";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "../generated/prisma";

export class PasteCreate extends OpenAPIRoute {
  schema = {
    tags: ["Pastes"],
    summary: "Create a new Paste",
    request: {
      params: z.object({
        user: z.string(),
        pasteSlug: z.string().optional(),
      }),
    },
    responses: {
      "200": {
        description: "Returns the created paste url",
        content: {
          "text/plain": {
            schema: z.string(),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const user = data.params.user || "public";
    const pasteSlug = data.params.pasteSlug || nanoid();

    const pasteToCreate = await c.req.text();

    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    let expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 /* 7 days */);
    if (user === "public") {
      expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 /* 1 day */);
    }

    await prisma.paste.upsert({
      where: {
        user_slug: {
          user,
          slug: pasteSlug,
        },
      },
      create: {
        user,
        slug: pasteSlug,
        content: pasteToCreate,
        expiresAt,
      },
      update: {
        content: pasteToCreate,
      },
    });

    const url = new URL(`/${user}/${pasteSlug}`, c.req.url);
    return c.text(url.toString(), 200);
  }
}
