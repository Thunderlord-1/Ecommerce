
const script = document.createElement('script');
script.src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
script.async = true;
document.body.appendChild(script);

 export const getProduct = async (id) =>{
     try{
         const url= 'http://localhost:5000/api/products/'+id;
        const response= await fetch(url,{
            headers:{
                'Content-Type': 'application/json',
            }
        });
        if(!response || !response.ok){
            return `<div>Error in getting data<div>`;
        }
         const product = await response.json();
        return product;
     }catch(err){
          return {errro: err.message};
     }
 }

export const createOrder = async(order) => {
    try{
        const response = await axios.post('http://localhost:5000/api/orders',{order});

        if(!response || response.statusText!='Created'){
           throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        return {error: (err.response ? err.response.data.message : err.message)};
    }
}

//  export const getProducts = async ({ searchKeyword = '' }) => {
//     try {
//       let queryString = '?';
//       if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;
//       const url = `http://localhost:5000/api/products${queryString}`;
//       const response = await fetch(url,{
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response || !response.ok) {
//         throw new Error(response.json().message);
//       }
//       const product = await response.json();
//         return product;
//     } catch (err) {
//       console.log(err);
//       return { error: err.response.data.message || err.message };
//     }
//   };