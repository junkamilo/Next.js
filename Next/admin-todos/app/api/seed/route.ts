import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    //borramos los datos
    await prisma.todo.deleteMany();

    //creamos los datos
    await prisma.todo.createMany({
        data:[
            {description:'Piedra del alma', complete:true},
            {description:'Piedra del alma'},
            {description:'Piedra del alma'},
            {description:'Piedra del alma'},
            {description:'Piedra del alma'},
            {description:'Piedra del alma'},
            {description:'Piedra del alma'},
            {description:'Piedra del alma'}
        ]
    });

    const todo = await prisma.todo.create({
        data: { description: 'Piedra del alma' }
    })

    console.log(todo);


    return NextResponse.json({ message: 'Seed Executed' });

}
