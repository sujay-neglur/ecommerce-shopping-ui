import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/shop" component={Shop} />
        <PrivateRoute component={Dashboard} path="/user/dashboard" exact />
        <AdminRoute component={AdminDashboard} path="/admin/dashboard" exact />
        <AdminRoute component={AddCategory} path="/create/category" exact />
        <AdminRoute component={AddProduct} path="/create/product" exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
