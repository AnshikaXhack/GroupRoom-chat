const mongoose = require('mongoose')
const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to database")
    }).catch((error)=>{
       console.log("eror in connecting with db", error)
    })


}
module.exports = connectToDb