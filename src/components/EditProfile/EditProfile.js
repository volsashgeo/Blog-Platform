import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchUserEditProfile } from '../../store/userSlice';

import classes from './EditProfile.module.scss';

export default function EditProfile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (valuesFromForm) => {
    const formData = {
      user: {
        username: valuesFromForm.username,
        email: valuesFromForm.email,
        password: valuesFromForm.password,
        image: valuesFromForm.avatar,
      },
    };

    const userData = JSON.stringify(formData);

    dispatch(fetchUserEditProfile(userData));
    reset();
    navigate('/');
  };

  return (
    <div className={classes.wrapper}>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Username
          <input
            type="text"
            placeholder="Username"
            className={classes.input}
            {...register('username', {
              required: 'Required field',
            })}
            style={errors.username ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.username ? (
          <div className={classes.error_message}>
            <p> {errors?.username?.message}</p>
          </div>
        ) : null}

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
          New password
          <input
            type="password"
            placeholder="New password"
            className={classes.input}
            {...register('password', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be no more 40 characters.',
              },
            })}
            style={errors.password ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.password ? (
          <div className={classes.error_message}>
            <p> {errors?.password?.message}</p>
          </div>
        ) : null}

        <label className={classes.label}>
          Avatar image (url)
          <input
            type="text"
            placeholder="Avatar image"
            className={classes.input}
            {...register('avatar', {
              pattern: {
                value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/,
                message: 'Invalid Url',
              },
            })}
            style={errors.avatar ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.avatar ? (
          <div className={classes.error_message}>
            <p> {errors?.avatar?.message}</p>
          </div>
        ) : null}

        <button className={classes.submit_button}>Create</button>
      </form>
    </div>
  );
}
