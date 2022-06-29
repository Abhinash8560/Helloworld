import * as React from "react";
import "./App.css";
import axios from "axios"

import InfiniteScroll from 'react-infinite-scroll-component';

export default function App() {
    const PAGE_LIMIT = 5;
const apiPath="https://dummyjson.com/products"

  const [product, setProduct] = React.useState([]);

  const getProductList = () =>  {
    let pageNo = Math.ceil(product.length / PAGE_LIMIT) +1;
    const queryParams = "?page=" + pageNo + "&limits=" + PAGE_LIMIT
    const finalUrl= apiPath + queryParams
    axios.get(finalUrl).then((res) => {
        setProduct(res.data.products) 
        console.log("res",res);
    })
    .catch((err) => {
        console.log("error",err)
    });

  };
  React.useEffect(() => {
    getProductList()
  }, []);

 const fetchMoreData = () => {
    getProductList()
 }
  
  return (
    <>
    <div className="App">
    <div className="flex">

    <InfiniteScroll
    dataLength={product.length}
    next={fetchMoreData}
    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    // inverse={true} 
    hasMore={true}
    loader={<h4>Loading...</h4>}
   >

        { 
        product.length>0 &&
          product.map((user) => {
            return (
              <div key={user.id}>
                {/* <p>
                  <strong>{user.title}</strong>
                </p> */}
                <img key={user.images[0]} src={user.images[0]} />
                <p>
                    {user.title}.
                    </p>

                    {/* <Stack spacing={2}>
      <Pagination key={user.products} count={10} page={page} onChange={handleChange} />
    </Stack> */}

              </div>
            );
          })}
          </InfiniteScroll>

      </div>
    </div>
    
    </>
  
  );
          
}
