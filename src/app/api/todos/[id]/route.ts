import { db } from "@/firebase";
import admin from "@/utils/firebase-admin-config.ts";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { NextResponse } from "next/server";

export const DELETE = async (req:any, {params}:any) => {
    const {id} = params;
    console.log(id)
    try{
        const db = admin.firestore()
        const response = await db.collection("todos").doc(id).delete();
        return new NextResponse(`todo ${id} has been deleted!`, {status: 200});
    }catch(err:any){
        return new NextResponse(err,{status: 500});
    }
    
}