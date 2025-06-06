import supabase from './supabase';

export async function createOrder(user_id, items, total) {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id, items, total }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getOrdersByUser(user_id) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
