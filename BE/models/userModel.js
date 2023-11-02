//importo i metodi di mongoose
const mongoose = require("mongoose");
// creo lo schema = il pattern con cui verrà creata la tabella, immaginala come delle colonne
const UsersSchema = new mongoose.Schema(
  // le voci di questo oggetto saranno i nomi delle colonne
  {
    name: {
      //gli dico che tipo di dati contiene questa colonna
      type: String,
      //gli dico se sarà necessaria
      //true = è necessaria se non la metti si incazza
      //false = non è necessaria
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      // nel default metti cosa scriverà lui se non scrivi niente
      //ovviamente il required deve essere false
      default: "Utente",
      // nell' enum metti un array di dati che accetta se no non li accetta
      enum: ["Utente", "Creator", "passante"],
    },
    password: {
      type: String,
      required: true,
    },
    usrImg: {
      type: String,
      required: false,
      default:
        "https://static.vecteezy.com/ti/vettori-gratis/p1/2318271-icona-profilo-utente-vettoriale.jpg",
    },
    externalID: {
      type: String,
      required: false,
    },
  },
  //gli metto le options roba da guardare in documentazione
  {
    // si fa il timestamp di quando lo crei
    timestamps: true,
    //se il tipo di dati differisce da quello che gli ho detto si incazza
    strict: true,
  }
);

//sporto lo schema
module.exports = mongoose.model(
  // il nome del modello a piacere basta che te lo ricordi in futuro
  "userModel",
  // la variabile creata sopra
  UsersSchema,
  // il nome della "tabella" di mongoose, non ti preoccupare se non l'hai creata
  // non devi crearla fa tutto lui
  "users"
);

//dopo aver fatto tutto questo torna sulla route userRoute.js
