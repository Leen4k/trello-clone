import admin from "@/utils/firebase-admin-config.ts";
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

export const PUT = async (req:any, {params}:any) => {
    const {id} = params;
    const {newTitle,newDesc} = await req.json();

    try{
        const db = admin.firestore()
        const updatedTodo = await db.collection("todos").doc(id)
        .update({
          title:newTitle,desc:newDesc
        });
    
        return new NextResponse(JSON.stringify(updatedTodo), {status: 200});
    }catch(err:any){
        console.log(err)
        return new NextResponse(err,{status: 500});
    }
}