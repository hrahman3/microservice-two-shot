import React, { useEffect, useState } from 'react';

function HatForm() {
  const [locations, setLocations] = useState([])

  const [formData, setFormData] = useState({
    color: '',
    fabric: '',
    style_name: '',
    image_url: '',
    location: '',
  })

  const fetchData = async () => {
    const locationUrl = 'http://localhost:8100/api/locations/';
    const response = await fetch(locationUrl);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hatUrl = 'http://localhost:8090/api/hats/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(hatUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        color: '',
        fabric: '',
        style_name: '',
        image_url: '',
        location: '',
      });
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
    });
  }

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new Hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                        <label htmlFor="fabric">Fabric</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control" />
                        <label htmlFor="style_name">Style Name</label>
                    </div>
                    <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Image Url" required type="url" name="image_url" id="image_url" className="form-control" />
                            <label htmlFor="image_url">Image Url</label>
                            <select onChange={handleFormChange} required name="location" id="location"  className="form-select">
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                return (
                                <option key={location.id} value={location.id}>{location.closet_name}</option>
                                );
                            })}
                            </select>
                    </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
    );
}

export default HatForm;



































































// import React, {useEffect, useState } from 'react';


// function HatForm(props) {

//   const [styleName, setStyleName] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [color, setColor] = useState('');
//   const [fabric, setFabric] = useState('');
//   const [location, setLocation] = useState('');
//   const [locations, setLocations] = useState([]);

//   const handleStyleNameChange = (event) => {
//     const value = event.target.value;
//     setStyleName(value);
//   }

//   const handleImageUrlChange = (event) => {
//     const value = event.target.value;
//     setImageUrl(value);
//   }

//   const handleColorChange = (event) => {
//     const value = event.target.value;
//     setColor(value);
//   }

//   const handleFabricChange = (event) => {
//     const value = event.target.value;
//     setFabric(value);
//   }





//     const fetchData = async() => {
//         const url ='http://localhost:8100/api/locations/';

//       const response = await fetch(url);

//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//             setLocations(data.locations);
//         }

//     }

//   useEffect(() => {
//     fetchData();

//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (response.ok) {
//         const newHat = await response.json();
//         console.log(newHat);

//         setStyleName('');
//         setImageUrl('');
//         setColor('');
//         setFabric('');
//         setLocation('');
//     }

//     const data = {};

//     data.style_name = styleName;
//     data.image_url = imageUrl;
//     data.color = color;
//     data.fabric = fabric;
//     data.location = location;

//     console.log(data);

//     const hatUrl = 'http://localhost:8090/api/hats/';
//     const fetchConfig = {
//         method: "post",
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };

//     const response = await fetch(hatUrl, fetchConfig);
//     if (response.ok) {
//         const newHat = await response.json();
//         console.log(newHat)
//     }
//   }




//   return(
//     <div className="row">
//       <div className="offset-3 col-6">
//         <div className="shadow p-4 mt-4">
//           <h1>Create a new location</h1>
//           <form onSubmit={handleSubmit} id="create-location-form">
//             <div className="form-floating mb-3">
//               <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" id="name" name="name" className="form-control"/>
//               <label htmlFor="name">Name</label>
//             </div>
//             <div className="form-floating mb-3">
//               <input value={roomCount} onChange={handleRoomCountChange} placeholder="Room count" required type="number" id="room_count" name="room_count" className="form-control"/>
//               <label htmlFor="room_count">Room count</label>
//             </div>
//             <div className="form-floating mb-3">
//               <input value={city} onChange={handleCityChange} placeholder="City" required type="text" id="city" name="city" className="form-control"/>
//               <label htmlFor="city">City</label>
//             </div>
//             <div className="mb-3">
//             <select value={state} onChange={handleStateChange} required name="state" id="state" className="form-select">
//                 <option value="">Choose a state</option>
//                 {states.map(state => {
//                   return (
//                     <option key={state.abbreviation} value={state.abbreviation}>
//                       {state.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <button className="btn btn-primary">Create</button>
//           </form>
//         </div>
//       </div>
//     </div>
//     );


// } export default HatForm;
