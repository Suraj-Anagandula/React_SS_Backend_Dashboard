import React,{useState} from 'react'
import API_URL from '../../data/apiPath';

const AddFirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setFirmArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

  const handleCategoryChange=(ev)=>{
    const value=ev.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item!==value));
    }
    else{
      setCategory([...category,value])
    }
  }

   const handleRegionChange=(ev)=>{
    const value=ev.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=> item!==value));
    }
    else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload=(ev)=>{
    const selectedImage=ev.target.files[0];
    setFile(selectedImage)
    
  }

  const handleFirm=async(e)=>{
    e.preventDefault();

    try {
      const loginToken=localStorage.getItem("loginToken");
      if(!loginToken){
        console.error("User not authenticated");
      }

      const formData=new FormData();
      formData.append("firstName",firmName);
      formData.append("address",area);
      formData.append("offer",offer);

      if (file) {
      formData.append("image", file);
    }

      category.forEach((value)=>{
        formData.append("category",value);
      })

      region.forEach((value)=>{
        formData.append("region",value);
      })

      const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:"POST",
        headers:{
          'token':`${loginToken}`
        },
        body:formData
        

      });
      const data=await response.json();
      if(response.ok){
        console.log(data);
        
        setFirmName("");
        setFirmArea("");
        setOffer("");
        setCategory([]);
        setRegion([]);
        setFile(null);
          alert("Firm added successfully");  
  
      }else if(data.message ==="vendor can have only one firm"){
        alert("Firm Exists ,Only 1 firm can be added");
        localStorage.setItem('firmId',firmId);

      }else{
        alert("Failed to add Firm");
      }
      console.log("this is firm id",data.firmId);
      const firmId=data.firmId;
      localStorage.setItem('firmId',firmId);

    } catch (error) {
      console.error("Failed to add firm")
      
    }
  }

  return (
    <div className='firmSection'>
        <form  className="firmForm" onSubmit={handleFirm}>
            <h3>Add Firm</h3><br />
            <label>Firm Name: 
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} placeholder='Enter firm name'/></label><br />
            <label>Address: 
            <input type="text"  name='area' value={area} onChange={(e)=>setFirmArea(e.target.value)} placeholder='Enter Address'/> </label><br />
             
            <div className='cat-checkbox'> 
            <label>Category:  </label> 
            <input type="checkbox" checked={category.includes("veg")}   value="veg" onChange={handleCategoryChange}/>Veg  
            <input type="checkbox" checked={category.includes("non-veg")}  value="non-veg" onChange={handleCategoryChange}/>Non-veg 
             </div><br />
            <div className='reg-checkbox'>
            <label>Region:  </label> 
            <input type="checkbox" checked={region.includes("south-Indian")}  onChange={handleRegionChange} value="south-Indian"/>South-Indian
            <input type="checkbox" checked={region.includes("north-Indian")}  onChange={handleRegionChange} value="north-Indian"/>North-Indian 
            <input type="checkbox" checked={region.includes("chineese")}  onChange={handleRegionChange}     value="chineese"/>Chineese 
            <input type="checkbox" checked={region.includes("bakery")}  onChange={handleRegionChange}   value="bakery"/>Bakery
            </div><br/>
            <label>Offer: 
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}placeholder='Enter Offer'/></label><br />
            <label>Image:
            <input type="file"  onChange={handleImageUpload}  placeholder='upload image'/></label><br />
            <div className="btnSubmit">
                <button type='submit'>Add Firm</button>
            </div>

        </form>
    </div>
  )
}

export default AddFirm
