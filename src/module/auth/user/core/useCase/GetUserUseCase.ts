import { CommandUseCase } from '@lib/model/CommandUseCase';
import { NotFoundException } from '@lib/model/app-exception/NotFoundException';

import { UserRepository } from '../port/UserRepository';
import { ReturnUser } from '../model/ReturnUser';

export class GetUserUseCase implements CommandUseCase<string, Promise<ReturnUser>> {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(id: string): Promise<ReturnUser> {
        const user = await this.userRepository.getUserById(id);

        if (user == null) {
            throw new NotFoundException(`User with id: ${id} was not found!`)
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

}