import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPoke = async () => {
    setLoading(true);

    const req = await fetch('https://pokeapi.co/api/v2/pokemon/');

    const res = await req.json();

    setPokemones(res.results);
  }


  useEffect(() => {
    getPoke();
  }, [])

  return (
    <main className='container'>
      <header>
        <h1>Poke Api</h1>
        <input type="text" placeholder='Ingrese un nombre'/>
      </header>
      <div className="row row-cols-1 row-cols-md-4 g-5">
        {pokemones.map(e => (
          <div className="col">
            <div class="card" style={{width: '18rem'}}>
              <img src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${e.name}.png`} class="card-img-top"/>
                <div class="card-body">
                  <h5 class="card-title">{e.name}</h5>
                  <button href="#" class="btn btn-primary">Ver más</button>
                </div>
            </div>
          </div>
        ))}

      </div>
    </main>
  )
}

export default App
