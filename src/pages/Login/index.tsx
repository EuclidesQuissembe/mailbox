import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router';
import * as yup from 'yup'

import './styles.css';
import useAuth from '../../hooks/useAuth';

interface FormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string()
    .email('Email com formato incorrecto')
    .required('Informe o seu e-mail'),
  password: yup.string().required('Informe a sua senha')
})

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()
  const { signIn } = useAuth()

  const login = (data: FormData) => {
    const { email, password } = data

    if (!signIn(email, password)) {
      alert('Falha na autenticação')
      return
    }

    navigate('/dashboard')
  }

  return (
    <>
      <div id="login">
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" onSubmit={handleSubmit(login)}>
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">email: </label><br />
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) =>
                        <input type="text" id="email" className="form-control" {...field} />
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">Password: </label><br />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) =>
                        <input type="password" id="password" className="form-control" {...field} />
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Entrar" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;