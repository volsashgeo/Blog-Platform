import React from "react";
import "./App.module.scss";
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "../NotFoundPage";
import SignUp from "../SignUp";
import Article from "../Article";
import Layout from "../Layout";
import UnauthorizedList from "../UnauthorizedList";

function App() {
  // const formData = {
  //   user: {
  //     username: "Aleksandr74477111111",
  //     email: "volsssss@gmail.com",
  //     password: "123",
  //   },
  // };

  // const userData = JSON.stringify(formData);
  // const response = await fetch(`https://blog.kata.academy/api/users`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: userData,
  // });

  // const a = await response.json();

  // useEffect(() =>  {

  // },[])
  // console.log(a?.user);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UnauthorizedList />} />
          <Route path="/articles" element={<UnauthorizedList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
