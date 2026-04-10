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


export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author", "nom prenom nationalite")
      .populate("category", "name description");

    res.status(200).json(books);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, author, description, price, stock, image, category } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        description,
        price,
        stock,
        image,
        category,
      },
      { new: true }
    )
      .populate("author", "nom prenom nationalite")
      .populate("category", "name description");

    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.status(200).json({
      message: "Livre mis à jour avec succès",
      book,
    });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.status(200).json({
      message: "Livre supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
