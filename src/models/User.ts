import { Schema, Document, model } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    email: string;
    friend: string;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    friend: {
        type: String
    },
})

export const User = model<UserInterface>('user', UserSchema);