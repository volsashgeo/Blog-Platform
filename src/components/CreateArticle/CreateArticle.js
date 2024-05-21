import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams} from 'react-router-dom';
import { useDispatch,} from 'react-redux';

// import {  fetchEditArticle } from '../../store/oneArticleSlice';
import { fetchCreateArticle,fetchEditArticle } from '../../store/articlesSlice';

import classes from './CreateArticle.module.scss';

export default function CreateArticle({
  pageName = 'Create new article',
  title = '',
  description = '',
  body = '',
  tagList = [],
}) {

  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tagsArray, setTagsArray] = useState(tagList);


  const ref = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (valuesFromForm) => {
    const formData = {
      article: {
        title: valuesFromForm.title,
        description: valuesFromForm.short_description,
        body: valuesFromForm.text,
        tagList: tagsArray,
      },
    };
    const userData = JSON.stringify(formData);

    if (pageName === 'Edit article') {
      dispatch(fetchEditArticle([slug,userData]));
      navigate(-2);
    } else {
      dispatch(fetchCreateArticle(userData));
      navigate(-1);
    }
  };

  const addTag = () => {
    if (!tagsArray.includes(ref.current.value) && ref.current.value.length) {
      const newArr = [...tagsArray, ref.current.value];
      ref.current.value = '';
      setTagsArray(newArr);
    }
  };

  const deleteTag = (tag) => {
    const oldArr = [...tagsArray];
    const newArr = oldArr.filter((item) => item !== tag);
    setTagsArray(newArr);
  };

  const handleTagsArrayChange = (e, tag) => {
    const newItem = e.target.value;
    const oldArr = [...tagsArray];
    const newArr = oldArr.map((item) => {
      if (item === tag) {
        item = newItem;
      }
      return item;
    });
    setTagsArray(newArr);
  };

  const tags = tagsArray.map((tag) => (
    <div key={tag}>
      <input
        defaultValue={tag}
        type="text"
        placeholder="Tag"
        className={classes.tags_input}
        onChange={(e) => handleTagsArrayChange(e, tag)}
        autoFocus
      />
      <input
        type="button"
        data-tag={tag}
        name="Delete"
        value="Delete"
        className={classes.delete_button}
        onClick={() => deleteTag(tag)}
      />
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <h1>{pageName}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Title
          <input
            type="text"
            placeholder="Title"
            defaultValue={title}
            className={classes.input}
            {...register('title', {
              required: 'Required field',
            })}
            style={errors.title ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.title ? (
          <div className={classes.error_message}>
            <p> {errors?.title?.message}</p>
          </div>
        ) : null}

        <label className={classes.label}>
          Short description
          <input
            defaultValue={description}
            type="text"
            placeholder="Short description"
            className={classes.input}
            {...register('short_description', {
              required: 'Required field',
            })}
            style={errors.short_description ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.short_description ? (
          <div className={classes.error_message}>
            <p> {errors?.short_description?.message}</p>
          </div>
        ) : null}

        <label className={classes.label}>
          Text
          <textarea
            defaultValue={body}
            type="text"
            placeholder="Text"
            className={classes.textaria}
            {...register('text', {
              required: 'Required field',
            })}
            style={errors.text ? { borderColor: 'rgba(245, 34, 45, 1)' } : null}
          />
        </label>

        {errors.text ? (
          <div className={classes.error_message}>
            <p> {errors?.text?.message}</p>
          </div>
        ) : null}

        <label className={classes.tags_label}>
          Tags
          {tags}
          <div>
            <input ref={ref} name="add_tag" type="text" placeholder="Tag" className={classes.tags_input} />
            <input
              type="button"
              name="Delete"
              defaultValue="Delete"
              className={classes.delete_button}
              onClick={(e) => deleteTag(e)}
            />

            <input
              type="button"
              name="Add tag"
              defaultValue="Add tag"
              className={classes.add_tag_button}
              onClick={addTag}
            />
          </div>
        </label>

        <button className={classes.submit_button}>Send</button>
      </form>
    </div>
  );
}
