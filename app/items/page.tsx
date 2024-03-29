import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import InventoryList from '@/components/InventoryList';

export default async function InventoryPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const { data: scannedItems, error } = await supabase
    .from('scanned_items')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.log(error);
    // Handle the error appropriately
  }

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          Inventory
        </h1>
        <InventoryList items={scannedItems} />
      </div>
    </section>
  );
}