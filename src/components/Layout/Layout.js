import React from "react";
import { Link, Outlet } from "react-router-dom";

import classes from "./Layout.module.scss";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/">Realworld Blog</Link>
        <div className={classes.sign_block}>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </header>
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </>
  );
}
