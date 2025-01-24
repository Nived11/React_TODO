import {Router} from 'express';
import * as RH from "./user.requesthandler.js";

const router=Router();


router.route("/addtodo").post(RH.addTodo);
router.route("/gettodo").get(RH.getTodo);
router.route("/deletetodo/:_id").delete(RH.deleteTodo);
router.route("/updatetodo/:_id").put(RH.updateTodo);


export default router;