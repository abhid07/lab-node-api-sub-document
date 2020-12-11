const mongoose = require('mongoose')

const password = 'root'
const dbname = "ClassRoom"

mongoose.connect(`mongodb+srv://Abhishek:${password}@cluster0.zmkqm.mongodb.net/${dbname}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(ok=>console.log("Mongoose is connected"))
.catch(err=>console.log("Error occured while connecting mongoose"))

module.exports = mongoose