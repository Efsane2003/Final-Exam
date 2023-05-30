const BASE_URL = "http://localhost:8080/services";
let row = document.querySelector(".row");
let searchInput = document.querySelector(".form-control");
let sortBtn = document.querySelector("#sortBtn");
let loadMore = document.querySelector("#loadMore");
let menuIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");

let maxLength = 3;
let filtereData = [];
let copyArray = [];
async function getAllData() {
  const res = await axios(BASE_URL);
  const data = await res.data;
  copyArray = data;
  filtereData =
    filtereData.length || searchInput.value
      ? filtereData.slice(0, maxLength)
      : data.slice(0, maxLength);
  row.innerHTML = "";
  filtereData.forEach((item) => {
    row.innerHTML += `
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
                  <a href="add-edit.html?id=${item.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                  
                </div>
                <a href="details.html?id=${item.id}" style="color:black; font-size:24px; border:1px solid white; padding:10px">Details</a>
               </div>
        </div>
       <div class="card-text">
       <h2>${item.title}</h2>
<p>${item.info}</p>
    <p><i>Price:</i>${item.price}</p>
        <div class="icons">
            <i class="fa-solid fa-trash" onclick=deletecard(${item.id})></i>
            <i class="fa-solid fa-cart-shopping"></i>
            <i class="fa-solid fa-pen-to-square"></i>
        </div>
       </div>
    </div>
</span>
    `;
  });
}
getAllData();
// delete
async function deletecard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
// favorite
async function favorite(id) {
  const res = await axios(`${BASE_URL}/${id}`);
  const obj = await res.data;
  await axios.post(`http://localhost:8080/favorite`, obj);
}
// search
searchInput.addEventListener("input", function (e) {
  filtereData = copyArray
    .slice(0, maxLength)
    .filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
  getAllData();
});
// sort
sortBtn.addEventListener("click", function () {
  if (this.innerHTML == "Asscending") {
    filtereData = filtereData.sort((a, b) => a.price - b.price);
    getAllData();
    this.innerHTML = "Desscending";
  } else if (this.innerHTML == "Desscending") {
    filtereData = filtereData.sort((a, b) => b.price - a.price);
    getAllData();
    this.innerHTML = "Default";
  } else {
    filtereData = copyArray;
    getAllData();
    this.innerHTML = "Asscending";
  }
});
// load more
loadMore.addEventListener("click",function(){
    maxLength+=3
    filtereData=copyArray.slice(0,maxLength)
getAllData()
})
// menuIcon
menuIcon.addEventListener("click",function(){
  nav.classList.toggle("show")
  this.classList.contains("fa-bars")
  ?(this.classList="fa-solid fa-xmark")
  :(this.classList="fa-solid fa-bars")
  
})