import RentCard from "@/components/card/RentCard";
import RentDropdown from "@/components/dropdown/RentDropdown";
import { useEffect, useState } from "react";

const Rent = () => {

    const [rents, setRent] = useState([]);

    useEffect(()=>{

        fetch("/rent.json")
        .then((res)=> res.json())
        .then((data)=>{
            setRent(data)
        })

    }, [])

    return(
        <div>
           <div>
            <RentDropdown></RentDropdown>
           </div>
           <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
            {
                rents.map((item)=> (
                <RentCard key={item.id} item={item}></RentCard>
                ))
            }
           </div>
        </div>
    )
}

export default Rent;