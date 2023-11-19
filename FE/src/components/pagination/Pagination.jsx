import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
//per fare una paginazione facile facile
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
//per poter fare le fetch semplici
import axios from "axios";
import SingleArticle from "../SigleArticle/SingleArticle";
import { Col } from "react-bootstrap";
import "./Pagination.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Pagination = ({ topic }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const selector = useSelector((select) => select);
  const articles = selector.FilteredArticles.payload;

  //non funziona finchè non fai il reducer
  async function getBooks(e) {
    const posts = await axios.post(
      `${process.env.REACT_APP_URL}/posts?page=${page}&pageSize=${pageSize}`,
      e
    );
    setPosts(posts.data.posts);
    setPage(posts.data.currentPage);
    setTotalPages(posts.data.totalPages);
    // console.log(posts);

    return posts;
  }

  useEffect(() => {
    // console.log(topic);
    if (articles && !topic) {
      getBooks(articles);
    } else if (topic) {
      getBooks({ topics: [topic] });
    }
  }, [page, pageSize, articles, topic]);

  const onChangePage = (value) => setPage(value);
  const changeVisual = (val) => {
    setPageSize(val);
  };

  const renderChangNumberArticle = () => {
    <input type="number" onChange={(e) => changeVisual(e.target.value)} />;
  };

  return (
    <>
      {posts.map((post) => (
        <SingleArticle post={post} key={nanoid()} />
      ))}
      <Col xs={12} className="paginationNumbers">
        {totalPages !== 0 && (
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={onChangePage}
          />
        )}
      </Col>
    </>
  );
};

export default Pagination;
