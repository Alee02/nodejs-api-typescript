import * as mongoose from 'mongoose';
const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    street: String,
});
const userSchema = new mongoose.Schema({
    address: addressSchema,
    email: String,
    name: String,
    password: String,
});
const userModel = mongoose.model('User', userSchema);
export default userModel;
//# sourceMappingURL=user.model.js.map