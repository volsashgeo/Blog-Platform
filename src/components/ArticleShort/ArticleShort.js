import React from "react";
import classes from "./ArticleShort.module.scss";
import { format } from "date-fns";
import heart from "./heart.png";
import avatar from "./avatar.png";
import { Tag } from "antd";
import { makeShortDescription} from "../../utils";

export default function ArticleShort({
  author,
  createdAt,
  title,
  description,
  tagList,
}) {
  //   console.log(author, createdAt, title, description);
  const { username, image } = author;

  let tagId = 0;
  const tags = tagList.slice(0, 5).map((tag) => (
    <Tag key={tagId++} className={classes.tags}>
      {tag}
    </Tag>
  ));

  return (
    <article className={classes.blog_article}>
      <div className={classes.left}>
        <div>
          <span className={classes.title}>{makeShortDescription(title)}</span>
          <div className={classes.likes}>
            <span>
              <img src={heart} alt="heart" />
            </span>
            12
          </div>
        </div>
        <div className={classes.tags}>{tags}</div>
        <div className={classes.text}>
          {makeShortDescription(description, 200)}
        </div>
      </div>
      <div className={classes.right}>
        <div>
          <span className={classes.name}>{username}</span>
          <span className={classes.date}>
            {format(createdAt, "MMMM dd, yyyy")}
          </span>
          <img
            src={image ?? avatar}
            className={classes.avatar}
            alt="avatar"
          />
        </div>
      </div>
    </article>
  );
}
