import Author from "../models/Author.js";
export const createAuthor = async (req,res)=>{
    const {nom,prenom,nationalite} = req.body;
    try{
        if(!nom || !prenom || !nationalite){
            return res.status(400).json({message:"tous les champs sont requis"});
        }   
        const author = new Author({nom,prenom,nationalite});
        await author.save();
        res.status(201).json({message:"auteur cree avec succes",author});
    }catch(error){
        console.error("Error :",error);
        res.status(500).json({message:"erreur serveur"});
    }

}


export const getAuthors = async (req,res)=>{
    try{
        const authors = await Author.find();
        res.status(200).json(authors);
    }catch(error){
        console.error("erreur:",error);
        res.status(500).json({message:"erreur serveur"});
    }
}

export const updateAuthor = async (req,res)=>{
    const id = req.params.id;
    const {nom,prenom,nationalite} = req.body;
    try{    
        const author = await Author.findByIdAndUpdate(id,
        {nom,prenom,nationalite},
        {new:true}
        )
        if(!author){
            return res.status(404).json({message:"auteur non trouve"});
        }
        res.status(200).json({message:"auteur mis a jour avec succes",author});
    }catch(error){
        console.error("erreur:",error);
        res.status(500).json({message:"erreur serveur"});
    }
}

export const deleteAuthor = async (req,res)=>{
    const id = req.params.id;
    try{
        const author = await Author.findByIdAndDelete(id);
        if(!author){
            return res.status(404).json({message:"auteur non trouve"});
        }
        res.status(200).json({message:"auteur supprime avec succes"});
    }catch(error){
        console.error("erreur:",error);
        res.status(500).json({message:"erreur serveur"});
    }
}


