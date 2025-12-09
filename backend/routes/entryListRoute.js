import express from "express";
import {
  createEntry,
  deleteAllEntries,
  deleteEntry,
  getAllEntry,
  getSingleEntry,
} from "../controllers/entryListController.js";
const router = express.Router();

//GET  /api/entryList/
router.get("/", getAllEntry);

//POST  /api/entryList/
router.post("/", createEntry);

//DELETE /api/entryList/
router.delete("/:id", deleteEntry);

//GET /api/entryList/:id
router.get("/:id", getSingleEntry);

//DELETE /api/entryList/
router.delete("/",deleteAllEntries)

export default router;
