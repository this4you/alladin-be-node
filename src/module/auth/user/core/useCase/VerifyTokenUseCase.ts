import { CommandUseCase } from '../../../../../lib/model/CommandUseCase';
import { TokenUser } from '../model/TokenUser';
import { UnauthorizedException } from '../../../../../lib/model/app-exception/UnauthorizedException';
import { TokenVerifier } from '../port/TokenVerifier';

export class VerifyTokenUseCase implements CommandUseCase<string, TokenUser> {
    constructor(
        private tokenVerifier: TokenVerifier,
    ) {
    }

    execute(data: string): TokenUser {
        try {
            return this.tokenVerifier.verify(data);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

}