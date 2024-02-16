import * as React from "react";
import { useState } from 'react';
import { useEffect } from 'react';

interface 	FetchProps {
	arg: string;
  }

const ApiFetchComponent =({ arg } ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/yearly_data/${arg}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const jsonData = await response.json();
		
		console.log(jsonData)
        setData(jsonData);
      } catch (error) {
       	 setError(error);
      } finally {
       	 setLoading(false);
      }
    };

	console.log("couocu")
    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;
  if (!data) return null;

//   return (
//     // <div>
//     //   <h2>Données de l'API</h2>
//     //   <ul>
// 	// 		{
// 	// 		// data.map((item, index) => (<li key={index}>{item.nom}</li> { "XXX" } ) ) 
// 	// 		}
//     //   </ul>
//     // </div>
//   )
};

export default ApiFetchComponent;