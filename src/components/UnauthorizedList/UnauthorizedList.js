import React, { useEffect } from "react";
import classes from "./UnauthorizedList.module.scss";
import ArticleShort from "../ArticleShort";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/articlesSlice";
// import { getPage } from "../../store//pageSlice";
import { appSelectors } from "../../store/";

export default function UnauthorizedList() {
    // const [page, setPage] = useState(1)

  const dispatch = useDispatch();
  const articles = useSelector(appSelectors.articles);
  const articlesCount = useSelector(appSelectors.articlesCount);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  console.log("articles", articles);
  console.log("articlesCount", articlesCount);

  const elems = articles.map((item) => {
    // console.log(item);
    const { slug, ...props } = item;
    return <ArticleShort key={slug} {...props} />;
  });

  return (
    <>
      <header>
        <a href="">Realworld Blog</a>
        <div className={classes.sign_block}>
          <a href="">Sign In</a>
          <a href="">Sign Up</a>
        </div>
      </header>
      <div className={classes.wrapper}>
        {elems}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={5}
          showSizeChanger={false}
          total={articlesCount}
          style={{ textAlign: "center", paddingBottom: "14px" }}
          onChange={page => dispatch(fetchArticles(page))}
        />
      </div>
    </>
  );
}
