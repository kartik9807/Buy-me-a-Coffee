import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB.js";
import User from "@/models/User";
export const POST = async(req)=>{
    await connectDB();
    let body = await req.formData()
    body = Object.fromEntries(body)
    // check if razorpayOrderID is present on the server
    let p = await Payment.findOne({order_id:body.razorpay_order_id});
    let user = await User.findOne({username:p.to_user});
    if(!p){
        return NextResponse.json({success:false,message:"OrderID not found"})
    }
    // verify payment
    let b = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id },body.razorpay_signature,user.razorpay_creator_secret)
    if(b){
        const updatedPayment = await Payment.findOneAndUpdate({order_id:body.razorpay_order_id},{done:true},{new:true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentDone=true`)
    }else{
        return NextResponse.json({success:false,message:"Payment verification failed"});
    }
}
