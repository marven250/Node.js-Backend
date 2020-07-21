import express, { Request, Response, Router, NextFunction } from "express";
import { Reimbursement } from "../Models/Reimbursement";
import moment from "moment";

export const reimbursementRouter: Router = express.Router();
import {
  postReimbursement,
  patchReimbursement,
  getReimbursementByStatus,
  getReimbursementByUser,
} from "../Database/user-data-access";

reimbursementRouter.get(
  "/status/:statusId",
  async (req: Request, res: Response, next: NextFunction) => {
    //Allowed Roles finance-manager or if ther userId is the user making the request.
    // Response: [ Reimbursement ]
    console.log("we've hit our endpoint");
    try {
      const id = req.params.statusId;
      if (req.session && req.session.user) {
        if (req.session && req.session.user.role === "finance-manager") {
          const statusReimbursement = await getReimbursementByStatus(id);

          res.json(statusReimbursement);
        } else {
          res.status(400).send("You don't have access to this user's info");
        }
      } else {
        res.status(400).json({
          message: "The incoming token has expired",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

reimbursementRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
      let {
        id,
        amount,
        description,
        type,
        dateSubmitted,
        author,
        dateResolved,
        resolver,
        status,
      } = req.body;
      dateSubmitted = moment().format("MMMM Do YYYY, h:mm:ss a");
      author = req.session && req.session.user.username;
      dateResolved = "";
      resolver = "finance-manager";
      status = 1;

      try {
        // if (req.session && req.session.user) {
        const postedReimbursement = await postReimbursement(
          id,
          author,
          amount,
          dateSubmitted,
          dateResolved,
          description,
          resolver,
          status,
          type
        );
        res.status(201).json(postedReimbursement);
        // }else
      } catch (e) {
        next(e);
      }
    } else {
      res.status(400).json({
        message: "The incoming token has expired",
      });
    }
  }
);

reimbursementRouter.patch(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    //Allowed Roles finance-manager
    //The reimbursementId must be presen as well as all fields to update, any field left undefined will not be updated. This can be used to approve and deny.
    // Request: Reimbursement
    // Response: Reimbursement
    //console.log(req.body, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    let { id, status } = req.body;
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    //console.log(date);
    if (status !== 2 && status !== 3) status = 1;

    if (req.session && req.session.user) {
      if (req.session && req.session.user.role === "finance-manager") {
        if (id == false) res.send("you need id to patch user");
        try {
          const patchedReimbursement = await patchReimbursement(
            id,
            date,
            status
          );
          res.status(200).json(patchedReimbursement);
        } catch (e) {
          next(e);
        }
      } else {
        res.status(400).send("Only finance-manager user has such privileges");
      }
    } else {
      res.status(400).json({
        message: "The incoming token has expired",
      });
    }
  }
);

reimbursementRouter.get(
  "/author/userId/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    //Allowed Roles finance-manager or if ther userId is the user making the request.
    // Response: [ Reimbursement ]
    console.log("we've hit our endpoint");
    try {
      console.log(req.params);
      const id = req.params.userId;
      console.log("this is usernmae in id", id);
      console.log(req.session && req.session.user, "pppppppppppppppppp");
      if (req.session && req.session.user) {
        if (
          (req.session && Number(req.session.user.id) === Number(id)) ||
          (req.session && req.session.user.role === "finance-manager")
        ) {
          const singleReimbursement = await getReimbursementByUser(id);

          res.json(singleReimbursement);
        } else {
          res.status(400).send("You don't have access to his user");
        }
      } else {
        res.status(400).json({
          message: "The incoming token has expired",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);
