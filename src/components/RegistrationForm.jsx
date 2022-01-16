import React, {useEffect, useState} from 'react';

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [loginError, setLoginError] = useState('Поле повинно бути заповненим');
    const [emailError, setEmailError] = useState('Поле повинно бути заповненим');
    const [passwordError, setPasswordError] = useState('Поле повинно бути заповненим');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if(emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const loginHandler = (e) => {
        setLogin(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректний запис електронної пошти')
        } else{
            setEmailError('');
        }
    }

    const passwordHandler = (e) => {
        setPasswordError(e.target.value)
        if(e.target.value.length < 3) {
            setPasswordError('Пароль повинен бути більше 3 символів')
            if(e.target.value) {
                setPasswordError('Поле повинно бути заповненим')
            }
        } else {
            setPasswordError('');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login':
                setLoginDirty(true);
                break;
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    }

    return (
        <div className='registration'>
            <form action="">
                <h1>Реєстрація</h1>
                {(loginDirty && loginError) && <div style={{color: "red"}}>{loginError}</div>}
                <input value={login} onBlur={e => blurHandler(e)} name="login" type="text" placeholder="Введіть логін системного адаміністратора..."/>
                {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
                <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name="email" type="text" placeholder="Введіть електронну адресу системного адміністратора..."/>
                {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name="password" type="text" placeholder="Введіть ваш пароль..."/>
                <button disabled={!formValid} type="submit">Зареєструватися</button>
            </form>
        </div>
    );
};

export default RegistrationForm;