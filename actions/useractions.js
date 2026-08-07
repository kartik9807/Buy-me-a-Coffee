"use server";
import User from "@/models/User.js";
import dbConnect from "@/db/connectDB.js";
import Payment from "@/models/Payment.js";
import Razorpay from "razorpay";

export const initiate = async (amount, to_username, paymentform) => {

    await dbConnect();
    let user = await User.findOne({username:to_username});
    var instance = new Razorpay({
        key_id: user.razorpay_creator_id,
        key_secret: user.razorpay_creator_secret,
    });

    let options = {
        amount:Number.parseInt(amount),
        currency:"INR",
    }
    let x = await instance.orders.create(options)
    
    // create a payment object which shows a pending payment in db
    await Payment.create({order_id:x.id, amount:amount/100, to_user:to_username, name:paymentform.name, message:paymentform.message})  
    return x
};

export async function getPaymentMessage(username){
    await dbConnect();
    let a = await Payment.find({done:true, to_user:username}).sort({createdAt:-1});
    let data = JSON.stringify(a);
    return data;
}

export async function userProfile (form,email){
    await dbConnect();
    // const exist = await User.findOne({username:form.username})
    // if(exist){
    //     throw new Error("Username already exists. Please choose a different username.");
    // }if(form.razorpayId && !form.razorpaySecret || !form.razorpayId && form.razorpaySecret){
    //     throw new Error("Both Razorpay ID and Secret are required to set up payment receiving.");
    // }
    let user = await User.findOneAndUpdate({email:email},{name:form.name,username:form.username,profilepic:form.profilePic,coverpic:form.coverPic,razorpay_creator_id:form.razorpayId,razorpay_creator_secret:form.razorpaySecret,profileUpdated:true},{new:true})
    await Payment.findOneAndUpdate({})
    return JSON.parse(JSON.stringify(user));
}
