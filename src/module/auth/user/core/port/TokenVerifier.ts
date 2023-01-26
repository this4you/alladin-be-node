import { TokenUser } from '../model/TokenUser';

export interface TokenVerifier {
    verify(token: string): TokenUser
}