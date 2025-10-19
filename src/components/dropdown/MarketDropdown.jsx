import { useState } from "react";

const MarketDropdown = () => {
    
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");


 const locationData = {
  "Dhaka": {
    "districts": {
      "Dhaka": [
        "Dhanmondi",
        "Mirpur",
        "Uttara",
        "Tejgaon",
        "Motijheel",
        "Savar",
        "Keraniganj",
        "Demra"
      ],
      "Gazipur": ["Tongi", "Kaliakoir", "Sreepur", "Kapasia"],
      "Narayanganj": ["Sonargaon", "Rupganj", "Araihazar"],
      "Kishoreganj": ["Bhairab", "Katiadi", "Itna", "Karimganj"],
      "Manikganj": ["Saturia", "Ghior", "Daulatpur"],
      "Munshiganj": ["Tongibari", "Sirajdikhan", "Lohajang"],
      "Narsingdi": ["Belabo", "Raipura", "Shibpur"],
      "Tangail": ["Madhupur", "Mirzapur", "Basail", "Ghatail"]
    }
  },
  "Chattogram": {
    "districts": {
      "Chattogram": [
        "Kotwali",
        "Pahartali",
        "Sitakunda",
        "Raozan",
        "Patenga",
        "Boalkhali"
      ],
      "Cox's Bazar": ["Teknaf", "Ukhiya", "Ramu", "Chakaria"],
      "Cumilla": ["Burichang", "Daudkandi", "Chandina", "Barura"],
      "Feni": ["Sonagazi", "Parshuram", "Fulgazi"],
      "Noakhali": ["Begumganj", "Senbagh", "Sonaimuri"],
      "Brahmanbaria": ["Sarail", "Nabinagar", "Kasba"],
      "Khagrachari": ["Dighinala", "Panchhari", "Ramgarh"],
      "Rangamati": ["Kaptai", "Bilaichhari", "Langadu"]
    }
  },
  "Khulna": {
    "districts": {
      "Khulna": ["Batiaghata", "Dumuria", "Paikgachha"],
      "Bagerhat": ["Mollahat", "Kachua", "Rampal"],
      "Satkhira": ["Tala", "Kaliganj", "Shyamnagar"],
      "Jessore": ["Jhikargacha", "Sharsha", "Manirampur"],
      "Jhenaidah": ["Shailkupa", "Kaliganj", "Kotchandpur"],
      "Magura": ["Sreepur", "Mohammadpur", "Shalikha"],
      "Narail": ["Lohagara", "Kalia", "Naragati"]
    }
  },
  "Rajshahi": {
    "districts": {
      "Rajshahi": ["Boalia", "Motihar", "Paba", "Godagari"],
      "Natore": ["Baraigram", "Lalpur", "Singra"],
      "Pabna": ["Ishwardi", "Chatmohar", "Bera"],
      "Sirajganj": ["Kazipur", "Ullapara", "Belkuchi"],
      "Naogaon": ["Badalgachhi", "Manda", "Atrai"],
      "Joypurhat": ["Akkelpur", "Kalai", "Khetlal"]
    }
  },
  "Rangpur": {
    "districts": {
      "Rangpur": ["Gangachara", "Kaunia", "Badarganj"],
      "Dinajpur": ["Birganj", "Parbatipur", "Phulbari"],
      "Kurigram": ["Bhurungamari", "Nageshwari", "Rajarhat"],
      "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj"],
      "Gaibandha": ["Palashbari", "Sundarganj", "Gobindaganj"],
      "Nilphamari": ["Domar", "Jaldhaka", "Kishoreganj"]
    }
  },
  "Mymensingh": {
    "districts": {
      "Mymensingh": ["Trishal", "Muktagacha", "Phulpur"],
      "Jamalpur": ["Dewanganj", "Islampur", "Sarishabari"],
      "Netrokona": ["Barhatta", "Khaliajuri", "Atpara"],
      "Sherpur": ["Nalitabari", "Jhenaigati", "Sreebardi"]
    }
  },
  "Sylhet": {
    "districts": {
      "Sylhet": ["Beanibazar", "Golapganj", "Companiganj"],
      "Moulvibazar": ["Kamalganj", "Kulaura", "Rajnagar"],
      "Habiganj": ["Ajmiriganj", "Baniachong", "Madhabpur"],
      "Sunamganj": ["Jamalganj", "Tahirpur", "Biswambharpur"]
    }
  },
  "Barishal": {
    "districts": {
      "Barishal": ["Agailjhara", "Babuganj", "Banaripara"],
      "Bhola": ["Borhanuddin", "Char Fasson", "Daulatkhan"],
      "Jhalokathi": ["Kathalia", "Nalchity", "Rajapur"],
      "Patuakhali": ["Dumki", "Bauphal", "Mirzaganj"],
      "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria"]
    }
  }
};


  // Get lists dynamically
  const divisionList = Object.keys(locationData);
  const districtList = division ? Object.keys(locationData[division].districts) : [];
  const thanaList = division && district ? locationData[division].districts[district] : [];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap md:gap-10 gap-4 items-center justify-center bg-white md:p-6 p-3 rounded-xl  w-full">
        {/* Division Dropdown */}
        <div className="flex md:w-[350px] w-[105px] flex-col">
          <label className="text-sm md:text-4xl  font-semibold text-gray-600 mb-1">Division</label>
          <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setDistrict("");
              setThana("");
            }}
            className="border text-xs md:text-2xl border-gray-300 rounded-lg px-0 md:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
          >
            <option value="">Select Division</option>
            {divisionList.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        {division && (
          <div className="flex md:w-[350px] w-[105px] flex-col">
            <label className="text-sm  md:text-4xl font-semibold  text-gray-600 mb-1">District</label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setThana("");
              }}
              className="border text-xs md:text-2xl border-gray-300 rounded-lg px-0 md:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select District</option>
              {districtList.map((dis) => (
                <option key={dis} value={dis}>
                  {dis}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Thana Dropdown */}
        {district && (
          <div className="flex md:w-[350px] w-[105px] flex-col">
            <label className="text-sm md:text-4xl font-semibold text-gray-600 mb-1">Thana</label>
            <select
              value={thana}
              onChange={(e) => setThana(e.target.value)}
              className="border text-xs md:text-2xl border-gray-300 rounded-lg px-0 md:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select Thana</option>
              {thanaList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDropdown;
