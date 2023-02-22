import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

// const appRouter = router({
//   greeting: publicProcedure.query(() => 'hello tRPC v10!'),
//   hello: publicProcedure
//   // .query((req) => {
//   const input = req.input;
//   const user = userdata.find((it) => it.userid === input);
//     return user;
// }),
// getitems:publicProcedure.query(
//   ()=>

//   {
//     return{
//       cats:userdata
//     }
//   }),

const userList = [
  {
    id: 1,
    name: "vandana",
  },
];

const appRouter = router({

  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => `Hello sdd${input.name}`),

});

export type AppRouter = typeof appRouter;
// express implementation
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  // request logger

  console.log("⬅️ ", req.method, req.path, req.body ?? req.query);
  console.log(req.body, req.method, "mr");
  if(req.body)
  {
    const caller = appRouter.createCaller({
      req: undefined,
      _res: undefined
    });
    const result =  caller.greeting({ name: 'tRPC' });
  }

  next();
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    createContext,
    router: appRouter,
  })
);


app.get("/", (_req, res) => res.send("hello"));
app.listen(2021, () => {
  console.log("listening on port 2021");
});
