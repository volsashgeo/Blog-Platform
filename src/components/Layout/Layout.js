import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserReset } from '../../store/userSlice';
import { appSelectors } from '../../store';
import defaultAvatar from '../../images/avatar.png';

import classes from './Layout.module.scss';

export default function Layout() {
  const dispatch = useDispatch();
  const user = useSelector(appSelectors.userObj);
  const username = user?.username ?? localStorage.getItem('username');
  const avatar = localStorage.getItem('image');
  const pic = avatar === '' ? defaultAvatar : avatar;

  const articlesLoading = useSelector(appSelectors.articlesLoading);

  const loading = articlesLoading ?? user.loading;

  return username ? (
    <>
      <header>
        <Link to="/" >
          Realworld Blog
        </Link>
        <div className={classes.sign_block_auth}>
          <Link to="/new-article">
            Create article
          </Link>

          <Link to="/profile" className={classes.user_data} >
            <span>{username}</span>
            <img src={pic} alt="user-avatar" className={classes.user_avatar} />
          </Link>
          <button
            disabled={loading}
            onClick={() => {
              localStorage.clear();
              dispatch(fetchUserReset());
            }}
          >
            Log Out
          </button>
        </div>
      </header>
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </>
  ) : (
    <>
      <header>
        <Link to="/" >
          Realworld Blog
        </Link>
        <div className={classes.sign_block}>
          <Link to="/sign-in" >
            Sign In
          </Link>
          <Link to="/sign-up" >
            Sign Up
          </Link>
        </div>
      </header>
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </>
  );
}
