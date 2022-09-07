import './home.css';
import { users as usersData } from '../data/users_data'
import { useState, useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import authProvider from '../provider/auth-provider';
import { User } from '../Interfaces/users';


function HomeComponent() {
  const [users, setUsers] = useState(usersData)
  function removeUserHandler(e: any, userName: string) {
    e.preventDefault();
    const id = users.findIndex((user: User) => user.userName === userName);
    if (id > -1) {
      users.splice(id, 1);
      setUsers([...users]);
    }
  }

  console.log(users)

  return (
    <div>
      <h1></h1>
      <button onClick={() => authProvider.logout()}>Logout</button>
    <div className="grid-container">
      <div className="addUserForm">
        <Formik
          initialValues={{  
            branchId: -1,
            userName: "",
            password: "",
            firstName: "",
            middleName: "",
            lastName: "",
            position: "", }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
            setSubmitting(false);
            console.log("values", values)
            const index = users.findIndex((user: any) => user.userName === values.userName);
            if (index === -1) {
              users.push(values);
              setUsers([...users]);
            } else{
              setErrors({userName: 'Username already exists'})
            }
          }}
          validationSchema={Yup.object().shape({
            branchId: Yup.number()
              .required("Required"),
            userName: Yup.string().required(),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/(?=.*[0-9])/, "Password must contain a number."),
              firstName: Yup.string()
              .required()
              .matches(/^[a-zA-Z]+$/, "Fist Name must not contain a number."),
              middleName: Yup.string()
              .required()
              .matches(/^[a-zA-Z]+$/, "Middle Name must not contain a number."),
              lastName: Yup.string()
              .required()
              .matches(/^[a-zA-Z]+$/, "Last name must not contain a number."),
              position: Yup.string().required()

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
              <form onSubmit={handleSubmit}>
                <input
                  name="branchId"
                  type="text"
                  placeholder="Branch ID"
                  value={values.branchId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={(errors.branchId && touched.branchId && "error") || ''}
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
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={(errors.firstName && touched.firstName && "error") || ''}
                />
                {errors.firstName && touched.firstName && (
                  <div className="input-feedback">{errors.firstName}</div>
                )}
                <input
                  name="middleName"
                  type="text"
                  placeholder="Middle Name"
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={(errors.middleName && touched.middleName && "error") || ''}
                />
                {errors.middleName && touched.middleName && (
                  <div className="input-feedback">{errors.middleName}</div>
                )}
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={(errors.lastName && touched.lastName && "error") || ''}
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
                <input
                  name="position"
                  type="text"
                  placeholder="Position"
                  value={values.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={(errors.position && touched.position && "error") || ''}
                />
                {errors.position && touched.position && (
                  <div className="input-feedback">{errors.position}</div>
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
                <button>
                  RESET
                </button>
                <button type="submit" disabled={isSubmitting}>
                  ADD
                </button>
              </form>
            );
          }}
        </Formik>
        {/* <form>
          <input type="text" placeholder='Branch ID' name="branchId" />
          <input type="text" placeholder='Username' name="name" />
          <input type="text" placeholder='First Name' name="name" />
          <input type="text" placeholder='Mobile Name' name="name" />
          <input type="text" placeholder='Last Name' name="name" />
          <input type="text" placeholder='Position' name="name" />
          <input type="text" placeholder='Password' name="name" />
          <button type="submit">RESET</button>
          <button type="submit"> ADD</button>
        </form> */}
      </div>
      <div className="userTable">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>branchId</th>
              <th>Username</th>
              <th>Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((listValue: any, index: number) => {
              console.log("index", index)
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{listValue.branchId}</td>
                  <td>{listValue.userName}</td>
                  <td>{`${listValue.firstName} ${listValue.middleName}  ${listValue.lastName}`}</td>
                  <td>{listValue.position}</td>
                  <td><button onClick={(e) => removeUserHandler(e, listValue.userName)}>REMOVE</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  )
}
export default HomeComponent;