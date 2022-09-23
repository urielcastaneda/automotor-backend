export interface IToBack {
    path: string;
    method: string;
}

export interface IDataRol {
    name: string;
    description: string;
    toBack: IToBack[];
    toFront: IToBack[];
    status: Boolean | undefined;
}