import { useEffect, useState } from 'react';

function HatList(props) {
  const [hats, setHats] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/hats');

    if (response.ok) {
      const data = await response.json();
      setHats(data.hats)
    }
  };



  const handleDelete = async (hatToDelete) => {
    const response = await fetch(`http://localhost:8090/api/hats/${hatToDelete.id}`,{
      method:"DELETE",

    });

    if(response.ok) {
      setHats(prevHats => prevHats.filter(hat => hat.id != hatToDelete.id))

    }
  };


  useEffect(()=>{
    getData()
  },[])




  return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Style Name</th>
            <th>Location</th>
            <th>Color</th>
            <th>Fabric</th>
          </tr>
        </thead>
        <tbody>
          {props.hats.map(hat => {
            return (
              <tr key={hat.id}>
                <td>{ hat.style_name }</td>
                <td>{ hat.location }</td>
                <td>{ hat.color }</td>
                <td>{ hat.fabric }</td>
                <td>
                  <button onClick={() => handleDelete(hat)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default HatList;
