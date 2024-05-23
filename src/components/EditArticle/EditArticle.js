import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticle } from '../../store/articlesSlice';
import { appSelectors } from '../../store';
import CreateArticle from '../CreateArticle';

export default function EditArticle() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch,slug]);

  const pageName = 'Edit article';

  const articles = useSelector(appSelectors.articles);
  const article = articles.filter((item) => item.slug === slug)[0] ?? articles[0];

  const username = localStorage.getItem('username');

  if (article?.author?.username !== username) {
    navigate(-1);
  }

  return <CreateArticle pageName={pageName} {...article} />;
}
