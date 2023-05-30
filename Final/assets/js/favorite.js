const BASE_URL = "http://localhost:8080/favorite";
let row = document.querySelector(".row");
async function favoriteData(){
    const res=await axios(`${BASE_URL}`)
    const data=await res.data
    row.innerHTML="";
    data.forEach((item)=>{
        row.innerHTML+=`
        <span class=" col-sm-12 col-md-6 col-lg-4 py-4">
    <div class="card">
     <img src="${item.img}" alt="">
        <div class="content">
            <div class="text">
                <h2>${item.title}</h2>
                <p>${item.info}</p>
                <p><i>Price:</i>${item.price}</p>
                <div class="icons">
                    <i class="fa-solid fa-trash" onclick=deletecard(${item.id})></i>
                    <i class="fa-solid fa-cart-shopping" onclick=favorite(${item.id})></i>
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
               </div>
        </div>
</span>`

    })
}
favoriteData()
async function deletecard(id,btn){
    await axios.delete(`${BASE_URL}/${id}`)
    btn.closest("span").remove()

}