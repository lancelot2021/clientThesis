import $api from '../http'
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IAdmin} from "../models/IAdmin";


export default class AdminService {
    static fetchAdmins(): Promise<AxiosResponse<IAdmin[]>> {
        return $api.get<IAdmin[]>('/admins')
    }
}