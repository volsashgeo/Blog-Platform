import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Tag, Popconfirm, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Markdown from 'markdown-to-jsx';

import { fetchArticle, fetchSetLike, fetchDeleteLike } from '../../store/articlesSlice';
import avatar from '../../images/avatar.png';
import { appSelectors } from '../../store';
import whiteHeart from '../../images/white_heart.svg';
import redHeart from '../../images/red_heart.svg';

import classes from './Article.module.scss';

export default function Article() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const userObj = useSelector(appSelectors.userObj)
  const token = userObj.token ?? localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || -1;

  const articles = useSelector(appSelectors.articles);
  const loading = useSelector(appSelectors.articlesLoading);

  const article = articles.filter((item) => item.slug === slug)[0] ?? articles[-1];

  const usernameFromStorage = localStorage.getItem('username');

  const author = article?.author;
  const createdAt = article?.createdAt;
  const title = article?.title;
  const description = article?.description;
  const body = article?.body;
  const tagList = article?.tagList;
  const username = author?.username;
  const image = author?.image;
  const favoritesCount = article?.favoritesCount;
  const favorited = article?.favorited;

  const postOfUser = usernameFromStorage === username;

  const date = format(createdAt || Date.now(), 'MMMM dd, yyyy');

  let tagId = 0;

  const tags = tagList?.map((tag) => (
    <Tag key={tagId++} className={classes.tags}>
      {tag}
    </Tag>
  ));

  const confirm = () => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    navigate(fromPage, { replace: true });
  };

  const handleHeartClick = () => {
    if (token) {
      if (!favorited) {
        dispatch(fetchSetLike(slug));
      } else {
        dispatch(fetchDeleteLike(slug));
      }
    }
  };

  return (
    <article className={classes.blog_article}>
      <div className={classes.left}>
        <Spin spinning={loading} />
        <div>
          <span className={classes.title}>{title}</span>
          <div className={classes.likes}>
            <span>
              <input
                type="image"
                src={favorited ? redHeart : whiteHeart}
                alt="heart"
                onClick={handleHeartClick}
                disabled={!token}
              ></input>
            </span>
            {favoritesCount}
          </div>
        </div>
        <div className={classes.tags}>{tags}</div>
        <div className={classes.text}>
          <Markdown>{description}</Markdown>
        </div>
      </div>
      <div className={classes.text_body}>
        <Markdown>{body}</Markdown>
      </div>
      <div className={classes.right}>
        <div>
          <span className={classes.name}>{username}</span>
          <span className={classes.date}>{date}</span>
          <img src={image ?? avatar} className={classes.avatar} alt="avatar" />
        </div>
        {postOfUser ? (
          <div className={classes.buttons_block}>
            <Popconfirm
              placement="rightTop"
              title="Are you sure to delete this article?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
              style={{ width: '246px' }}
            >
              <input type="button" value="Delete" className={classes.button} disabled={loading} />
            </Popconfirm>
            <input
              type="button"
              value="Edit"
              className={classes.button}
              onClick={() => navigate(`/articles/${slug}/edit`)}
              disabled={loading}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
