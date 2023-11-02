//il middelwares è una funzione che può essere lanciata
//dentro le chiamate che ti vengono fatte, per intenderci,
//es:  user.get("/user", logger(req), async (req, res) => {..........

//questa funzione può assorbire i dati che inseriamo nella req, e compiere delle
//operazioni con questi dati, come cambi di grafica, validazione, modifica dei dati e varie
//noi lo facciamo con un logger solo per vedere che effettivamente stiamo
//intercettando i dati della req
const logger = (req, next) => {
  // destrutturiamo il body della req
  // è in questo momento che "assorbiamo" i dati e li possiamo utilizzare
  const { url, ip, method } = req.body;
  // quello che riporto a logger in questo caso è solo un esempio
  // per vedere se funziona
  // NOTA la funzione: ${new Date().toISOString()} ha il solo scopo di reperire un timestamp
  console.log(
    `${new Date().toISOString()} Effettuata richiesta ${method} dall'indirizzo: ${url} all'ip: ${ip}`
  );
  // il comando next() serve a dirgli di andare avanti con le successiva indicazioni
  // inserite nella callback del routing
  next();
};

//esporto duro e puro
module.exports = logger;

//se hai ancora dubbi:
// documentazione: https://expressjs.com/en/guide/using-middleware.html
