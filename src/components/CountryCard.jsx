import { useUser } from '../context/UserContext';

const CountryCard = ({ country, onClick }) => {
  const { user, toggleFavorite } = useUser();

  const isFav = user?.favorites.includes(country.cca3);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer relative"
    >
      <img
        src={country.flags?.png}
        alt={country.name?.common}
        className="w-full h-40 object-cover"
        onClick={() => onClick(country)}
      />
      <div className="p-4" onClick={() => onClick(country)}>
        <h2 className="text-lg font-semibold mb-2">{country.name?.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      </div>

      {user && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(country.cca3);
          }}
          className={`absolute top-3 right-3 text-xl ${isFav ? 'text-red-500' : 'text-gray-400'} hover:scale-110`}
          title="Toggle Favorite"
        >
          ♥
        </button>
      )}
    </div>
  );
};

export default CountryCard;