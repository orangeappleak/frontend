"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {

  const router = useRouter();

  interface Expert {
    availability: string,
    description: string,
    name: string,
    id: number,
    expertise: string,
    location: string,
    rating: string,
  }

  interface filters {
    expertise: string[],
    location: string[],
    rating: string[]
  }

  const [expertData, setExperts] = useState<Expert[]>([]);
  const [updateSignal, setUpdateSignal] = useState(false);
  const [popUpActive, setPopUpActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    expertise: 'all',
    location: 'all',
    rating: 'all',
  });

  useEffect(() => {
    fetchExperts();
  }, []);

  useEffect(() => {

  }, [expertData])

  const filterOptions: filters = {
    expertise: ['all', 'Tax Accounting', 'CFO Services', 'Revenue Operations'],
    location: ['all', 'New York', 'Chicago', 'San Francisco'],
    rating: ['all', '4.5+', '4.0+', '3.5+', '3.0+']
  };

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: value
    }));
  };

  const handleRegisterClick = (e: any) => {
    router.push('/register');
  }

  const fetchExperts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/experts');
      const data = await response.json();
      setExperts(data);
    } catch (error) {
      console.error('Error fetching experts:', error);
    }
  };

  const filteredExperts = expertData.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = activeFilters.expertise === 'all' || expert.expertise === activeFilters.expertise;
    const matchesLocation = activeFilters.location === 'all' || expert.location === activeFilters.location;

    const matchesRating = activeFilters.rating === 'all' || parseFloat(expert.rating) >= parseFloat(activeFilters.rating)

    return matchesSearch && matchesExpertise && matchesLocation && matchesRating;
  });

  return (
    <div className="container mx-auto p-4 pt-10 box-border">
      <div id="header-content" className="w-full flex flex-row justify-between items-end">
        <div id="header">
          <h1 className="text-7xl font-medium mb-5">Find Financial Experts</h1>
          <p className="font-light">Connect with verified financial professionals for your business needs</p>
        </div>
        <div id="login-register-wrapper" className="flex flex-row">
          <div id="login-button" className="mx-2">
            <div className="bg-blue-500 px-8 rounded-lg py-3">
              <h1 className="text-white pointer-events-none">Login</h1>
            </div>
          </div>
          <div id="register-button" onClick={handleRegisterClick} className="mx-2">
            <div className="border-blue-500 border-2 rounded-lg px-8 py-3 pointer-events-none">
              <h1 className="pointer-events-none">Register</h1>
            </div>
          </div>
        </div>
      </div>

      <div id="filter-bar-wrapper" className="flex-row flex my-10 justify-center h-[5vh]">
        <div id="search-bar" className="flex-row flex-1 w-full h-full rounded-lg flex p-1 items-center border-2 border-gray-600">
          <Image alt="none" src="https://img.icons8.com/?size=100&id=KPmthqkeTgDN&format=png&color=000000" width={25} height={25} />
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id="helper-text" aria-describedby="helper-text-explanation" className="bg-transparent border-none focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Search for financial expert.." />
        </div>
        <div id="filter-options-wrapper" className="flex items-center h-full">
          {Object.entries(filterOptions).map(([category, options]) => (
            <select
              key={category}
              className="border border-black/25 rounded-lg h-full m-2 px-4 py-1"
              onChange={(e) => handleFilterChange(category, e.target.value)}
            >
              {options.map((option: any) => (
                <option key={option} value={option}>
                  {option === 'all' ? `All ${category}` : option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      <div>
        {expertData.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {filteredExperts.map((expert, index) => (
              <ExpertCard key={index} expertData={expert} index={index} />

            ))}
          </div>
        ) : (
          <p>No experts found. Please try different filters.</p>
        )}
      </div>
    </div>
  );
}

interface ExpertDataProps {
  expertData: any,
  index: number
}

const ExpertCard: React.FC<ExpertDataProps> = ({ expertData }) => {
  return <div className="rounded-2xl h-[40vh] px-5 py-10 shadow-none hover:shadow-2xl border-black/20 border-2 hover:shadow-black/50 flex flex-col justify-between translate-y-0 hover:-translate-y-3 transition-all duration-300 ease-in-out">
    <h1 className="font-bold text-4xl">{expertData.name}</h1>
    <div id="expert-secondary-data">
      <p><strong className="text-black/20">Expertise:</strong> {expertData.expertise}</p>
      <p><strong className="text-black/20">Location:</strong> {expertData.location}</p>
      <p><strong className="text-black/20">Rating:</strong> {expertData.rating}</p>
    </div>
  </div>
}


export default Home;

