export const tryExecute = async (next: Function, block: Function) => {
    try {
        await block();
    } catch (e) {
        next(e);
    }
}