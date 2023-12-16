let titel = document.getElementById("title");
let price = document.getElementById("price");
let Taxes = document.getElementById("taxes");
let advertisment = document.getElementById("ads");
let Discount = document.getElementById("discount");
let total = document.getElementById("Total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creatButton = document.getElementById("submit");
 let mood = 'creat';
 let temp;
// get total
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +Taxes.value + +advertisment.value) - +Discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = '#040';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = '#be0202';
  }
}

// create product
function creatProdact() {
  let newProdact = {
    "Titel": titel.value,
    "price": price.value,
    "taxes": Taxes.value,
    "advertisment": advertisment.value,
    "Discount": Discount.value,
    "total": total.innerHTML,
    "count": count.value,
    "category": category.value,
  }

  let storedData = JSON.parse(localStorage.getItem('product')) || [];
  //cleandata
  if(titel.value != '' && price.value != '' && category.value != '' && newProdact.count < 100){ 
//count //update

  if(mood === 'creat'){ //update
   if(newProdact.count > 1){ //count
    for(let i = 0; i < newProdact.count; i++){
      storedData.push(newProdact);
    }
  }else{
     storedData.push(newProdact);
  }
}else{
  storedData[temp] = newProdact;
  mood = 'creat';
  creatButton.innerHTML = 'Creat'; 
  count.style.display = 'block';
}
//
clearData();
 }


  
  localStorage.setItem('product', JSON.stringify(storedData));

  
  showedata();
}

// clear inputs
function clearData() {
  titel.value = '';
  price.value = '';
  Taxes.value = '';
  advertisment.value = '';
  Discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}
let storedData;
// show data
function showedata() {
  getTotal();
  let table = '';
  storedData = JSON.parse(localStorage.getItem('product')) || [];
 
  for (let i = 1; i < storedData.length; i++) {
    table += `<tr>
      <td>${i}</td>
      <td>${storedData[i].Titel}</td>
      <td>${storedData[i].price}</td>
      <td>${storedData[i].taxes}</td>
      <td>${storedData[i].advertisment}</td>
      <td>${storedData[i].Discount}</td>
      <td>${storedData[i].total}</td>
      <td>${storedData[i].category}</td>
      <td><button onclick="updateoneproduct(${i})" id="update">Update</button></td>
      <td><button onclick="deleteoneproduct(${i})" id="delete">Delete</button></td>
    </tr>`;
  }

  document.getElementById("tablebody").innerHTML = table;

    let btndelet = document.getElementById("btndeletall");
    
  if (storedData.length > 0) {
  
    btndelet.innerHTML = `<button onclick="deleteAll()">Delete All(${storedData.length})</button>`;
  }else {
    btndelet.innerHTML = '';
  }
}
showedata();
// delete one product
function deleteoneproduct(i) {
  let storedData = JSON.parse(localStorage.getItem('product')) || [];
  storedData.splice(i, 1);
  localStorage.setItem('product', JSON.stringify(storedData));
  showedata();
}

// delete all products
function deleteAll() {
  localStorage.removeItem('product');
  showedata();

}

//update
function updateoneproduct(i){
  temp = i;
  titel.value = storedData[i].Titel;
  price.value = storedData[i].price;
  Taxes.value = storedData[i].taxes;
  advertisment.value = storedData[i].advertisment;
  Discount.value = storedData[i].Discount;
  getTotal();
  count.style.display = 'none';
  category.value = storedData[i].category;
  creatButton.innerHTML = 'Update';
  mood = 'update';
  scroll({
    top:0,
     behavior: 'smooth',
  })
 // console.log(storedData);
}


//search
 let searchInput = document.getElementById("Search");
let searchMood = 'titel';
function getSearchmood(id){
  if(id == 'searchTitel'){
    searchMood = 'titel';
    searchInput.focus();
    searchInput.placeholder = 'Search By Titel';
  }else{
    searchMood = 'Catagory';
    searchInput.focus();
    searchInput.placeholder = 'Search By Category';
  }
  searchInput.value = '';
  showedata();
 // console.log(searchMood);
}

function searchData(value){

  let table = '';
  if(searchMood == 'titel'){

    for(let i = 0; i < storedData.length;i++){
      if(storedData[i].Titel.includes(value)){
        //console.log(i)
        table += `<tr>
      <td>${i}</td>
      <td>${storedData[i].Titel}</td>
      <td>${storedData[i].price}</td>
      <td>${storedData[i].taxes}</td>
      <td>${storedData[i].advertisment}</td>
      <td>${storedData[i].Discount}</td>
      <td>${storedData[i].total}</td>
      <td>${storedData[i].category}</td>
      <td><button onclick="updateoneproduct(${i})" id="update">Update</button></td>
      <td><button onclick="deleteoneproduct(${i})" id="delete">Delete</button></td>
    </tr>`;

        
      }}
    


  }else{
    for(let i = 0; i < storedData.length;i++){
      if(storedData[i].category.includes(value)){
        //console.log(i)
        table += `<tr>
      <td>${i}</td>
      <td>${storedData[i].Titel}</td>
      <td>${storedData[i].price}</td>
      <td>${storedData[i].taxes}</td>
      <td>${storedData[i].advertisment}</td>
      <td>${storedData[i].Discount}</td>
      <td>${storedData[i].total}</td>
      <td>${storedData[i].category}</td>
      <td><button onclick="updateoneproduct(${i})" id="update">Update</button></td>
      <td><button onclick="deleteoneproduct(${i})" id="delete">Delete</button></td>
    </tr>`;

      }
  }
  
}
document.getElementById("tablebody").innerHTML = table; 
}
