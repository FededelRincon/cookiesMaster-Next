// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log(req.cookies)//aca va a tener 2 cosas

  res.status(200).json({ 
    name: 'John Doe',
    ...req.cookies //y aca va a tener 3, las 2 q traia y el jhon doe
  })
}
