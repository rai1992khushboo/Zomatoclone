import Header from './Header';
import {useEffect} from "react";
import {useState} from "react";
import{useParams} from "react-router-dom";
import axios from 'axios';
import{useNavigate} from "react-router-dom";
const Search=()=> {
  let navigate = useNavigate();
  let{name}= useParams();
  let {meal_id, meal_type_name} = useParams();
  let [locations,setLocations]=useState([]);
  let [restaurantList,setRestaurantList]=useState([]);
  let[filterOptions, setFilterOptions]=useState({meal_type:meal_id,});
  let getLocationList=async()=>{
    try{
    
    let url = `http://localhost:3030/api/get-locations-list`
    let response =  await fetch(url,{method:'GET'});
    let data = await response.json()
    setLocations(data.result);
  } catch(error){
    
  }
};
const getFilterData=async()=>{
  let url=`http://localhost:3030/api/filter`;
  let {data}=await axios.post(url,{...filterOptions});
  setRestaurantList(data.result);
  console.log(data.result);
};
const filter=async(type,event)=>{
  let{value}=event.target;
  switch(type){
    case 'loc':
       if(value=== ""){
       delete filterOptions.location;
       }else{
        filterOptions["location"]= value;
       }
    break;
    case "sort":
      filterOptions["sort"]= value;
      break;
      case 'cuisine':
        if(event.target.checked=== true){
       if(filterOptions["cuisine_id"] !== undefined){
        let isIncluded = filterOptions["cuisine_id"].includes(Number(value));
        if(isIncluded === false){
          filterOptions["cuisine_id"]= [...filterOptions["cuisine_id"],
        Number(value)];
        }
       }else{
        filterOptions["cuisine_id"]= [Number(value)];
       } 
        
      }else{
        let cuisine = filterOptions["cuisine_id"].filter((id)=> Number(value) !== id);
        if(cuisine.length=== 0){
          delete filterOptions.cuisine;
        }else{
          filterOptions["cuisine_id"]=[...cuisine];
        }
       } 
      
      break;
    default:
      break;

  }
  setFilterOptions({...filterOptions});
};
  
  
useEffect(()=>{
  getLocationList();
},[]);
useEffect(()=>{
  getFilterData();
},[filterOptions]);
  
  // console.log(params);
    return(
        <>
        <section className="bg-light">
    {/* <!-- login form starts --> */}
    <div
      className="modal fade"
      id="login"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Login</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <section className="p-2">
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
                <label htmlFor="">Email</label>
              </div>

              <div className="form-floating mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
                <label htmlFor="">Password</label>
              </div>
            </section>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-success">Login</button>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- login end --> */}
    {/* <!-- create account starts --> */}
    <div
      className="modal fade"
      id="create-account"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Create a new account
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <section className="p-2">
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
                <label htmlFor="">Name</label>
              </div>

              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
                <label htmlFor="">Email</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile No"
                />
                <label htmlFor="">Mobile No</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
                <label htmlFor="">Password</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Confirm Password"
                />
                <label htmlFor="">Confirm Password</label>
              </div>
            </section>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-success">Sign-up</button>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- create account end --> */}

    
      {/* <!-- 1st section --> */}
      <Header bgColor="bg-danger" />

      {/* <!-- 2nd section --> */}
      <section className="row">
        <section className="col-11 m-auto col-md-11 col-lg-10">
          <p className="my-3 fw-bold fs-2">{name} Places Near By</p>
          <section className="row gap-5">
            <section
              className="col-lg-3 col-md-4 col-12 shadow-sm bg-white p-2 px-3"
            >
              <p className="fw-bold mb-2 d-none d-lg-flex d-md-flex">Filters</p>
              <p
                className="fw-bold mb-2 d-lg-none d-md-none d-flex justify-content-between"
                data-bs-toggle="collapse"
                data-bs-target="#search"
              >
                <span>Filter/Sort</span>
                <span className="fa fa-eye"></span>
              </p>
              {/* <!-- hide --> */}
              <aside id="search" className="collapse d-lg-block d-md-block">
                <div>
                  <label htmlFor="" className="form-label">Select Location</label>
                  <select name="" id="" onChange={(event)=>filter("loc",event)}className="form-select rounded-0">
                    <option value="">Select</option>
                    {locations.map((loc)=>{
                     return ( <option key={loc.id} value={loc.locations_id}>{loc.name},{loc.city}</option>)
                    })}
                   
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="" className="form-label fw-bold text-primary">Cuisine</label>
                  <div className="form-check ms-2">
                    <input type="checkbox" value={1} onChange={(event)=>filter("cuisine", event)}   className="form-check-input" />
                    <label htmlFor="" className="form-check-label">North Indian</label>
                  </div>
                  <div className="form-check ms-2">
                    <input type="checkbox"  value={2} onChange={(event)=>filter("cuisine", event)}    className="form-check-input" />
                    <label htmlFor="" className="form-check-label">South Indian</label>
                  </div>
                  <div className="form-check ms-2">
                    <input type="checkbox" value={3} onChange={(event)=>filter("cuisine", event)}    className="form-check-input" />
                    <label htmlFor="" className="form-check-label">Chines</label>
                  </div>
                  <div className="form-check ms-2">
                    <input type="checkbox" value={4} onChange={(event)=>filter("cuisine", event)}   className="form-check-input" />
                    <label htmlFor="" className="form-check-label">Fast Food</label>
                  </div>
                  <div className="form-check ms-2">
                    <input type="checkbox" value={5} onChange={(event)=>filter("cuisine", event)}   className="form-check-input" />
                    <label htmlFor="" className="form-check-label">Street Food</label>
                  </div>
                </div>

                {/* <!-- cost for 2 --> */}
                <div className="my-2">
                  <label htmlFor="" className="form-label fw-bold text-primary"
                    >Cost For Two</label
                  >
                  <div className="form-check ms-2">
                    <input type="radio" name="costForTwo" className="form-check-input" />
                    <label htmlFor="" className="form-check-label"
                      >Less than ` 500</label
                    >
                  </div>
                  <div className="form-check ms-2">
                    <input type="radio" name="costForTwo" className="form-check-input" />
                    <label htmlFor="" className="form-check-label"
                      >` 500 to ` 1000</label
                    >
                  </div>
                  <div className="form-check ms-2">
                    <input type="radio" name="costForTwo" className="form-check-input" />
                    <label htmlFor="" className="form-check-label"
                      >` 1000 to ` 1500</label
                    >
                  </div>
                  <div className="form-check ms-2">
                    <input type="radio" name="costForTwo" className="form-check-input" />
                    <label htmlFor="" className="form-check-label"
                      >` 1500 to ` 2000</label
                    >
                  </div>
                  <div className="form-check ms-2">
                    <input type="radio" name="costForTwo" className="form-check-input" />
                    <label htmlFor="" className="form-check-label">` 2000+</label>
                  </div>
                </div>

                {/* <!-- sort --> */}
                <div className="my-2">
                  <label  className="form-label fw-bold text-primary">Sort</label>
                  <div className="form-check ms-2">
                    <input type="radio" name="sort" className="form-check-input" value="1" onChange={(event)=>filter('sort',event)} />
                    <label htmlFor="" className="form-check-label"
                      >Price low to high</label
                    >
                  </div>
                  <div className="form-check ms-2">
                    <input type="radio"  name="sort" className="form-check-input"  value="-1" onChange={(event)=>filter('sort',event)} />
                    <label htmlFor="" className="form-check-label"
                      >Price high to low</label
                    >
                  </div>
                </div>
              </aside>
              {/* <!-- hide --> */}
            </section>
            <section className="col-lg-8 col-md-7 px-0 px-lg-2 px-md-2">
            {
              restaurantList.map((restaurant,index)=>{
                 return(
                  <section className="shadow-sm bg-white p-3 px-4 mb-3">
                <section className="d-flex gap-3 align-items-center" key={restaurant._id}
                onClick= {()=>navigate('/restaurant/'+restaurant._id)}>
                  <img
                    src={restaurant.image}
                    alt=""
                    className="restaurant-image"
                  />
                  <section>
                    <p className="fs-3 fw-bold text-dark-blue">
                      {restaurant.name}
                    </p>
                    <p className="fw-bold text-dark-blue">{restaurant.locality}</p>
                    <p className="text-muted">
                      {restaurant.locality},{restaurant.city}
                    </p>
                  </section>
                </section>
                <hr />
                <section className="d-flex gap-5">
                  <section>
                    <p>CUISINES:</p>
                    <p>COST FOR TWO:</p>
                  </section>
                  <section className="fw-bold">
                    <p>{restaurant.cuisine.map((value,index)=>{
                      return value.name
                    }).join(",")}</p>
                    <p>{restaurant.min_price}</p>
                  </section>
                </section>
              </section>
                 )
              })
            }
              <section className="shadow-sm bg-white p-3 px-4 mb-3">
                <section className="d-flex gap-3 align-items-center">
                  <img
                    src="./images/meal-type.png"
                    alt=""
                    className="restaurant-image"
                  />
                  <section>
                    <p className="fs-3 fw-bold text-dark-blue">
                      The Big Chill Cakery
                    </p>
                    <p className="fw-bold text-dark-blue">FORT</p>
                    <p className="text-muted">
                      Shop 1, Plot D, Samruddhi Complex, Chincholi …
                    </p>
                  </section>
                </section>
                <hr />
                <section className="d-flex gap-5">
                  <section>
                    <p>CUISINES:</p>
                    <p>COST FOR TWO:</p>
                  </section>
                  <section className="fw-bold">
                    <p>Bakery</p>
                    <p>₹700</p>
                  </section>
                </section>
              </section>
              {/* <section className="shadow-sm bg-white p-3 px-4 mb-3">
                <section className="d-flex gap-3 align-items-center">
                  <img
                    src="./images/meal-type.png"
                    alt=""
                    className="restaurant-image"
                  />
                  <section>
                    <p className="fs-3 fw-bold text-dark-blue">
                      The Big Chill Cakery
                    </p>
                    <p className="fw-bold text-dark-blue">FORT</p>
                    <p className="text-muted">
                      Shop 1, Plot D, Samruddhi Complex, Chincholi …
                    </p>
                  </section>
                </section>
                <hr />
                <section className="d-flex gap-5">
                  <section>
                    <p>CUISINES:</p>
                    <p>COST FOR TWO:</p>
                  </section>
                  <section className="fw-bold">
                    <p>Bakery</p>
                    <p>₹700</p>
                  </section>
                </section>
              </section> */}
              <section>
                <ul
                  className="list-unstyled d-flex justify-content-center gap-4 zomato-paging"
                >
                  <li>
                    <span className="fa fa-angle-left"></span>
                  </li>
                  <li className="zomato-paging-active">1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>
                    <span className="fa fa-angle-right"></span>
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </section>
      </section>
  

    {/* <!-- tr td  ==> tables--> */}
  </section>
        </>
    );
};


export default Search