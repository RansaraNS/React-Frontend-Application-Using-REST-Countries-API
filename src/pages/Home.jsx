import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CountryCard from '../components/CountryCard';

import { useUser } from '../context/UserContext';

import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from '../services/countryService';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        if (search) {
          const data = await getCountryByName(search);
          setCountries(data);
        } else if (region) {
          const data = await getCountriesByRegion(region);
          setCountries(data);
        } else {
          const data = await getAllCountries();
          setCountries(data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, [search, region]);

  const handleCardClick = (country) => {
    navigate(`/country/${country.cca3}`);
  };

  // 🔍 Filter favorites if toggle is ON
  let filteredCountries = countries;
  if (showFavoritesOnly && user) {
    filteredCountries = countries.filter((c) => user.favorites.includes(c.cca3));
  }

  return (
    <>
      <NavBar />
      <div className="px-6 py-6">
        <SearchBar searchTerm={search} onSearchChange={setSearch} />
        <FilterBar selectedRegion={region} onRegionChange={setRegion} />

        {/* ✅ Favorites Toggle */}
        {user && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-4 py-2 rounded ${
                showFavoritesOnly
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:opacity-90 transition`}
            >
              {showFavoritesOnly ? 'Showing Favorites' : 'Show Favorites Only'}
            </button>
          </div>
        )}

        {filteredCountries.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No countries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;