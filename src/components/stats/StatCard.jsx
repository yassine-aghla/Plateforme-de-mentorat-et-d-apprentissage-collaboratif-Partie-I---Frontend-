
const StatCard = ({ title, stats }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        {Object.entries(stats).map(([key, value]) => (
          <p key={key} className="text-gray-600">
            {key.replace('_', ' ')}: <span className="font-semibold">{value}</span>
          </p>
        ))}
      </div>
    );
  };
  
  export default StatCard;