import { SimpleWidget } from "@/src/components";

export default function MainPage(){
    return(
        <div className="text-black">
            <h1 className="mt-2 text-3xl">Dasboard</h1>
            <span>Informacion General</span>

        <div className="flex flex-wrap p-2">
        <SimpleWidget/>

        </div>
        
        </div>
    )
}