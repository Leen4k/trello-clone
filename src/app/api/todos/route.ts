import { db } from "@/firebase";
import admin from "@/utils/firebase-admin-config.ts";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { NextResponse } from "next/server";



export const GET = async () => {
    
    try {
        const db = admin.firestore()
        const adminRef = db.collection("todos");
        const response = await adminRef.get();
        const responseArr:any[] = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        })
        // console.log(responseArr)
        return new NextResponse(JSON.stringify(responseArr), { status: 200 }); 
    } catch (error) {
      console.log(error);
    }
}

export const POST = async (req:any) => {
    const {title,desc} = await req.json();
    try{
        const documentRef = admin.firestore()
        .collection("todos")
        .doc()

        const response = await admin.firestore()
        .collection("todos")
        .doc(documentRef.id)
        .set({title, desc, id: documentRef.id})
        return new NextResponse(JSON.stringify("post created successfully"), {status: 200})
    }catch(err:any){
        return new NextResponse(err,{status: 500});
    }
}


