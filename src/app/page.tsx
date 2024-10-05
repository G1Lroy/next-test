'use client';

import { FormDataT, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "@/const/formik";


export default function Home() {

  const router = useRouter();
  const { login, error, isLoading } = useAuth();

  const formik = useFormik({ initialValues, validationSchema, onSubmit: (values) => onFormSubmit(values) });

  const onFormSubmit = async (values: FormDataT) => {
    const res = await login(values);

    if (res !== undefined) router.push('/payments');
  }


  return (
    <div className="container mt-5">
      <h2>Login Page</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
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
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            id="password"
            {...formik.getFieldProps('password')}
            disabled={isLoading}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Загрузка...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}