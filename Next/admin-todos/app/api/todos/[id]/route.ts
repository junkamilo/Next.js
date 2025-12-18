import prisma from "@/app/lib/prisma"; // Asegúrate que esta ruta sea correcta
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from 'yup';

interface Segments {
    params: Promise<{
        id: string;
    }>;
}

const getTodo = async (id: string): Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({ where: { id } });

    return todo;
}

export async function GET(request: Request, { params }: Segments) {

    const { id } = await params; // <--- CAMBIO 2: Hacemos await para obtener el ID

    const todo = await prisma.todo.findUnique({ // <--- CAMBIO 3: Usamos findUnique
        where: { id },
    });

    if (!todo) {
        return NextResponse.json(
            {
                message: `Todo con id ${id} no existe`,
            },
            {
                status: 404,
            }
        );
    }

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
})

export async function PUT(request: Request, { params }: Segments) {


    const todo = await getTodo((await params).id);

    if (!todo) {
        return NextResponse.json({ message: `Todo con id ${(await params).id} no exite` }, { status: 404 });
    }

    try {
        const { complete, description } = await putSchema.validate(await request.json());


        const updatedTodo = await prisma.todo.update({
            where: { id: (await params).id },
            data: { complete, description }
        })



        return NextResponse.json(updatedTodo);

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}