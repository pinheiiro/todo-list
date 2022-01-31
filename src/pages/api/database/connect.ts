import mongoose from 'mongoose';

//const url = process.env.MONGODB_URL

mongoose.connect("mongodb://localhost:27017/todo-list").
    then(() => {
        console.log("Conectado ao MongoDB");
    }).catch((err) => {
        console.log("Erro ao conectar");
    })