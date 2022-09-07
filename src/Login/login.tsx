import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import './login.css';
import { users as usersData } from '../data/users_data'
import { User } from "../Interfaces/users";
import authProvider from "../provider/auth-provider";
function LoginComponent() {
  const [users] = useState(usersData)
  // const [loggedInUser, setLoggedInUser] = useState('')
  // useEffect(() => {
  //   localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  // }, [loggedInUser]);

  const [loggedInUser, setLoggedInUser] = useState('');

useEffect(() => {
  const items = localStorage.getItem('loggedInUser');
  if (items) {
    setLoggedInUser(items);
  }
}, []);

useEffect(() => {
  localStorage.setItem('loggedInUser', loggedInUser);
}, [loggedInUser]);
  let navigate = useNavigate();

 return (
  <Formik
  initialValues={{  
      branchId: 0,
      userName: "",
      password: ""
    }
  }
    onSubmit={(values, { setSubmitting, setErrors }) => {
    setSubmitting(false);
    console.log("values", values)
    const index = users.findIndex((user: User) => user.userName === values.userName && user.password === values.password);
    if (index > -1) {
      authProvider.login();
      authProvider.setUserInfo(values.userName);
      navigate("/home");
    } else{
      alert("login failed")
    }
  }}
  validationSchema={Yup.object().shape({
    branchId: Yup.number()
      .required("Required"),
    userName: Yup.string().required(),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
  })}
>
  {props => {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit
    } = props;
    return (
      <div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="branchId"
            type="text"
            placeholder="Branch ID"
            value={values.branchId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={(errors.branchId && touched.branchId && "error input-field") || ''}
          />
          {errors.branchId && touched.branchId && (
            <div className="input-feedback">{errors.branchId}</div>
          )}
          <input
            name="userName"
            type="text"
            placeholder="Username"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={(errors.userName && touched.userName && "error") || ''}
          />
          {errors.userName && touched.userName && (
            <div className="input-feedback">{errors.userName}</div>
          )}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={(errors.password && touched.password && "error") || ''}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <div className="button-controls">
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
          </div>
        </form>
      </div>
    );
  }}
</Formik>
 )
}


export default LoginComponent;