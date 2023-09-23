import { getProduct } from "../api.js";
import { hideLoading, parseRequestUrl, showLoading } from "../util.js";

const ProductScreen ={
    after_render: ()=>{
        const request =parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',()=>
        {     
            document.location.hash= `/cart/${request.id}`;
        });
    },
    render: async ()=>
    {
        const request =parseRequestUrl(); 
        showLoading();
         const product=await getProduct(request.id);
         console.log(product);
         if(product.error){
            retrun `<div>product error</div>`
         }
         hideLoading();
         return `
          <div class="content">
                <div class="back-to-result">
                    <a href= "/#/">back to result</a>
                </div> 
            <div class="details">
                    <div class="details-image">
                        <img src="${product.image}" alt="${product.name}" >
                    </div>
                    <div class="details-info">
                        <ul>
                            <li>
                             <h1>${product.name}</h1>
                            </li>
                            <br>
                            <li>
                                Price: <strong>${product.detail}</strong>
                            </li>
                            <br>
                            <li><strong>Description:</strong>
                                <div>
                                    ${product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
            <div class="details-action">
                <ul>
                    <li>
                        Price:$${product.price}
                    </li>
                    <li>
                        Status:
                        <div id="status">In Stock<div>
                    </li>
                    <li>
                        <button id="add-button" class="fw primary">Add to cart</button>
                    </li>
                </ul>
            </div>
        </div>
     </div>  
         `;
    },
};
export default ProductScreen;