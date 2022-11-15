import { connect } from 'mongoose';

export const connectToDb = async () => {
    const url = process.env.MONGO_CONNECTION;

    return await connect(url!!).then((mongo) => {
        console.log('mongodb: SUCCESS CONNECTION')
        return true;
    }, () => {
        console.log('mongodb: REJECT CONNECTION')
        return false;
    }).catch(() => {
        console.log('mongodb: ERROR CONNECTION')
        return false;
    });
}