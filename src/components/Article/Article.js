import React, { useEffect } from 'react';
import { useParams, useNavigate,useLocation} from 'react-router-dom';
import { format } from 'date-fns';
import { Tag, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Markdown from 'markdown-to-jsx';

import { fetchOneArticle } from '../../store/oneArticleSlice';
import heart from '../../images/heart.png';
import avatar from '../../images/avatar.png';
import { appSelectors } from '../../store';

import classes from './Article.module.scss';

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || -1;

  const dispatch = useDispatch();
  const  article = useSelector(appSelectors.article);

  useEffect(() => {
    dispatch(fetchOneArticle(slug));
  }, [dispatch, slug]);

  const usernameFromStorage = localStorage.getItem('username');

  const author = article?.author;
  const createdAt = article?.createdAt;
  const title = article?.title;
  const description = article?.description;
  const body = article?.body;
  const tagList = article?.tagList;
  const username = author?.username;
  const image = author?.image;

  const postOfUser = usernameFromStorage === username;

  const date = format(createdAt || Date.now(), 'MMMM dd, yyyy');

  let tagId = 0;

  const tags = tagList?.map((tag) => (
    <Tag key={tagId++} className={classes.tags}>
      {tag}
    </Tag>
  ));

  const confirm = () => {
    const token = localStorage.getItem('token');

    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    navigate(fromPage, { replace: true });
  };

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
              <input type="button" value="Delete" className={classes.button} />
            </Popconfirm>
            <input
              type="button"
              value="Edit"
              className={classes.button}
              onClick={() => navigate(`/articles/${slug}/edit`)}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
