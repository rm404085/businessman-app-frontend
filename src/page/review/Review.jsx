import ReviewCard from "@/components/card/ReviewCard";
import { useEffect, useState } from "react";

const Review = () =>{


    const [reviews, setReviews] = useState([]);

    useEffect(()=>{

        fetch("/review.json")
        .then((res)=>res.json())
        .then((data)=>{
            setReviews(data);
        })


    }, [])



    return(
        <div className="grid grid-cols-1 lg:m-4 lg:gap-2 mt-4  lg:grid-cols-2">
           {
            reviews.map((review)=><ReviewCard key={review.id} review={review}></ReviewCard>)
           }
        </div>
    )
}

export default Review;