import mongoose from "mongoose";
const {Schema,model} = mongoose;

const PaymentSchema = new Schema({
    order_id:{type:String,required:true},
    name:{type:String,required:true},
    to_user:{type:String,required:true},
    message:{type:String,required:true},
    amount:{type:Number,required:true},
    done:{type:Boolean,default:false},
    },
    {
        timestamps:true,
    },
);
export default mongoose.models.Payment || model("Payment",PaymentSchema)