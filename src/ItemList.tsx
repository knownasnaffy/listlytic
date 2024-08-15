import React, { useEffect, useState } from "react";
import { Card } from "./components/ui/card";

interface Item {
  id: number;
  name: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Card className="p-4 font-normal text-lg">{item.name}</Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
