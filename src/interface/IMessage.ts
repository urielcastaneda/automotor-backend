export default interface IMessage {
    error: Boolean;
    statusCode: number;
    message: string;
    payload: Boolean | any;
}