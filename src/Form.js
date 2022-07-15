import React, { useEffect, useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submitForm = (e) => {
    e.preventDefault(false);
    setFormError(validateForm(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formError]);

  const updateForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formValues) => {
    let error = {};
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;

    if (formValues.username == "") {
      error.username = "USer name is emapty";
    }
    if (formValues.email == "") {
      error.email = "email  is emapty";
    } else if  (!pattern.test(formValues.email)){
        error.email = "Invalid email";
    }
    if (formValues.password == "") {
      error.password = "Password is emapty";
    } else if (formValues.password.length < 4){
        error.password = "Password should be more than 4 character";
    }
    return error;
  };

  return (
    <>
      {Object.keys(formError).length === 0 && isSubmit ? (
        <h1>Form Submitted Succesfully!!</h1>
      ) : (
        <pre>{JSON.stringify(formData, undefined, 2)}</pre>
      )}
      <h1>User Form</h1>
      <div className="ui divider"></div>
      <form onSubmit={submitForm}>
        <div className="ui form">
        <div className="field">
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={updateForm}
          ></input>
          <div>{formError.username}</div>
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={updateForm}
          ></input>
          <div>{formError.email}</div>
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={updateForm}
          ></input>
          <div>{formError.password}</div>
        </div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Form;
