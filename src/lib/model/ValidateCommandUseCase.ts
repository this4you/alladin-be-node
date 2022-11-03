import { CommandUseCase } from './CommandUseCase';

export abstract class ValidateCommandUseCase<Input, Output = void> implements CommandUseCase<Input, Output>{
    execute(data: Input): Output {
        this.validate(data);
        return this.validatedExecute(data);
    }

    protected abstract validatedExecute(data: Input): Output;

    protected abstract validate(data: Input): void;

}