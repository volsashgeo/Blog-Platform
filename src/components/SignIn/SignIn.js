import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { appSelectors } from '../../store';
import { fetchUserLogin } from '../../store/userSlice';

import classes from './SignIn.module.scss';

export default function SignIn() {
  const location = useLocation();
  const dispatch = useDispatch();

  const fromPage = location.state?.from?.pathname || -1;

  const navigate = useNavigate();

  const { error, username } = useSelector(appSelectors.userObj);

  if (username) {
    navigate(fromPage, { replace: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (valuesFromForm) => {
    const formData = {
      user: {
        email: valuesFromForm.email,
        password: valuesFromForm.password,
      },
    };

    const userData = JSON.stringify(formData);

    dispatch(fetchUserLogin(userData));
  };

  return (
    <div className={classes.wrapper}>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Email address
          <input
            type="text"
            placeholder="Email address"
            className={classes.input}
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                message: 'Invalid email',
              },
            })}
            style={errors.email ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.email ? (
          <div className={classes.error_message}>
            <p> {errors?.email?.message}</p>
          </div>
        ) : null}

        <label className={classes.label}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={classes.input}
            {...register('password', {
              required: 'Required field',
            })}
            style={errors.password ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.password ? (
          <div className={classes.error_message}>
            <p> {errors?.password?.message}</p>
          </div>
        ) : null}

        {error && <span className={classes.error_message}> Unregistered email or password</span>}

        <button className={classes.submit_button}>Login</button>
      </form>

      <span className={classes.have_an_account}>
        Don’t have an account?&nbsp;
        <Link to="/sign-up" className={classes.sign_in}>
          Sign Up.
        </Link>
      </span>
    </div>
  );
}
