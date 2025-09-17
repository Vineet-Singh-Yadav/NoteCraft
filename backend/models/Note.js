import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,// foreign key from user table, Set that user id
        ref: 'user'// reffrence of user from collection which we setted
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('notes', NotesSchema);
export default Notes;
// module.exports = mongoose.model('notes', NotesSchema);