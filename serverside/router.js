import {Router} from 'express';
import * as RH from "./user.requesthandler.js";

const router=Router();


router.route("/adddetails").post(RH.addUser);
router.route("/getdetails").get(RH.getUser);
router.route("/deletedetails/:_id").delete(RH.deleteDetails);
router.route("/updatedetails/:_id").put(RH.updateDetail);


export default router;