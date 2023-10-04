const mongoose = require("mongoose");   
const { Schema } = mongoose;

const NotesSchema = new Schema({
        //pheli baat hum ny is feild user ko yahn is liye dala kyu k hum chahatay hain k hum notes aur user model yeni schema ko link kardain us say hoga yeh k jis banday k notes hon gy bus wo apnay hi create  kiye huway notes access kar paye gah
    user: {
        // is line ka simple matlab hai k hum yahn kissi dusray model yeni User model ki objectid yahn rakhain gy yeni yeh eik foreign key ki tarhan hai line, foreign key matlab wo feild is table main exist na karti ho aur ap ussay kissi aur table say utha kar layein 
        type: mongoose.Schema.Types.ObjectId,
        // is line ka matlab k refrence hum User model say lay rahay hain ap User model main dekho toh lowercase main user likha hoga toh hum user model say refrence lay rahay hain matlab in short user model ki id uth kar yahn aye gi 
        ref: 'user'

    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    tag: {
        type:String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
      }

  });
  module.exports = mongoose.model('notes', NotesSchema)