const mongoose = require("mongoose")

const massageSchema = new mongoose.Schema({
    chatId: {
        type:String,
        required:true,
    },
    senderId: {
        type:String,
        required:true,
    },
    text: {
        type:String,
    },
    file: {
        type:String,
        default:"",
    },
    isRead: {
        type:Boolean,
        default: false,
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Massage',massageSchema);