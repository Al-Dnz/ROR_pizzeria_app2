import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState } from 'react';
import ApiFetchComponent from './api_fetch_component'
import YearSelectComponent from './select_component'
import Table from "./table";

// ==============================================================

// import { useEffect } from 'react';

// const ApiFetchComponent = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/yearly_data/2020');
//         if (!response.ok) {
//           throw new Error('Erreur lors de la récupération des données');
//         }
//         const jsonData = await response.json();
		
// 		console.log(jsonData)
//         setData(jsonData);
//       } catch (error) {
//        	 setError(error);
//       } finally {
//        	 setLoading(false);
//       }
//     };

// 	console.log("couocu")
//     fetchData();
//   }, []);

//   if (loading) return <p>Chargement...</p>;
//   if (error) return <p>Erreur: {error.message}</p>;
//   if (!data) return null;

//   return (
//     <div>
//       <h2>Données de l'API</h2>
//       <ul>
//         {
// 		// data.map((item, index) => (<li key={index}>{item.nom}</li> { "XXX" } ) ) 
// 		}
//       </ul>
//     </div>
//   );
// };

// export default ApiFetchComponent;


// ==============================================================


interface AppProps {
  arg: string;
}

const App = ({ arg }: AppProps) => {
  return <div>{`Welcome, ${arg}!`}</div>;
};

const fetchData = async (year) => {
	
	  const response = await fetch(`http://localhost:3000/yearly_data/${year}`);
	  if (!response.ok) {
		throw new Error('Erreur lors de la récupération des données');
	  }
	  const jsonData = await response.json();
	  return jsonData;
  };

document.addEventListener("DOMContentLoaded", async () => {
	const rootDiv = document.getElementById("root")!
	const root = ReactDOM.createRoot(rootDiv);
	// root.render(<App arg="Rails 7 with ESBuild" />);
	// root.render(<YearSelectComponent/>);
	const dataset = await fetchData("2020")
	root.render(<Table dataset={dataset}/>);
});