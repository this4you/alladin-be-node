import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
    constructor(
        message: string
    ) {
        const errorText = `Recourse not found: ${message}`
        super(errorText, 404);
    }
}