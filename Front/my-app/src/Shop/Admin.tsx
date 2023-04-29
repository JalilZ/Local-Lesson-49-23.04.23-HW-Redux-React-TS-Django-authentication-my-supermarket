import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Styles.css';
//import jwt from 'jsonwebtoken'; //npm install jsonwebtoken
// import jwt_decode from "jwt-decode"; //npm install jwt-decode



const Admin = () => {

    const [prod, setprod] = useState("")
    const [category, setcat] = useState("")
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(10)
    const [productImage, setproductImage] = useState<File>() // i want to store only one image per product so I don't do const [productImage, setproductImage] = useState<File[]>([]) (this would be usefull if a single product would have many images)
    
    interface prodType {
        id: number;
        category: string;
        prod: string;
        desc: string;
        price: number;
        productImage: File;
    }
    const [superProds, setSuperProds] = useState<prodType[]>([]);  //to explicitly specify the type of CentralCart as an array of prodType
    const [refreshFlag, setrefreshFlag] = useState<boolean>(true);

    const MY_SERVER = 'http://127.0.0.1:8000/products/'
    const GetProds = async () => {
            const MyToken = localStorage.getItem('MyToken')                           //authentication
            if(MyToken){                                               //authentication - this will return null if there is still no 'MyToken' in storage
                const config = {headers: {'Authorization': `Bearer ${MyToken}`}}      
                let res = await axios.get<prodType[]>(MY_SERVER, config);   // config to deliver the Bearer access token
                setSuperProds(res.data);
            }                                                   
        };

    useEffect(() => { GetProds() }, [refreshFlag])

    const PostProd = async() => {                     //added sync and await to handle working with slowness of django server
        // let res = await axios.post(MY_SERVER, { prod, category, desc, price, productImage })
        const MyToken = localStorage.getItem('MyToken')
        if (MyToken){                                                                 //authentication
            const config = {headers: {'Authorization': `Bearer ${MyToken}`}}          //authentication
            const formData = new FormData();
            formData.append("prod", prod);
            formData.append("category", category);
            formData.append("desc", desc);
            formData.append("price", price.toString());            //formdata elements can only be strings
            if (productImage !== undefined) {                      //typescript needs to make sure that when accessing productImage, it is not underfined
            formData.append("productImage", productImage);
                                            }                                            
            let res = await axios.post(MY_SERVER, formData, config).then(res => setrefreshFlag(!refreshFlag)) // config (authenticaiton header bearer)
        }                                 
    
    }

    const DelProd = async(itemid: number) => {                     //added sync and await to handle working with slowness of django server
        const MyToken = localStorage.getItem('MyToken')
        if (MyToken){
            const config = {headers: {'Authorization': `Bearer ${MyToken}`}}          //authentication
            let res = await axios.delete(MY_SERVER+itemid, config).then(res => setrefreshFlag(!refreshFlag))     
        }
        // setrefreshFlag(!refreshFlag)
    }

    const PutProd = async(itemid: number) => {                     //added sync and await to handle working with slowness of django server
        // let res = await axios.put(MY_SERVER+itemid, { prod, category, desc, price, productImage })
        const MyToken = localStorage.getItem('MyToken')
        if (MyToken){
            const config = {headers: {'Authorization': `Bearer ${MyToken}`}}          //authentication
            const formData = new FormData();
            formData.append("prod", prod);
            formData.append("category", category);
            formData.append("desc", desc);
            formData.append("price", price.toString());
            if (productImage !== undefined) {
            formData.append("productImage", productImage);
                                            }
            let res = await axios.put(MY_SERVER+itemid, formData, config).then(res => setrefreshFlag(!refreshFlag));
            }                                                       
    // setrefreshFlag(!refreshFlag)
    }
    
    // const MyToken = localStorage.getItem('MyToken')
    // if (MyToken){
    //     const decodedToken: any = jwt_decode(MyToken);
    //     console.log(decodedToken.user_id)
        
        

    return (
        
        <div>

            <div className='AdminProducts'>
                <br />
                <input type='text' placeholder='product' className="form-control" onChange={(e) => setprod(e.target.value)} />
                <select placeholder='category' className="form-control" onChange={(e) => setcat(e.target.value)}>

                    <option value="">Choose a category</option>
                    <option value="dairy">Dairy</option>
                    <option value="meats">Meat</option>
                    <option value="snacks">Snacks</option>
                </select>

                <input type='text' placeholder='description' className="form-control" onChange={(e) => setdesc(e.target.value)} />
                <input type='number' placeholder='price' className="form-control" onChange={(e) => setprice(+e.target.value)} />
                {/*e.target.files?.[0]) instead of e.target.files[0]) because typescript needs to be assured in case the e.target is null, the ?. operator ensures that files property is accessed only if e.target is not null or undefined. If e.target is (null or undefined), the expression evaluates to undefined and no error occurs. */}
                <input type='file' placeholder='image' className="form-control" onChange={(e) => setproductImage(e.target.files?.[0])} /> 
                <br/>
                <button type="button" className="btn btn-secondary" onClick={() => PostProd()}>Add Product</button>
                <br/><br/>
            </div>


            <div className='Menu'>
                {superProds.map((i) =>
                    <div key={i.id}>
                        <div className='card border-dark mb-3' style={{ width: '18rem' }}>
                            <div className='card-header'><b>{i.prod}</b></div>
                            <div className='card-body'></div>
                            <h5 className='card-title'>{i.desc}</h5>
                            <img src={require('../../../../Back/static' + i.productImage)} height={'200px'}></img>
                            <p className='card-text' style={{ fontSize: 'larger' }}>&#8362;{i.price}</p>
                            {/* <button className='btn btn-dark' onClick={() => AddToCart(i)}>Add To Cart</button> */}
                            <button type="button" className="btn btn-secondary" onClick={() => PutProd(i.id)}>Update Product</button>
                            <button type="button" className="btn btn-danger" onClick={() => DelProd(i.id)}>Delete Product</button>
                        </div>
                    </div>)}
            </div>

        </div>
    )
        
}


export default Admin