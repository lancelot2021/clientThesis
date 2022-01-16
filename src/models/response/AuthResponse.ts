import {IAdmin} from "../IAdmin";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    admin: IAdmin;
}