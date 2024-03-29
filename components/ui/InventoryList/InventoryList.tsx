import InventoryCard from '@/components/ui/InventoryCard/InventoryCard';
import InventoryItem from '@/models/InventoryItem';

export default function InventoryList({ items }: { items: InventoryItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: InventoryItem) => (
        <InventoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}