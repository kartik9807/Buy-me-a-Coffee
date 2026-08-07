import mongoose from "mongoose";
const {Schema, model} = mongoose;
const UserSchema = new Schema({
    name:{type:String},
    email:{type:String,required:true},
    username:{type:String,required:true},
    profilepic:{type:String},
    razorpay_creator_id:{type:String},
    razorpay_creator_secret:{type:String},
    coverpic:{type:String},
    profileUpdated:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    updateAt:{type:Date,default:Date.now}
});
export default mongoose.models.User || model("User",UserSchema);