import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthors, updateAuthor } from "../controllers/authorController.js";



const router= Router();
router.post("/", createAuthor);
router.get("/", getAuthors);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);


export default router;