import React from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // destructure user and info from local storage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" classNam="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );
  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, Ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
