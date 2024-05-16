import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTokenReset } from '../../store/tokenSlice';
import { appSelectors } from '../../store';
import defaultAvatar from '../../images/avatar.png';

import classes from './Layout.module.scss';

export default function Layout() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const dispatch = useDispatch();
  const token = useSelector(appSelectors.token);
  // const auth = Boolean(localStorage.getItem('auth'));
  // console.log('auth Layout', auth === true);
  console.log('token', token);

  const storageData = localStorage.getItem('user');


  const username = JSON.parse(storageData)?.username;
  const avatar = JSON.parse(storageData)?.image;
  // const username = storageData?.username;
  const pic = avatar === '' ? defaultAvatar : avatar
  console.log('username', username);
  console.log('storageData', storageData);

  return username ? (
    <>
      <header>
        <Link to="/">Realworld Blog</Link>
        <div className={classes.sign_block_auth}>
          <Link to="/sign-in">Create article</Link>

          <Link to="/profile" className={classes.user_data}>
            <span>{username}</span>
            <img src={pic} alt="user-avatar" className={classes.user_avatar} />
          </Link>
          <Link
            to="/sign-in"
            onClick={() => {
              localStorage.removeItem('user');
              dispatch(fetchTokenReset({}));
              // setUser(null)
            }}
          >
            Log Out
          </Link>
        </div>
      </header>
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </>
  ) : (
    <>
      <header>
        <Link to="/">Realworld Blog</Link>
        <div className={classes.sign_block}>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </header>
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </>
  );
}
