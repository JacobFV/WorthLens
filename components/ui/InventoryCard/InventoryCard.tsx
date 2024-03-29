import InventoryItem from "@/models/InventoryItem";

export default function InventoryCard({ item }: { item: InventoryItem }) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <p className="mt-2 text-gray-500">Scanned on: {item.scanned_at}</p>
      </div>
    );
  }