import { Router } from "express";
import { createCategory, deleteCategory, getCategories, UpdateCategory } from "../controllers/categoryController.js";



const router= Router();
router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", UpdateCategory);
router.delete("/:id", deleteCategory);

export default router;