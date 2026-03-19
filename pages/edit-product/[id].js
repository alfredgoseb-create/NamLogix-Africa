import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import Layout from '../../components/Layout';
import ProductForm from '../../components/ProductForm';

export default function EditProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (!error) setProduct(data);
  }

  async function handleUpdate(updatedData) {
    setLoading(true);
    const { error } = await supabase
      .from('products')
      .update(updatedData)
      .eq('id', id);

    if (!error) {
      router.push('/');
    } else {
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Product</h1>
        {product ? (
          <ProductForm 
            initialData={product} 
            onSubmit={handleUpdate} 
            buttonText="Update Inventory" 
            loading={loading} 
          />
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </Layout>
  );
}