import ShortCard from "@/components/card/ShortCard";
import { useEffect, useState } from "react";

const Short = () => {


  const [shorts,setShorts] = useState([]);

  useEffect(()=>{

    fetch("/shorts.json")
    .then((res)=> res.json())
    .then((data)=>{
      setShorts(data)
    })


  }, [])


  return (
    <div className="grid grid-cols-1 lg:mx-40 mt-8 lg:grid-cols-4 gap-4">
       {
        shorts.map((short)=><ShortCard key={short.id} short={short} ></ShortCard>)
       }
    </div>
  )
}

export default Short;