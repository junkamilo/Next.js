import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {

    //esto sirve para agregar parametros a las url los requestparams
    const { searchParams } = new URL(request.url);
    const take = searchParams.get('take') ?? '10';
    const skip = searchParams.get('skip') ?? '0';
    if (isNaN(+take)) {
        return NextResponse.json({ message: 'Take tiene que ser un numero' }
            ,
            {
                status: 400
            }
        );
    }
    if (isNaN(+skip)) {
        return NextResponse.json({ message: 'skip tiene que ser un numero' }
            ,
            {
                status: 400
            }
        );
    }

    //llamamos los datos ingresados
    const todos = await prisma.todo.findMany({
        take: +take,
        skip: +skip
    });
    console.log(todos);

    //mandamos a llamar todos los todos y lo transformamos en json
    return NextResponse.json(todos);

}

//creamos una validacion para el momento de envair los datos en post
const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {

    try {
        //aca colocamos la validacion que creamos
        const { complete , description } = await postSchema.validate(await request.json());

        const todo = await prisma.todo.create({ data: { complete , description } })

        return NextResponse.json({
            todo
        });
    } catch (error) {

        return NextResponse.json(error,{status:400});

    }


}