
import createHandler from 'middleware';

const handler = createHandler();

handler.get((req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' });
// }
