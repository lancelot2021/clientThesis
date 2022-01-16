import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IAdmin} from "./models/IAdmin";
import AdminService from "./services/AdminService";


const App: FC = () => {
    const {store} = useContext(Context);
    const [admins, setAdmins] = useState<IAdmin[]>([]);
    useEffect(() => {
        if(localStorage.getItem(`token`)){
            store.checkAuth()
        }
    }, [])

    async function getAdmins() {
        try {
            const response = await AdminService.fetchAdmins();
            setAdmins(response.data);
        } catch (e){
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Завантаження...</div>
    }

    if(!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <button onClick={getAdmins}>Отримати користувачів</button>
            </div>

        )
    }

    return (
    <div>
        <h1>{store.isAuth ? `Admin is authorized ${store.admin.email}`: 'АВТОРИЗУЙТЕСЬ'}</h1>
        <h1>{store.admin.isActivated ? 'Account is confirmed on': 'Confirm your email!!!'}</h1>
        <button onClick={() => store.logout()}>Вийти</button>
        <div>
            <button onClick={getAdmins}>Отримати користувачів</button>
        </div>
        {admins.map(admin =>
            <div key={admin.email}>{admin.email}</div>
        )}
    </div>
  );
};

export default observer(App);