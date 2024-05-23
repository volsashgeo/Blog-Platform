import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { useDispatch,useSelector } from 'react-redux';

import whiteHeart from '../../images/white_heart.svg';
import redHeart from '../../images/red_heart.svg';
import avatar from '../../images/avatar.png';
import makeShortDescription from '../../utils';
import { fetchSetLike, fetchDeleteLike } from '../../store/articlesSlice';
import { appSelectors } from '../../store';

import classes from './ArticleShort.module.scss';

export default function ArticleShort({
  author,
  createdAt,
  title,
  description,
  tagList,
  favoritesCount,
  favorited,
  slug,
}) {
  const userObj = useSelector(appSelectors.userObj)
  const token = userObj.token ?? localStorage.getItem('token');

  const dispatch = useDispatch();

  const username = author?.username;
  const image = author?.image;


  let tagId = 0;
  const tags = tagList?.slice(0, 5).map((tag) => (
    <Tag key={tagId++} className={classes.tags}>
      {tag}
    </Tag>
  ));

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
        <div>
          <Link to={`/articles/${slug}`} className={classes.title}>
            {makeShortDescription(title)}
          </Link>
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
        <div className={classes.text}>{makeShortDescription(description, 100)}</div>
      </div>
      <div className={classes.right}>
        <div>
          <span className={classes.name}>{username}</span>
          <span className={classes.date}>{format(createdAt || Date.now(), 'MMMM dd, yyyy')}</span>
          <img src={image ?? avatar} className={classes.avatar} alt="avatar" />
        </div>
      </div>
    </article>
  );
}
