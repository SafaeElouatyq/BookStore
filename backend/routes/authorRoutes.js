import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthors, updateAuthor } from "../controllers/authorController.js";



const router= Router();
router.post("/add", createAuthor);
router.get("/", getAuthors);
router.put("/update/:id", updateAuthor);
router.delete("/delete/:id", deleteAuthor);


export default router;