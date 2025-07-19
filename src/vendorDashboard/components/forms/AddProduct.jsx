import React,{useState} from 'react'
import API_URL from '../../data/apiPath';

const AddProduct = () => {

const [productName,setProductName]=useState("");
const [price,setPrice]=useState("");
const [category,setCategory]=useState([]);
const [bestSeller,setBestSeller]=useState(false);
const [image,setImage]=useState(null);
const[description,setDescription]=useState("");

 const handleCategoryChange=(ev)=>{
    const value=ev.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item!==value));
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller=(even)=>{
    const value=even.target.value=="true"
     setBestSeller(value);
  }
  const handleImageUpload=(ev)=>{
    const selectedImage=ev.target.files[0];
    setImage(selectedImage);
    
  }


 const handleProduct=async(e)=>{
  e.preventDefault();

  try {

       const loginToken=localStorage.getItem('loginToken');
    const firmId=localStorage.getItem('firmId');

    if(!loginToken || !firmId){
        console.error("user not Authonticated");
    }


    const productData= new FormData();
    productData.append('productName',productName);
    productData.append('price',price);
    productData.append('image',image);
    productData.append('description',description);
    productData.append('bestSeller',bestSeller);
    category.forEach((value)=>{
        productData.append('category',value)
    });

    const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:"POST",
        body:productData
    }) 
    const data=await response.json()

    if(response.ok){
        alert("Product added successfully");

        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setDescription("");
        setImage(null);
    }
  
    
  } catch (error) {
    console.error(data.message);
    alert("Failed to add product");
    
  }
 }




  return (
     <div className='productSection'>
        <form  className="productForm" onSubmit={handleProduct}>
            <h3>Add Product</h3><br />
            <label>Product Name: 
            <input type="text"  placeholder='Enter product name' value={productName} onChange={(e)=>setProductName(e.target.value)}/></label><br />
            <label>Price: 
            <input type="text"  placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}/> </label><br />
             
            <div className='checkbox'> 
            <label>Category:  </label> 
            <input type="checkbox"  name='category' checked={category.includes("veg")}  value="veg" onChange={handleCategoryChange}/>Veg
            <input type="checkbox"  name='category' checked={category.includes("non-veg")} value="non-veg" onChange={handleCategoryChange}/>Non-veg 
             </div><br />
            <label>BestSeller: 
            <input type="radio" name='bestseller' value="true"  checked={bestSeller===true} onChange={handleBestSeller}/>Yes <input type="radio" name='bestseller' value="false" checked={bestSeller===false}  onChange={handleBestSeller} />No </label><br />
            <label>Description: 
            <input type="text"  placeholder='Enter description' value={description}  onChange={(e)=>setDescription(e.target.value)}/></label><br />
            <label>Image:
            <input type="file"  name='file' placeholder='upload image' onChange={handleImageUpload}/></label><br />
            <div className="btnSubmit">
                <button type='submit' >Add Product</button>
            </div>

        </form>
    </div>
  )
}

export default AddProduct
