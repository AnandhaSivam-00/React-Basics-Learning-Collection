import React from 'react';
import '../index.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    form.classList.add('was-validated');
    console.log('Form submitted');
  }

  return (
    <main className='container-fluid d-flex flex-column justify-content-center align-items-center login-container'>
      <div className='rounded border shadow p-4'>
        <h1 className='mb-5'>Sign in to your account</h1>
        <form className='needs-validation' onSubmit={handleSubmit} noValidate>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="email">Email</label>
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder="Enter your dark secret here"
              required
            />
            <label htmlFor='password'>Password</label>
            <div className="invalid-feedback">
              Please provide a valid password.
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button
              type='submit'
              className='btn btn-primary px-5'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main >
  )
}

export default Login;