'use client';

import { FormDataT, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "@/const/formik";
import { useState } from "react";


export default function Home() {

  const router = useRouter();
  const { login, error, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);


  const formik = useFormik({ initialValues, validationSchema, onSubmit: (values) => onFormSubmit(values) });

  const onFormSubmit = async (values: FormDataT) => {
    const res = await login(values);
    if (res !== undefined) router.push('/payments');
  }


  return (
    <div className="container">
      <h2 className="text-center mb-4">Login Page</h2>
      <form
        style={{ maxWidth: 650 }}
        onSubmit={formik.handleSubmit}
        className="p-4 border rounded shadow mx-auto"
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User name</label>
          <input
            type="text"
            className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
            id="username"
            {...formik.getFieldProps('username')}
            disabled={isLoading}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="invalid-feedback">{formik.errors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            id="password"
            {...formik.getFieldProps('password')}
            disabled={isLoading}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
          <div style={{ display: 'flex', justifyContent: 'end' }} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              onChange={togglePasswordVisibility}
              checked={showPassword}
            />
            <label className="form-check-label" htmlFor="showPassword">
              {showPassword ? 'Скрыть' : 'Показать'}
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      {error && <div style={{ maxWidth: 600 }} className="alert alert-danger mt-5 mx-auto text-center">{error}</div>}
    </div>
  );
}