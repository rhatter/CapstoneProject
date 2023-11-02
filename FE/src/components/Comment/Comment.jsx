import React, { useEffect } from "react";

import "./Comment.css";

function Comment({ comment }) {
  useEffect(() => {
    console.log("commentp age", comment);
  }, []);
  const commentAuthor = comment;

  // const commentAuthor = {
  //   name: "Pina Insegna",
  //   usrImg:
  //     "https://i.pinimg.com/564x/47/10/cb/4710cb33e15fa0c001c56eed6ccb17e0.jpg",
  //   content:
  //     "Scalare il Kilimangiaro è stata un'esperienza che mi ha lasciato senza fiato, sia per la vista mozzafiato che per la sfida fisica. La sensazione di conquistare l'apice dell'Africa è unica e indimenticabile. Durante l'ascesa, ho attraversato paesaggi spettacolari, dalla giungla lussureggiante alle pianure alpine, e ho avuto l'opportunità di avvistare alcune delle meraviglie della fauna africana. Raggiungere la cima, con il ghiaccio scintillante e le nuvole al di sotto, è stata una delle esperienze più gratificanti della mia vita. Il Kilimangiaro è un vero gioiello naturale e un viaggio che consiglio a tutti gli amanti dell'avventura.",
  // };

  return (
    <div className="commentCard">
      <div className="authorArea">
        <img
          src={commentAuthor.authorID.usrImg}
          alt=""
          className="profileAuthor"
        />
        <span className="authorName">{commentAuthor.authorID.name}</span>
      </div>
      <div className="commentContentArea">
        <p className="comment">{commentAuthor.content}</p>
      </div>
      <div className="line"></div>
    </div>
  );
}

export default Comment;
