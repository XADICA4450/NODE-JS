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
        const res = await axios(`${BASE_URL}/data/search?description=${e.target.value.trim()}`)
        setData([...res.data.data])
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
      <div><input type="search" placeholder='Search data...' onChange={handleSearch} /></div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
           
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>
                  
                  <button onClick={() => {
                    if (window.confirm("Are you sure to delete?")) {
                      handleDelete(p.id)
                    }
                  }}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App
