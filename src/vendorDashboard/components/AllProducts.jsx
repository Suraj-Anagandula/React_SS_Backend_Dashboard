import React,{useState,useEffect} from 'react'
import { API_URL } from '../data/apiPath';

const AllProducts = () => {

    const [products,setProducts]=useState([]);

    const productHandler=async()=>{
     const firmId=localStorage.getItem("firmId");

       if (!firmId || firmId === "null" || firmId === "undefined") {
    alert("Firm ID is missing. Please log in again.");
    return;
  }

    try {

        const response=await fetch(`${API_URL}/product/${firmId}/products`);

        const newProductsData=await response.json();
        setProducts(newProductsData.products);
        console.log(newProductsData.products);
        
    } catch (error) {
        console.error("Failed to fetch products",error);
        alert("Failed to fetch Products");
        
    }

    }

   useEffect(()=>{
    productHandler();
    console.log("this is useEffect");

   },[])

   const deleteProductById=async(productId)=>{
       
       console.log("deleting the product")
       console.log(productId);

         const shouldDelete = window.confirm("Are you sure you want to delete?");
         if (!shouldDelete) return;

          

          try {

          const response=await fetch(`${API_URL}/product/${productId}`,{
            method:'DELETE',

            
          } );

          console.log("Details");
          console.log(fetch(`${API_URL}/product/${productId}`));
          console.log(productId);
             
           
         if (response.ok) {
        alert("Product deleted Successfully");
         productHandler(); 
      //setProducts(products => products.filter(product => product._id !== productId));
       
    } else {
      alert("Failed to delete product from server.");
    }


      } catch (error) {
        console.error("Failed to delete product");
        alert("Failed to delete product");
        
      }

   }

  return (
    <div>
        {!products?(
            <p>No Products Added</p>

        ):(
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        console.log(item.image);
                        return(
                             <> 
                             <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_URL}/uploads/${item.image}`}
                                        alt={item.productName}  style={{width:'50px',height:'50px'}}/>
                                        

                                    )}
                                </td>
                                <td><button onClick={()=>deleteProductById(item._id)} type='button'>Delete</button></td>

                             </tr>
                           </>
 
                        )
                    })}
                </tbody>
            </table>
        )}
      
    </div>
  )
}

export default AllProducts
