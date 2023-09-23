import { showMessage } from "../util.js";

const ContactUsScreen ={
    after_render: async()=>{
      const script = document.createElement('script');
      script.src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
      script.async = true;
      document.body.appendChild(script);
      const submitButton = document.getElementById('submitButton').addEventListener('click', async (e)=>{
        e.preventDefault();
        showMessage("contact form recieved");
       
        let email=document.querySelector("input[type='email']").value;
        let name=document.getElementById('name').value;
        let message = document.getElementById('message').value;
        let subject= document.getElementById('subject').value;
      
       try
       { 
         let response = await axios.post('http://localhost:5000/api/contact',{email,name,message,subject});
        if(!response || response.statusText!='OK'){
          throw new Error(response.data.message);
        }
       return response.data;
    }catch(err) {
        return {error: (err.response ? err.response.data.message : err.message)};
    }
      });
    },
    render:()=>
    {
         return `
         <div >If you have business inquiries or other questions, please fill out the following form to contact us. Thank you.</div>
         <div class="form-container">
        <form id="contact-form">
          <ul class="form-items">
            <li>
              <h1>Contact information</h1>
            </li>
            <li>
              <label for="name">Name<span class="required">*</span></label>
              <input type="text" name="name" id="name"  required >
            </li>
            <li>
              <label for="email">Email<span class="required">*</span></label>
              <input type="email" name="email" id="email" required >
            </li>
            <li>
              <label for="subject">Subject<span class="required">*</span></label>
              <input type="text" name="subject" id="subject"  required >
            </li>
            <li>
              <label for="message">Type your message below:<span class="required">*</span></label>
              <textarea name="message" id="message" rows="4" cols="50">
              </textarea>
              <li>
                    <span class="required">*Required fields</span>
            </li> 
            </li>
              <button type="submit" class="primary" id="submitButton">submit</button>
            </li>
                   
          </ul>
        </form>
        
      </div>
         `;
    },
};
export default ContactUsScreen;
