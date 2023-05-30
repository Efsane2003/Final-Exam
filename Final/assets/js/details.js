const BASE_URL = "http://localhost:8080/services";
let id = new URLSearchParams(window.location.search).get("id");
let row = document.querySelector(".row");
async function detailsData(){
    const res=await axios(`${BASE_URL}/${id}`)
    const data=await res.data
  row.innerHTML=`
  <span class=" col-sm-12 col-md-6 col-lg-4 py-4">
  <div class="card">
   <img src="${data.img}" alt="">
      <div class="content">
          <div class="text">
              <h2>${data.title}</h2>
              <p>${data.info}</p>
              <p><i>Price:</i>${data.price}</p>
              <div class="icons">
                  <i class="fa-solid fa-trash" onclick=deletecard(${data.id})></i>
                  <i class="fa-solid fa-cart-shopping" onclick=favorite(${data.id})></i>
                <a href="add-edit.html?id=${data.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                
              </div>
              <a href="details.html?id=${data.id}" style="color:black; font-size:24px; border:1px solid white; padding:10px">Details</a>
             </div>
      </div>
     
  </div>
</span>
  `
}
detailsData()