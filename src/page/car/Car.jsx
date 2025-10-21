import CarCategory from "@/components/Category/carCategory/CarCategory";
import CarDropdown from "@/components/dropdown/CarDropdown";
import CarDropdownModal from "@/components/modal/cardropdownModal/CarDropdownModal";
import { useState } from "react";
import { TbArrowLeftRight } from "react-icons/tb";

const Car = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

    return(
        <div className=" mt-20">
            <div className="hidden md:block">
                <CarCategory></CarCategory>
            </div>
        
            <div className="hidden md:block">
<CarDropdown></CarDropdown>
            </div>

            <div className="md:hidden block">
               <div className="flex justify-center my-8">
  <button 
  onClick={()=> {
    setOpenModal(true);
  }}
   className="group flex items-center gap-3 bg-black/35 backdrop-blur-md text-white px-8 py-3 rounded-2xl text-2xl font-semibold shadow-md hover:bg-blue-600 transition-all duration-300 active:scale-95">
    <p>Select Car And Location</p>
    <span className="transition-transform duration-300 group-hover:rotate-180">
      <TbArrowLeftRight className="text-3xl" />
    </span>
  </button>
</div>
{/* ----- SHOW SELECTED RESULT ----- */}
      {(selectedCar || selectedLocation) && (
        <div className="mt-6 text-lg text-gray-800">
          <p>
            <strong>Car:</strong> {selectedCar || "—"}
          </p>
          <p>
            <strong>Location:</strong> {selectedLocation || "—"}
          </p>
        </div>
      )}
 {/* ----- MODAL ----- */}
      {openModal && (
        <CarDropdownModal
          setOpenModal={setOpenModal}
          setSelectedCar={setSelectedCar}
          setSelectedLocation={setSelectedLocation}
        />
      )}



            </div>
        </div>
    )
}

export default Car;