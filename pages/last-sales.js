import { useEffect, useState } from 'react';
import useSWR from 'swr';

const SALES_URL = 'https://zz-prj-react-default-rtdb.firebaseio.com/sales.json';

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(SALES_URL);

  // useEffect is used to format the data recieved from the API
  // Alternatively could provide a cusotom fetcher 
  // function to useSWR as 2nd arg
  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   async function getSales() {
  //     setIsLoading(true);

  //     const response = await fetch(SALES_URL);
  //     const data = await response.json();

  //     const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //   }

  //   getSales();
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(SALES_URL);
  const data = await response.json();

  console.log({ staticSalesBackend: data });

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { 
    props: { sales: transformedSales },
    // revalidate: 10
  };
}

export default LastSalesPage;
