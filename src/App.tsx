import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ItemList, { Item } from "./ItemList";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";

function App() {
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
        setTimeout(() => { // Temporary gap for the visibility of the loader in development
          setLoading(false);
        }, 1000);
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
  return (
    <>
      <div className="h-screen bg-background flex max-md:mt-4 md:items-center justify-center">
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

          <Separator />
          {loading ? (
            <div className="text-center animate-pulse">Loading...</div>
          ) : (
            <ItemList items={filteredItems} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
