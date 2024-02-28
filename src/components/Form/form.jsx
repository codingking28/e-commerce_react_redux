import React, { useState } from "react";
import "./style.css";
import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function FormComponent() {
  let foundChoice = [
    { val: "false", label: "No" },
    { val: "true", label: "Yes" },
  ];
  const handleSubmit = (data) => {
    // console.log(data);
    axios
      .post("http://localhost:3010/app/createData", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{
        delegate_id: "",
        first_name: "",
        last_name: "",
        found: "",
        records: [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="form">
            <div className="form-group">
              <label>
                <th>Delegate ID</th>
                <span className="impField">*</span>
              </label>
              <Field
                type="text"
                name="delegate_id"
                className={`selectArowGray  form-control`}
              />
            </div>
            <div className="form-group">
              <label>
                <th>First Name</th>
                <span className="impField">*</span>
              </label>
              <Field
                type="text"
                name="first_name"
                className={`selectArowGray  form-control`}
              />
            </div>
            <div className="form-group">
              <label>
                <th>Last Name</th>
                <span className="impField">*</span>
              </label>
              <Field
                type="text"
                name="last_name"
                className={`selectArowGray  form-control`}
              />
            </div>
            <div className="form-group">
              <label>
                <th>Found Status</th>
                <span className="impField">*</span>
              </label>

              <Field
                name="found"
                component="select"
                className={`selectArowGray  form-control`}
                autoComplete="off"
                value={values.found}
                onChange={(type) => {
                  console.log("OK", type.target.value);
                  // this.handleType(type.target.value);
                  setFieldValue("found", type.target.value);
                }}
                style={{ height: "35px" }}
              >
                {foundChoice.map((choice, i) => (
                  <option key={choice.val} value={choice.val}>
                    {choice.label}
                  </option>
                ))}
              </Field>
            </div>
            <Button variant="primary" type="submit" className="button">
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
