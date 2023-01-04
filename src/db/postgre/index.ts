import { AppDataSource } from '../postgre/data-source';

export const connectToDb = async () => {
    return await AppDataSource.initialize().then(() => {
        console.log('postgre: SUCCESS CONNECTION')
        return true;
    }, (e) => {
        console.log('postgre: REJECT CONNECTION', e)
        return false;
    }).catch(() => {
        console.log('postgre: ERROR CONNECTION')
        return false;
    });
}