import React from 'react';
import './App.module.scss';
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from '../NotFoundPage';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Article from '../Article';
import Layout from '../Layout';
import EditProfile from '../EditProfile/EditProfile';
import ArticlesList from '../ArticlesList';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import RequireAuth from '../../hoc/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route
            path="/articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
