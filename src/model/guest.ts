import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uri: string = 'mongodb://dbguest:NSN9mGkU0jfQUFDs@cluster0-shard-00-00-at0kr.mongodb.net:27017,cluster0-shard-00-01-at0kr.mongodb.net:27017,cluster0-shard-00-02-at0kr.mongodb.net:27017/guestbook?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log("not connected" + err.message);
    } else {
        console.log("Succesfully Connected!")
    }
});

export interface iGuest extends mongoose.Document {
    Name: string;
    Email: string;
    Address: string;
    Date: string;
}

export const GuestSchema = new Schema({
    Name: {type:String, required: true},
    Email: {type:String, required: true},
    Address: {type:String, required: true},
    Date: {type:String, required: true}
});

GuestSchema.set('toJSON', { virtuals: true });

const Guest = mongoose.model('Guest', GuestSchema);
export default Guest;
