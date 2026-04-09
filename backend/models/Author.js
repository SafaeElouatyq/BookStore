import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    
    nom:{
        type:String,
        required:true   
    },
    prenom:{
        type:String,
        required:true},

    nationalite:{
        type:String,
        required:true
    },


    
})
export default mongoose.model("Author", authorSchema);
