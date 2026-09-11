import React, { useContext } from 'react'
import Carousel from '../components/Carousel';
import Featured from '../components/Featured';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Vendor from '../components/Vendor';
import CartContext from '../context/CartContext';

function Home() {
  const { products } = useContext(CartContext);

  const grouped = products.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.entries(grouped)
    .sort((a, b) => b[1].length - a[1].length);
  
  const selectedProducts = sortedCategories
  .slice(0, 12) 
  .map(([category, items]) => items[0]);

  const categories = Object.values(
      products.reduce((acc, product) => {

          const category = product.category;

          if (!acc[category]) {
              acc[category] = {
                  name: category,
                  count: 0,
                  image: product.thumbnail
              };
          }

          acc[category].count++;

          return acc;

      }, {})
  ).sort((a, b) => b.count - a.count)
    .slice(0, 12);

  return (
    <div>
        <Carousel/>
        <Featured/>
        <Categories categories={categories}/>
        <Products products={selectedProducts}/>
        <Vendor/>
    </div>
  )
}

export default Home

