import mongoose from 'mongoose';

const url = process.env.MONGODB_URI

    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).
    then(() => {
        console.log("Conectado ao MongoDB");
    }).catch((err) => {
        console.log("Erro ao conectar");
    })