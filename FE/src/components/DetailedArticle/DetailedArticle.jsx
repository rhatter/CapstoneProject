import React, { useState, useEffect } from "react";
import "./DetailedArticle.css";
import { Col } from "react-bootstrap";
import Comments from "../Comments/Comments";
import NewComment from "../NewComment/NewComment";

function DetailedArticle({ post }) {
  const [firstLine, setFirstLine] = useState("");
  const [restOfTheLines, setRestOfTheLine] = useState([]);
  useEffect(() => {}, [post]);
  let restOfTheLinesArr = [];
  const allContent = () => {
    if (!post.content) {
      return;
    }
    const text = post.content;
    const textTest = `Il Kilimangiaro, noto anche come Kilimanjaro, è il monte più alto dell'Africa e una delle icone geografiche del continente. Questa imponente vetta vulcanica si trova nella Tanzania settentrionale, nella regione del Kilimanjaro. Il monte è una delle principali attrazioni naturali del continente africano e attira escursionisti, alpinisti e amanti della natura da tutto il mondo.

    Il Kilimangiaro è costituito da tre vulcani spenti sovrapposti: il Kibo, il Mawenzi e il Shira. Il Kibo è la cima più alta, raggiungendo un'altitudine di 5.895 metri sul livello del mare. La vetta è spesso coperta da un cappuccio di neve, creando un contrasto spettacolare con la savana circostante. L'ascesa al Kilimangiaro è una sfida emozionante, con diverse rotte di trekking che consentono ai visitatori di esplorare il paesaggio unico e di vivere l'esperienza di raggiungere la cima dell'Africa.
    
    La regione circostante il Kilimangiaro è ricca di biodiversità e offre l'opportunità di avvistare una varietà di specie animali, tra cui elefanti, bufali, leopardi e una vasta gamma di uccelli. Questa regione è stata dichiarata Patrimonio dell'Umanità dall'UNESCO e offre spettacolari paesaggi naturali che variano dalle foreste pluviali alle pianure sconfinate.
    
    L'ascesa al Kilimangiaro richiede una buona preparazione fisica e l'acclimatazione alle alte quote, ma le spettacolari viste panoramiche e la sensazione di conquistare una delle cime più alte del mondo rendono l'esperienza indimenticabile. Il Kilimangiaro rappresenta un'opportunità straordinaria per coloro che cercano avventure outdoor e desiderano esplorare la bellezza naturale dell'Africa.
    
    In sintesi, il Kilimangiaro è una maestosa montagna africana, una meta ambita per gli amanti dell'escursionismo e dell'alpinismo, con un paesaggio vario e affascinante e una ricca biodiversità circostante. La sua imponenza e la sua posizione la rendono una delle attrazioni naturali più iconiche dell'Africa.`;
    const splittedText = text.split(`.`);
    setFirstLine(splittedText[0] + ".");
    const secondSplit = text.split(`\n`);
    for (let i = 1; i < secondSplit.length; i++) {
      restOfTheLinesArr.push(secondSplit[i]);
    }
    setRestOfTheLine(restOfTheLinesArr);
  };
  useEffect(() => {
    allContent();
  }, [post]);

  return (
    <div className="singleArticlePage">
      <div className="colorBackground"></div>
      <div className="authorArea">
        <span>{post.author && post.author.name}</span>
      </div>
      <div className="line"></div>
      <div className="titleArea">
        <span>{post.title}</span>
      </div>
      <Col xs={12} sm={11} md={10} lg={7} xl={6} className="mainArea">
        <div className="imageArea">
          <img src={post.cover} alt="" />
        </div>

        <div className="contentArea">
          <div className="firstBlock">
            <div className="authorphotoArea"></div>
            <div className="authorNameArea">
              <span>{post.author && post.author.name}</span>
            </div>
          </div>
          <Col xs={12} md={8} className="centralBlock">
            <div className="firstParagraph">{firstLine}</div>
            <div className="restOfContent">
              {restOfTheLines.map((line) => (
                <p>{line}</p>
              ))}
            </div>
          </Col>
          <div className="lastBlock"></div>
        </div>
      </Col>
    </div>
  );
}

export default DetailedArticle;
