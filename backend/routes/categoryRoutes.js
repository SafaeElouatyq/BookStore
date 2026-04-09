import { Router } from "express";
import { createCategory, deleteCategory, getCategories, UpdateCategory } from "../controllers/categoryController.js";



const router= Router();
router.post("/add", createCategory);
router.get("/", getCategories);
router.put("/update/:id", UpdateCategory);
router.delete("/delete/:id", deleteCategory);


export default router;