import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  console.log("req.body", req.body)
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error)
      return res.status(422).json({ errors: error.data });
    }
    console.log(error)

    return res.status(500).json({ error: error.message });
  }
});

export default usersRouter;
