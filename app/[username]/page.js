import React from 'react'
import Paymentpage from '@/components/PaymentPage.js'
import connectDB from '@/db/connectDB'
import User from '@/models/User.js'
import { notFound } from 'next/navigation'
export default async function Username({params}) {
  
  let {username} = await params;
  await connectDB();
  let u = await User.findOne({username:username,profileUpdated:true});
  if(!u){
    return notFound();
  }
  const user = JSON.parse(JSON.stringify(u));
  return <Paymentpage user={user} />
}

export async function generateMetadata({params}){
  let {username} = await params;
  return {
    title:`${username} - Buy Me a Coffee`,
  }
}