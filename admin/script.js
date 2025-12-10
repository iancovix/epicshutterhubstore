const addProductBox   = document.getElementById('addProductBox');
const editProductBox  = document.getElementById('editModal');
const productListBox  = document.getElementById('productListBox');

document.querySelector('.addProductBtn').addEventListener('click', showAddProduct);
document.querySelector('.editproductBtn').addEventListener('click', showEditProduct);
document.querySelector('.productListBtn').addEventListener('click', showProductList);


function showAddProduct() {
  addProductBox.style.display = "block";
  editProductBox.style.display = "none";
  productListBox.style.display = "none";
}

function showEditProduct() {
  editProductBox.style.display = "block";
  addProductBox.style.display = "none";
  productListBox.style.display = "none";
}

function showProductList() {
  productListBox.style.display = "block";
  editProductBox.style.display = "none";
  addProductBox.style.display = "none";
}


  const access = document.getElementById('access');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const accessForm = document.getElementById('accessForm');
  accessForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(username === "admin"&& password === 12345){
      access.style.display='none';
    }
  });
