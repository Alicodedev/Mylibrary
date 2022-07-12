const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})
 
// prevents books with authors to be deleted runs before delete request 
authorSchema.pre('remove', function(next){ 
    Book.find({ author: this.id}, (err, books) => {
        if (err){
            next(err)
        } else if (books.length > 0){
            next(new Error ('This author has books still'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)