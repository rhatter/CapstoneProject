import React, { useState, useEffect } from "react";

//per fare una paginazione facile facile
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
//per poter fare le fetch semplici
import axios from "axios";
import SingleArticle from "../SigleArticle/SingleArticle";
import { Col } from "react-bootstrap";
import "./Pagination.css";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  async function getBooks() {
    const posts = await axios.get(
      `${process.env.REACT_APP_URL}/posts?page=${page}&pageSize=${pageSize}`
    );
    console.log(
      "from pagination",
      `${process.env.REACT_APP_URL}/posts?page=${page}&pageSize=${pageSize}`
    );
    setPosts(posts.data.posts);
    setPage(posts.data.currentPage);
    setTotalPages(posts.data.totalPages);
    console.log(posts);
    return posts;
  }

  useEffect(() => {
    getBooks();
  }, [page, pageSize]);

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
        <SingleArticle post={post} />
      ))}
      <Col xs={12}>
        {totalPages && (
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
