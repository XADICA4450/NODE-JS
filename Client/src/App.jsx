import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'



function App() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const BASE_URL = "http://localhost:8080"

  const getData = async () => {
    try {
      setLoading(true)
      const res = await axios(`${BASE_URL}/data`)
      
      setData(res.data.data)
      // console.log(res.data.data);
      

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (pId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/data/${pId}`)

      console.log(res);

      if (res.status === 200) {
      
        setData([...data.filter((p) => p.id !== pId)])
      } else {
        throw new Error("failed to delete")
      }

    } catch (error) {
      console.log(error);
    }
  }

  let timeout = null
  const handleSearch = (e) => {
    clearTimeout(timeout)
    try {
      timeout = setTimeout(async () => {
        const res = await axios(`${BASE_URL}/data/search?name=${e.target.value.trim()}`)
        setProducts([...res.data.data])
      }, 500);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <>

      <div><input type="search" placeholder='search data..' onChange={handleSearch} /></div>
      <ul>
        {data.length > 0 && data.map((p) => {
          return <li key={p.id}><span>{p.description}</span> <button onClick={() => {
            if (window.confirm("are u sure to delete??")) {
              handleDelete(p.id)
            }
          }}>delete</button></li>
        })}
      </ul>
    </>
  )
}

export default App