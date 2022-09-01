// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import Pet from "../../../models/pet";

interface Data {
  success: boolean;
  pets?: any;
  error?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req });

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const pets = await Pet.find({});
        res.status(200).json({ success: true, pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // create a new model in the database
        const pet = await Pet.create({
          ...req.body,
          owner_name: token?.email,
        });
        res.status(201).json(pet);
      } catch (error) {
        res.status(400).json({ success: false, error: JSON.stringify(error) });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
