import React from "react";
import "./App.module.scss";
import UnauthorizedList from '../UnauthorizedList'

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

  return <div className="App">
    <UnauthorizedList />
  </div>;
}

export default App;
