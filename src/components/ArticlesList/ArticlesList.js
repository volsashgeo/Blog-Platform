import React, { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ArticleShort from '../ArticleShort';
import { fetchArticles } from '../../store/articlesSlice';
import { appSelectors } from '../../store';

import classes from './ArticlesList.module.scss';

export default function ArticlesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector(appSelectors.articles);
  const articlesCount = useSelector(appSelectors.articlesCount);
  const loading = useSelector(appSelectors.articlesLoading);

  const [paramsPage] = useSearchParams();

  const pageCurrent = paramsPage.get('page') ?? 1;

  useEffect(() => {
    dispatch(fetchArticles(pageCurrent));
  }, [dispatch, pageCurrent]);


  let nextNum = 0;
  const elems = articles.map((item) => (
    <ArticleShort key={nextNum++} {...item}/>
  ));

  const handlePagination = (page) => {
    navigate(`?page=${page}`);
    dispatch(fetchArticles(page));
  };



  return (
    <div className={classes.wrapper}>
      <Spin spinning={loading} style={{ display: 'flex', justifyContent: 'center' }} />
      {elems}
      <Pagination
        defaultCurrent={1}
        current={pageCurrent}
        defaultPageSize={5}
        showSizeChanger={false}
        total={articlesCount}
        style={{ textAlign: 'center', paddingBottom: '14px' }}
        onChange={handlePagination}
      />
    </div>
  );
}
