import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);


    return (
        <div>
            <input
                onChange={e => setLogin(e.target.value)}
                value={login}
                type="text"
                placeholder="Login"
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Пароль"
            />
            <button onClick={() => store.login(email, password)}>Ввійти</button>
            <button onClick={()=> store.registration(login, email, password)}>Зареєструватися</button>
        </div>
    );
};

export default observer(LoginForm);