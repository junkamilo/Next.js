import { CardCounter } from "@/src/components/shopping"





export const metadata = {
  title:'Counter Page',
  description : 'un simple contador'
}


export default function CounterPage() {

  

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      
      <CardCounter/>
      
    </div>
  )
}
