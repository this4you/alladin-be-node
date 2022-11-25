import { CommandUseCase } from './CommandUseCase';
import { Validator } from './Validator';

export abstract class ValidateCommandUseCase<Input, Output = void> implements CommandUseCase<Input, Output>{
    protected constructor(
        protected validator: Validator<Input>
    ) {
    }
    execute(data: Input): Output {
        this.validator.validate(data);

        return this.validatedExecute(data);
    }

    protected abstract validatedExecute(data: Input): Output;

}