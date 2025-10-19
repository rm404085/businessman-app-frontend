import { IoEllipsisVertical } from "react-icons/io5";

const RentCard = ({item}) => {

    return(
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
             {/* Header */}
             <div className="flex items-center justify-between gap-2 p-2">
               <div className="flex items-center gap-2">
                 <div
                   
                 >
                  <img src={item.profile.photo} alt={item.profile.photo} className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.profile.photo} flex items-center justify-center font-bold text-lg`}/>
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-800">{item.rentName}</h3>
                   <p className="text-xs text-gray-500">{item.location}</p>
                 </div>
               </div>
             <div className="flex justify-center">
                 <button type="button" className="bg-slate-200 px-4 mr-4 rounded-full">Contact</button>
               <IoEllipsisVertical className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
             </div>
             </div>
            
       </div>
            
    )
}

export default RentCard;