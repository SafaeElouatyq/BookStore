import Category from "../models/Category.js";

export const createCategory = async (req,res)=>{
    const {name,description} = req.body;
    try{
        if(!name ){
            return res.status(400).json({message:"le nom de categorie est requis "});
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({message:"cette categorie existe deja"});
        }
        const category = new Category({name, description});
        await category.save();
        res.status(201).json({message:"categorie cree avec succes",category});
    }catch(error){
        console.error("Error :",error);
        res.status(500).json({message:"erreur serveur"});
    }
}

export const getCategories = async (req,res)=>{
    try{
        const categories = await Category.find();
        res.status(200).json(categories);

    }catch(error){
        console.error("erreur:",error);
        res.status(500).json({message:"erreur serveur"});
    }
}

export const UpdateCategory = async (req,res)=>{
    const id = req.params.id;
    const {name,description}=req.body;
    try{
        const category = await Category.findByIdAndUpdate(id,
        {name,description},
        {new:true}
        )
        if(!category){
            return res.status(404).json({message:"categorie non trouve"});
        }
        res.status(200).json({message:"categorie mise a jour avec succes",category});
    }catch(error){
        console.error("erreur:",error);
        res.status(500).json({message:"erreur serveur"});
    }
}

export const deleteCategory = async (req,res)=>{
    const id = req.params.id;
    try{
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({message:"categorie non trouve"});
        }
        res.status(200).json({message:"categorie supprime avec succes"});
    }catch(error){
        console.error("erreur:",error);
        res.status(500).json({message:"erreur serveur"});
    }
    
}
