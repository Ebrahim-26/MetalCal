import express from "express";
import {
  getAllMetalList,
  getMetalbyId,
  createMetal,
  deleteMetal,
  updateMetal,
} from "../controllers/metalListController.js";

const router = express.Router();

// @desc GET all metal list
// /api/metalList
router.get("/", getAllMetalList);

// @desc Get single metal
//  /api/metalList/:id
router.get("/:id", getMetalbyId);

// @desc POST create new metal
//  /api/metalList
router.post("/", createMetal);

router.delete("/:id", deleteMetal);
router.put("/:id", updateMetal);

export default router;
