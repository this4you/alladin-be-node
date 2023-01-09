import { AppDataSource } from '../data-source';
import { UserEntity } from '../entities/UserEntity';

const userRepository = AppDataSource.getRepository(UserEntity);

export default userRepository;