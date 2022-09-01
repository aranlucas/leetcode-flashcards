// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Pet from "../../../models/pet";

interface Data {
  success: boolean;
  data?: any;
  error?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const pet = await Pet.findOne({ _id: query.id });
        res.status(200).json(pet);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "PUT":
      try {
        const pet = await Pet.updateOne({ _id: query.id }, req.body);
        res.status(200).json({ success: pet.acknowledged });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
