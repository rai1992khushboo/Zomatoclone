import {useEffect} from "react";
import {useState} from "react";
import{useNavigate} from "react-router-dom";
import Header from "./Header";

const Home=()=>{


  let[mealTypes,setMealTypes]=useState([]);
  let [placeHolderText,setPlaceHolderText]=useState("Get the location");
  let [locations,setLocations]=useState([]);
  let[restaurantList,setRestaurantList]=useState([]);
//cerate instance of navigate
let navigate = useNavigate();

  let getMealTypes =async ()=>{
    let url = `http://localhost:3030/api/get-meal-type-list`
    let response =  await fetch(url,{method:'GET'});
    let data = await response.json()
    setMealTypes(data.result)
  };



  let getLocationList=async()=>{
    setPlaceHolderText("Getting location List..");
    setRestaurantList([]);
    let url = `http://localhost:3030/api/get-locations-list`
    let response =  await fetch(url,{method:'GET'});
    let data = await response.json()
    setLocations(data.result);
    setPlaceHolderText("Here is locations list");
  };

  let getRestaurantListByLocationId=async(id,name,city)=>{
    try{
      let url = `http://localhost:3030/api/get-restaurant-list-by-location-id/${id}`;
      let response = await fetch(url, {method:"GET"});
      let data = await response.json();
      console.log(data);
      if(data.result.length == 0){
        alert('No restaurant avilable in this location.')
      }
      setPlaceHolderText(`${name},${city}`);
      setLocations([])
      setRestaurantList(data.result);
    } catch(error){
      console.log(error)
    }
  }

  //mounting
  useEffect(()=>{
    getMealTypes();
  }, []);
  console.log(mealTypes);
    return(
        <>
        
        <section className="main-section">
      
      <Header/>
      <p className="brand-logo">e!</p>
      <p className="main-section-text">
        Find the best restaurants, cafés, and bars
      </p>
      <section className="search w-50">
        <section className="w-100  location-list">
        <input
          className="input location-search w-100"
          type="text"
          placeholder={placeHolderText}
          readOnly
          onFocus={getLocationList}
          
        />
            <ul className="list-group">
  {
    locations.map((loc)=>{
      return<li className="list-group-item" onClick={()=>getRestaurantListByLocationId(loc.location_id,loc.name,loc.city)} key={loc._id}>{loc.name},{loc.city} </li>
    })
    
  }
</ul>
        
        </section>
        <section className="w-100  location-list">
        <section className="restaurant-search w-100 mx-3  ">
          <span
            ><i className="fa fa-search search-icon" aria-hidden="true"></i
          ></span>
          <input
            className="input"
            type="text"
            placeholder="search for restaurant"
            readOnly
          />
        </section>
        <ul className="list-group mx-3">
  {
    restaurantList.map((restaurant)=>{
      return<li className="list-group-item"  key={restaurant._id} onClick= {()=>navigate('/restaurant/'+restaurant._id)}>
        <img src={`/images/${restaurant.image}`}alt=""
        className="me-2" style={{width:"40px", height:"40px",borderRadius:"20px"}}/>{restaurant.name},{restaurant.city} </li>
    })
    
  }
</ul>
        </section>
      </section>
    </section>
    {/* <!-- <section>section-2</section> --> */}
    <section className="meal-type">
      <h1 className="meal-type-title">Quick Searches</h1>
      <p className="meal-type-sub-title">Discover restaurants by type of meal</p>
      <section className="meal-type-list">

       {
         mealTypes.map((value, index)=>{
          return(
            <section onClick={()=>navigate(`/search/${value.meal_type}/${value.name}`)} key={value._id} className="meal-type-list-item">
            <div className="list-item-image">
              <img src={`./images/${value.image} `}alt="" />
            </div>
            <section className="list-item-content">
              <h3 className="list-item-content-title">{value.name}</h3>
              <p className="list-item-content-sub-title">
                {value.content}
              </p>
            </section>
          </section>
          )
         })
        

      }
      </section>
    </section>
    
        </>
    );
};


export default Home