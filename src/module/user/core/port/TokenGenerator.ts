import { User } from '../model/User';
import { Token } from '../model/Token';

export interface TokenGenerator {
    generate(user: User): Token
}