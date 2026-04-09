import Book from "../models/Book.js";

export const createBook = async (req,res)=>{
    const {title,author,description,price,stock,image,category} = req.body;
    try{
        if(!title || !author || !price || !category){
            return res.status(400).json({message:"tous les champs requis"});
        }   
        const book = new Book({title,author,description,price,stock,image,category});
        await book.save();
        res.status(201).json({message:"livre cree avec succes",book});
    }catch(error){
        console.error("Error :",error);
        res.status(500).json({message:"erreur serveur"});
    }
}