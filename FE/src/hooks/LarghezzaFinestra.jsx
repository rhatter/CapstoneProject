import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Aggiungi un listener per l'evento di ridimensionamento della finestra
    window.addEventListener("resize", handleResize);

    // Pulisci il listener dell'evento quando il componente si smonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Assicurati di specificare una dipendenza vuota per evitare effetti collaterali

  return windowWidth;
};

export default useWindowWidth;
