import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Tag } from 'antd';

import heart from '../../images/heart.png';
import avatar from '../../images/avatar.png';
import makeShortDescription from '../../utils';

import classes from './ArticleShort.module.scss';

export default function ArticleShort( { author, createdAt, title, description, tagList, slug} ) {
  const username = author?.username;
  const image = author?.image;

  let tagId = 0;
  const tags = tagList?.slice(0, 5).map((tag) => (
    <Tag key={tagId++} className={classes.tags}>
      {tag}
    </Tag>
  ));

  return (
    <article className={classes.blog_article}>
      <div className={classes.left}>
        <div>
          <Link to={`/articles/${slug}`} className={classes.title}>
            {makeShortDescription(title)}
          </Link>
          <div className={classes.likes}>
            <span>
              <img src={heart} alt="heart" />
            </span>
            12
          </div>
        </div>
        <div className={classes.tags}>{tags}</div>
        <div className={classes.text}>{makeShortDescription(description, 200)}</div>
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
