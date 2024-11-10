import express from "express"
import { getContact, getContacts, updateContact } from "../controllers/contacts.js"


const router = express.Router()

router.get("/", getContacts)
router.get("/:id", getContact)
router.put("/:id", updateContact)

export default router;