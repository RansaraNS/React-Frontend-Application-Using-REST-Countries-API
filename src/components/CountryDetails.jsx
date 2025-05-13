import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/countryService';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountryByCode(code);
        setCountry(data[0]);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchData();
  }, [code]);

  if (!country) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={country.flags?.svg}
          alt={country.name?.common}
          className="w-full md:w-1/2 h-auto rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{country.name?.common}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Official Name:</strong> {country.name?.official}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
            <p><strong>Borders:</strong> {country.borders ? country.borders.join(', ') : 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
