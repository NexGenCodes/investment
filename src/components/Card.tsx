interface CardProps {
    title: string;
    value: string;
    change: string;
  }
  
  export default function Card({ title, value, change }: CardProps) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{change}</p>
      </div>
    );
  }