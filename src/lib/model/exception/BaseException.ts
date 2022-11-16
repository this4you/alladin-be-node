export class BaseException extends Error {
    constructor(
        public message: string,
        public statusCode: number
    ) {
        super(message);
    }
}