import React, { useEffect, useState } from "react";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { Search, User } from "lucide-react";

interface Item {
  id: number;
  name: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data); // Initially set the filtered items as all items
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter the items based on the search query
    const result = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(result);
  }, [searchQuery, items]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Who's secret do you need?</h1>

      <div className="relative">
        <Search className="h-4 w-4 absolute top-1/2 left-4 stroke-muted-foreground transform -translate-y-1/2" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items..."
          className="pl-10"
        />
      </div>

      <Separator></Separator>

      <ul className="space-y-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id}>
              <Card className="py-2 px-4 font-normal inline-flex w-full gap-2 items-center"><User className="h-4 w-4 " /> {item.name}</Card>
            </li>
          ))
        ) : (
          <li className="text-center text-muted-foreground">No items found</li>
        )}
      </ul>
    </div>
  );
};

export default ItemList;
