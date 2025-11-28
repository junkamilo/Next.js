import { redirect } from "next/navigation";
import Image from "next/image";


export default function HomePage() {
  //aca redirigimos al usuario al dasboard
  redirect('/dashboard/main');

  return (
    <>
    <h1>Hola mundo</h1>
    </>
  );
}
