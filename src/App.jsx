import { useEffect, useState } from 'react'
import './App.css'
import Spinner from './components/Spinner';
import 'aos/dist/aos.css';
import Aos from 'aos';

function App() {

  const [pokemones, setPokemones] = useState([]);
  const [searchPoke, setSearchPoke] = useState([]);
  const [filter, setFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);

  const result = filter ? searchPoke.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())) : pokemones

  const getPoke = async (limit) => {
    setLoading(true);

    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);

    const res = await req.json();

    if (req.ok) {
      setLoading(false);
      setPokemones(res.results);
    }
  }

  const getSearchPoke = async () => {
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
    const res = await req.json();
    setSearchPoke(res.results);
  }


  useEffect(() => {
    getPoke(limit);
  }, [limit])

  useEffect(()=>{
    getSearchPoke();
    Aos.init()
  },[])

  return (
    <main className='container'>
      <header>
        <h1>Pokedex</h1>
        <input type="text" placeholder='Ingrese un nombre' onChange={({ target }) => setFilter(target.value)} />
      </header>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {result.map(poke => (
          <div className="col" data-aos="flip-up" key={poke.name}>
            <div className="card" style={{ width: '16rem' }}>
              <img src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${poke.name}.png`} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{poke.name}</h5>
                <button href="#" className="btn btn-primary">Ver más</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='button-group'>
        <button className='btn btn-primary' disabled={limit === 12 ? true : false} type='button' onClick={() => setLimit(limit - 12)}>Cargar menos</button>
        <button type='button' className='btn btn-primary' onClick={() => setLimit(limit + 12)}>{loading ? <Spinner /> : 'Cargar más'}</button>
      </div>
    </main>

  )
}

export default App
