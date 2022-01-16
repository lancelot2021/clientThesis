import {IAdmin} from "../models/IAdmin";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from "../http";


export default class Store {
    admin = {} as IAdmin;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setAdmin(admin: IAdmin) {
        this.admin = admin;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setAdmin(response.data.admin);
        } catch (e){
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async registration(login: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(login, email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setAdmin(response.data.admin);
        } catch (e){
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setAdmin({} as IAdmin);
        } catch (e){
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            // @ts-ignore
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,
                {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setAdmin(response.data.admin);
        }catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);
        }
    }
}