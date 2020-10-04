import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const Login = () => {
    
    const [error, setError] = useState();

    const history = useHistory();
    
    const checkFields = yup.object().shape({
        userId: yup.string().test('len','No mínimo 3 caracteres', val => val.length > 2).required("Digite sua matrícula."),
        password: yup.string().required("Digite sua senha."),
    });
    
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(checkFields)
    });
    
    const onSubmit = (data) => {  
        api.post('/login',{
            userId: data.userId,
            password: data.password
        }).then(() => {
            history.push('/home');
        }).catch((error) => {
            setError(error.response.data.message);
        })
    } 

    return (
    <>
    <div className="form">
    <h1>LOGIN</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group"></div>
            { error &&
                (<div className="alert alert-danger" role="alert">
                    {error}
                </div>
                )
            }   
            
            <label>Matrícula: </label>
            <input type="text" className="form-control" name="userId" ref={register} />
            { errors.userId &&
                (<div class="alert alert-danger" role="alert">
                    {errors.userId?.message}
                </div>
                )
            } 

            <label>Senha: </label>
            <input type="password" className="form-control" name="password" ref={register} />
            { errors.password &&
                (<div class="alert alert-danger" role="alert">
                    {errors.password?.message}
                </div>
                )
            } 
            
            <button type="submit" className="btn btn-primary">Entrar</button>
    </form>
    </div>
    </>
    );
}

export default Login;