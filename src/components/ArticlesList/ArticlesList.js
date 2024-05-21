import React, { useEffect } from "react";
import { Pagination,Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ArticleShort from "../ArticleShort";
import { fetchArticles } from "../../store/articlesSlice";
import { appSelectors } from "../../store";

import classes from "./ArticlesList.module.scss";

export default function UnauthorizedList() {
  const dispatch = useDispatch();
  const articles = useSelector(appSelectors.articles);
  const articlesCount = useSelector(appSelectors.articlesCount);
  const loading = useSelector(appSelectors.articlesLoading);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const elems = articles.map((item) => {
    const { slug } = item;
    return <ArticleShort key={slug} {...item} />;
  });

  return (
    <div className={classes.wrapper}>
      {elems}
      <Spin spinning={loading} fullscreen />
      <Pagination
        defaultCurrent={1}
        defaultPageSize={5}
        showSizeChanger={false}
        total={articlesCount}
        style={{ textAlign: "center", paddingBottom: "14px" }}
        onChange={(page) => dispatch(fetchArticles(page))}
      />
    </div>
  );
}
