// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// import type { AppRouter } from './server';
 
// // Notice the <AppRouter> generic here.
// async function main()
// {
//     const trpc = createTRPCProxyClient<AppRouter>({
//         links: [
//           httpBatchLink({
//             url: 'http://localhost:2021/api/trpc',
//           }),
//         ],
//       });
//     //   const res =  await trpc.hello.query(
//     //     {msg:"yuva"});
//     //   console.log(res)
    
// }
// main();
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
 
const t = initTRPC.create();
 
const router = t.router({
  // Create procedure at path 'greeting'
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => `Hello ${input.name}`),
});
 
async function test(){
    const caller = router.createCaller({});
    const result = await caller.greeting({ name: 'tRPC' });
    console.log(result)
}
test()
