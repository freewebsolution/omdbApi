import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../services/AuthUser';
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
const Register = () => {
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is mendatary')
            .min(3, 'Name must be at 3 char long'),
        email: Yup.string().email('Must be a valid email').max(255)
            .required('Email is required'),
        password: Yup.string()
            .required('Password is mendatory')
            .min(8, 'Password must be at 3 char long'),
        password_confirmation: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(formSchema)
    });
    const navigate = useNavigate();
    const { http } = AuthUser();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [passwordConf, setPasswordConf] = useState();
    const [loading, setLoading] = useState(false);
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }
    const onChangePasswordConf = (e) => {
        const passwordConf = e.target.value;
        setPasswordConf(passwordConf);
    }

    const submitForm = (data) => {
        setLoading(true);
        console.log(JSON.stringify(data, null, 4))
        http.post('/register', { name: name, email: email, password: password, password_confirmation: passwordConf })
            .then((res) => {
                navigate('/login')
            })
        reset();

    }
    return (
        <div className='row justify-content-center pt-5'>
            <div className="col-sm-6">
                <div className="card p-2">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                name="name"
                                type="pastextsword"
                                {...register('name')}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                onChange={onChangeName}
                            />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                type="text"
                                {...register('email')}
                                onChange={onChangeEmail}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                {...register('password')}
                                onChange={onChangePassword}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                name="password_confirmation"
                                type="password"
                                {...register('password_confirmation')}
                                onChange={onChangePasswordConf}
                                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.password_confirmation?.message}</div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-warning btn-block mt-4" disabled={loading}>
                                {loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                )}
                                <span>Register</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;