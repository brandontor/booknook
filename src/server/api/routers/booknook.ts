import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const bookNookRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bookNook.findMany();
  }),
  post: privateProcedure
    .input(
      z.object({
        bookclubname: z
          .string({
            required_error: "Book Club Name is Required",
            invalid_type_error: "Please provide a valid Book Club Name",
          })
          .min(5),
        booktitle: z.string().min(5),
        schedule: z.string().min(5),
        genre: z.string().min(5),
        description: z.string().min(5),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { bookclubname, booktitle, description, genre, schedule } = input;

      const post = await ctx.prisma.bookNook.create({
        data: {
          bookclubname,
          booktitle,
          description,
          genre,
          schedule,
        },
      });

      return post;
    }),
});
