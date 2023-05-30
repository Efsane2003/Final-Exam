let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:8080/services";
let allInputs = document.querySelectorAll(".form-control");
let submitBtn = document.querySelector("#submitBtn");
let form = document.querySelector("form");
async function getByDataId() {
  const res = await axios(`${BASE_URL}/${id}`);
  const data = await res.data;
  (allInputs[1].value = data.title),
    (allInputs[2].value = data.info),
    (allInputs[3].value = data.price);
  submitBtn.innerHTML = "EDIT";
}
getByDataId();
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    img: `./assets/img/${allInputs[0].value.split("\\")[2]}`,
    title: allInputs[1].value,
    info: allInputs[2].value,
    price: allInputs[3].value,
  };
  if (!id) {
    await axios.post(`${BASE_URL}`, obj);
    window.location = "index.html";
  } else {
    await axios.patch(`${BASE_URL}/${id}`, obj);
    window.location = "index.html";
  }
});
