//Fase1 importo i metodi di express mongoose
const express = require("express");
const mongoose = require("mongoose");
//Fase2 importo la porta di uscita del server
// Per importare la variabile d'ambiente scrivo process.env.REACT_APP_NOMEVARIABILEAMBIENTE
require("dotenv").config();
const PORT = process.env.REACT_APP_SERVERPORT;
//Fase3 creo e importo le route
//Guarda i file dentro ./routes/ per capire come costruire un gruppo di rotte

//decript

//Richiamo i CORS per accettare le richiesta solo dagli indirizzi che decido io
const cors = require("cors");

// Aggiungo le rotte
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const gitRoute = require("./routes/github");
const verifyTokenRoute = require("./routes/verifyRoute");
const commentRoute = require("./routes/commentRoutes");

//Importo eventuali middlewares
//const logger = require("../middlewares/logger");

//costruisco l'app prendendolo da express
const app = express();

//gli aggiungo il parser Json se no mi da errore quando gli invio i dati in json
app.use(express.json());

//gli dico che dentro deve usare i cors
app.use(cors());

//aggiungo al path principale le rotte che ho creato
app.use("/", userRoute);
app.use("/", postRoute);
app.use("/", gitRoute);
app.use("/", verifyTokenRoute);
app.use("/", commentRoute);

//creo la risposta per la root principale
app.get("/", (req, res) => {
  res.send({
    //dati della risposta sulla get principale
  });
});

//stringa di collegamento con il server di moongoose
//i dati da passare a mongoose per il collegamento: indirizzo e password
// sono contenuti nella variabile d'ambiente, vedi il file ".env"
mongoose.connect(process.env.REACT_APP_MONGOOSESERVERCONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//lancio la connessione con il db di moongoose
const db = mongoose.connection;
// db.on  vuol dire, ogni volta che
db.on("error", console.error.bind(console, "Errore in connessione"));
// db.once vuol dire, una volta che
db.once("open", console.error.bind(console, "Connessione riuscita"));

//metto l'app in ascolto sulla porta che ho stabilito in ".env"
app.listen(PORT, () => console.log(`collegato alla porta ${PORT}`));

//se sei arrivato fino a qui dovresti avere due cartelle sotto be:
// models, che conterrà tutti i modelli che verranno creati e richiamati sul DB
// routes, che conterrà tutt le rotte che oltre alla principale, possiamo richiamare

//ovviamente, a seconda delle esigenze, potrai creare altri modelli e altre rotte
//basta che poi gli fai il require qua dentro
console.log("Preso");
