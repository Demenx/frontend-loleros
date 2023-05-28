import React, { useState, useEffect} from 'react';
import './App.css';  // Make sure you import your tailwind styles here
import axios from 'axios';


const PlayerRecord = ({ player, position }) => (
  <div className="flex items-center my-4">
    <img className="w-14 h-14 rounded-full mr-4" src={player.foto} alt={player.nombre} />
    <div className="text-sm">
      <p className="text-gray-900 leading-none">{player.nombre}</p>
      <p className="text-gray-600">{`Posicion: ${position}, Racha Derrota: ${player.racha}`}</p>
    </div>
  </div>
);

function App() {

  const [rachas, setRachas] = useState([])
  const [record, setRecord] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://backend-loleros.vercel.app/api/racha')
      .then(response => {
        console.log('promise fulfilled')
        setRachas(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://backend-loleros.vercel.app/api/record')
      .then(response => {
        console.log('promise fulfilled')
        setRecord(response.data)
      })
  }, [])

  console.log(rachas)
  console.log(record)
  
  const rachasOrdenadas = rachas.sort((a, b) => b.racha - a.racha);

  console.log(rachasOrdenadas)
  
  
 return (
  <div className="flex flex-col min-h-screen">
    <header className="p-6 bg-blue-500 text-white text-xl">
      <h1>Lol - Solo para loleros</h1>
    </header>

    <main className="flex-grow flex flex-col items-center p-6 bg-gray-100">
      <div className="text-center mb-4">
        <img className="w-32 h-32 rounded-full mx-auto" src={record.foto} alt={record.nombre} />
        <div className="text-xl mt-4">{record.nombre}</div>
        <div className="text-gray-600">{`Racha de defeats historica: ${record.racha}`}</div>
      </div>

      <div className="p-6 w-full">
        <h2 className="text-xl mb-4">Racha de Derrotas:</h2>
        <div className="flex flex-wrap justify-center">
          {rachasOrdenadas.map((player, index) => 
            <PlayerRecord key={player.id} player={player} position={index + 1} />)}
        </div>
      </div>
    </main>
  </div>
);
}

export default App;
