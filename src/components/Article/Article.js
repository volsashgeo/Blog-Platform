import React from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import Markdown from 'react-markdown'

import heart from "../../images/heart.png";
import avatar from "../../images/avatar.png";
import { appSelectors } from "../../store";

import classes from "./Article.module.scss";

export default function Article() {
  const { slug } = useParams();

  const articles = useSelector(appSelectors.articles);

  const index = articles.findIndex((item) => item.slug === slug);

  const article = articles[index];

  const { author, createdAt, title, description, tagList } = article;

  const { username, image } = author;

  let tagId = 0;

  const tags = tagList.map((tag) => (
    <Tag key={tagId++} className={classes.tags}>
      {tag}
    </Tag>
  ));

  return (
    <article className={classes.blog_article}>
      <div className={classes.left}>
        <div>
          <span className={classes.title}>{title}</span>
          <div className={classes.likes}>
            <span>
              <img src={heart} alt="heart" />
            </span>
            12
          </div>
        </div>
        <div className={classes.tags}>{tags}</div>
        <div className={classes.text}>
          <Markdown>{description}</Markdown>
        </div>
      </div>
      <div className={classes.right}>
        <div>
          <span className={classes.name}>{username}</span>
          <span className={classes.date}>
            {format(createdAt, "MMMM dd, yyyy")}
          </span>
          <img src={image ?? avatar} className={classes.avatar} alt="avatar" />
        </div>
      </div>
    </article>
  );
}
