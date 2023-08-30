import { useEffect, useState } from 'react';

function ShoesList() {
  const [shoes, setShoes] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/shoes/');

    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes)
    }
  };


  const handleDelete = async (shoeToDelete) => {
    const response = await fetch(`http://localhost:8080/api/shoes/${shoeToDelete.id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        setShoes(prevShoes => prevShoes.filter(shoe => shoe.id !== shoeToDelete.id))
    }
  };


  useEffect(()=>{
    getData()
  }, [])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Color</th>
          <th>Photo URL</th>
          <th>Bin</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {shoes.map(shoe => {
          return (
            <tr key={shoe.href}>
              <td>{ shoe.manufacturer }</td>
              <td>{ shoe.model_name }</td>
              <td>{ shoe.color }</td>
              <td>{ shoe.picture_url }</td>
              <td>{ shoe.bin }</td>
              <td>
                <button onClick={() => handleDelete(shoe)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ShoesList;
