import { IToBack } from './IDataRol';

export interface IDataUser {
    name: string;
    lastname: string;
    email: string;
}

export interface IAccessPage {
    toFront: string[];
    toBack: IToBack;
}

export interface IToken {
    access_page: IAccessPage;
    _id: string;
    iat: number;
    role: string;
}