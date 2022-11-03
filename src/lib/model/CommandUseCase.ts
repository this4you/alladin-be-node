export interface CommandUseCase<Input, Output = void> {
    execute(data: Input): Output
}