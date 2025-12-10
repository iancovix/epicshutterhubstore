<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Panel</title>
<!-- Font Awesome CDN for icons -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  integrity="sha512-papQ3a5tF4xDfqVj9K5O/wGk4+oLzrF2FqQ6x5k1lG3D4Cn6gWksuOlfJ+kYvsPAyD2yJq+v4G3B+N9j3W6rKQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<link href="https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap" rel="stylesheet">
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  integrity="sha512-papQ3a5tF4xDfqVj9K5O/wGk4+oLzrF2FqQ6x5k1lG3D4Cn6gWksuOlfJ+kYvsPAyD2yJq+v4G3B+N9j3W6rKQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
  integrity="sha512-Qq5o1lH+5e7WkV/2aLsh+V5J4oGx7y5wWGL7Xf+Q6z3a0e3NqM1E3Z5s9T0QhzA4ZP+z5+1cB6B6Lk8z4C9TQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
  /* --- ROOT VARIABLES --- */
  :root {
    --primary-dark: #000;
    --accent: #a02424;
    --light-gray: #f5f5f8;
    --border-gray: #ddd;
    --text-dark: #1a1a1a;
    --shadow-sm: 0 3px 8px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  }
  * { margin:0; padding:0; box-sizing:border-box; font-family: 'Poppins', sans-serif;}
  body { background: var(--light-gray); color: var(--text-dark); margin: 0; padding: 0; }

  /* --- HEADER --- */
  .header {
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 30px;
    background:#fff;
    box-shadow: var(--shadow-md);
    position: sticky;
    top:0;
    z-index: 1000;
  }
  .logo img{
    border-radius: 100%;
    height: clamp(70px, calc(2vw+10px),80px);
    width: clamp(70px, calc(2vw+10px),80px);
}
.logo h1{
      font-size: clamp(.7rem,calc( 2vw + .3rem), 1.8rem);
    font-family: "Special Gothic Expanded One", sans-serif;
}
.logo {
    font-size: 1.5rem;
    display: flex;
    gap: 1.4rem;
    justify-content: space-evenly;
    font-weight: bold;
    align-items: center;
    color: var(--primary-dark);
}
.admin-sign {
    display: flex;
    align-items: center;
    gap: 15px;
}
/* Full screen background */
#access {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,3.9); /* semi-transparent overlay */
  z-index: 1000;
}

/* Form container */
#accessForm {
  width: 380px;
  background: rgba(215, 211, 211, 0.823);
  border-radius: 20px;
  padding: 30px;
  margin:200px auto;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.5s ease-in-out;
}

/* Form elements */
#accessForm h2 {
  text-align: center;
  margin-bottom: 10px;
  color: #222;
}

#accessForm input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

#accessForm button {
  padding: 12px;
  background: #a02424;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

#accessForm button:hover {
  background: #222;
}

  #signOutBtn { cursor:pointer; background:none; border:none; font-size:1.1rem; }

  /* --- CONTAINER --- */
  .container { display:flex; gap:20px; padding:20px; min-height: calc(100vh - 70px); }

  /* --- NAV PANEL --- */
  .nav-panel { flex:0 0 1; justify-content: space-between; background:#fff; border-radius:12px; box-shadow:var(--shadow-sm); padding:20px; display:flex; flex-direction:column; gap:15px;}
  .nav-panel ul { list-style:none; display:flex; flex-direction:column; justify-content: space-between;
     gap:12px; }
  .nav-panel li { padding:10px 15px; border-radius:8px; cursor:pointer; justify-content: space-between; transition:0.2s; }
  .nav-panel li:hover { background:var(--accent); color:#fff; }

  /* --- MAIN PANEL --- */
  .main { flex:1; background:#fff; border-radius:12px; padding:25px; box-shadow:var(--shadow-md); display:flex; flex-direction:column; gap:30px;}
  /* --- FORM --- */
  .admin-box { width:100%; max-width:500px; background:var(--light-gray); padding:20px; border-radius:12px; box-shadow:var(--shadow-sm); margin: 0 auto; }
  input, textarea, select { width:100%; padding:12px; margin:8px 0; border-radius:8px; border:1px solid var(--border-gray); font-size:0.95rem; }
  button { width:100%; padding:12px; background:var(--primary-dark); color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600; transition:0.2s; }
  button:hover { background:var(--accent); }

  /* --- IMAGE PREVIEW --- */
  .preview-container { display:flex; flex-wrap:wrap; gap:10px; margin-top:10px; }
  .preview-container img { width:80px; height:80px; object-fit:cover; border-radius:8px; border:1px solid #ccc; margin-bottom: 10px;}

  /* --- TABLE --- */
  table { width:100%; border-collapse: collapse; border-radius:12px; overflow:hidden; box-shadow:var(--shadow-sm); }
  th, td { padding:14px; border-bottom:1px solid var(--border-gray); text-align:left; font-size:0.95rem; }
  th { background: var(--primary-dark); color:#fff; }
  img { width:50px; height:50px; object-fit:cover; border-radius:6px; }

  /* --- RESPONSIVE --- */
  @media (max-width:992px){ .container{ flex-direction:column;} .nav-panel{flex-direction:row; overflow-x:auto; height:auto;} .nav-panel ul{flex-direction:row; gap:10px;} .main{width:100%;} }
  
@media screen and (max-width: 480px) {
    .nav-panel { flex:0 0 100px; background:#fff; border-radius:12px;align-items: center;  box-shadow:var(--shadow-sm); padding: 10px; display:flex; flex-direction:column;justify-content: center; gap:5px;}
  .nav-panel ul { list-style:none; display:flex; flex-direction: row;align-items: center; gap:5px;justify-content: center; }
  .nav-panel li { padding:5px 5px; border-radius:8px; cursor:pointer; transition:0.2s; }
  .nav-panel li:hover { background:var(--accent); color:#fff; }

  
}
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
                       <div style="padding: 0;" class="logo">
                <img style="border-radius: 50%;" width="80px" height="80px" src="/logoimg.webp" loading="lazy" alt="logo image">
                <h1>Epic Shutter Hub</h1>
            </div>
            <div class="admin-sign">
              <p>Logout</p><i onclick="window.location.href='https://epicshutterhub.vercel.app/'" style="background: black; transition: background .3 ease; padding: 10px; color: white;cursor: pointer;"class="fas fa-sign-out-alt"></i>
            </div>
</div>
<div id="access">
  <form id="accessForm">
    <h2>Admin Panel</h2>
    <input type="text" placeholder="Username" id="username">
    <input type="password" placeholder="Password" id="password">
    <button type="submit">Login</button>
  </form>
</div>

<!-- CONTAINER -->
<div class="container">
  <!-- NAV PANEL -->
  <div class="nav-panel">
    <ul>
      <li onclick="showAddProduct()">Add Product</li>
      <li onclick="editProduct()">Edit Product</li>
      <li onclick="showProductList()">Product List</li>
  
    </ul>
  </div>

  <!-- MAIN PANEL -->
  <div class="main">
    <div id="productListBox" style="display:none;">
  <h2>Product List</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Images</th>
        <th>Price</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="productTable"></tbody>
  </table>
</div>

<!-- EDIT PRODUCT MODAL -->
<div id="editModal" style="display:none;">
  <div class="admin-box" >
    <h2>Edit Product</h2>
    <input type="text" id="editName" placeholder="Product Name">
    <input type="number" id="editPrice" placeholder="Price">
    <textarea id="editDesc" placeholder="Description"></textarea>
    <select id="editCategory">
      <option disabled selected>Select Category</option>
      <option>Cameras</option>
      <option>Lenses</option>
      <option>Lighting</option>
      <option>Accessories</option>
    </select>
    <input type="file" accept="images/*" id="editImgFiles" multiple>
    <div id="editPreview" class="preview-container"></div>
    <button onclick="updateProduct()">Save Changes</button>
    <button style="background:#aaa;margin-top:10px;" onclick="closeEditModal()">Cancel</button>
  </div>
</div>
    <!-- ADD PRODUCT FORM -->
    <div class="admin-box" id="addProductBox">
      <h2>Add Product</h2>
      <input type="text" id="pname" placeholder="Product Name">
      <input type="number" id="price" placeholder="Price">
      <textarea id="desc" placeholder="Description"></textarea>
      <select id="category">
        <option disabled selected>Select Category</option>
        <option>Cameras</option>
        <option>Lenses</option>
        <option>Lighting</option>
        <option>Accessories</option>
      </select>
      <input type="file" accept="images/*" id="imgFiles" multiple>
      <div id="preview" class="preview-container"></div>
      <button onclick="saveProduct()">Save Product</button>
      <p id="status"></p>
    </div>

    <!-- PRODUCT TABLE -->
    <div id="productListBox" style="display:none;">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Images</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="productBody"></tbody>
      </table>
    </div>
  </div>
</div>
<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, child, get, set, remove } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// ---------------- FIREBASE SETUP ----------------
const firebaseConfig = {
  apiKey: "AIzaSyA3cpEnOe_IyRhhPDKSsQuTZll-Ud38guE",
  authDomain: "epicshutterhubstore-d41da.firebaseapp.com",
  databaseURL: "https://epicshutterhubstore-d41da-default-rtdb.firebaseio.com",
  projectId: "epicshutterhubstore-d41da",
  storageBucket: "epicshutterhubstore-d41da.firebasestorage.app",
  messagingSenderId: "12540619912",
  appId: "1:12540619912:web:6f31eab47fe31dd800433d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const productBody = document.getElementById("productBody");
const status = document.getElementById("status");
let editingKey = null;

// ---------------- SAVE PRODUCT ----------------
window.saveProduct = async function(){
  const name = document.getElementById("pname").value.trim();
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const cat = document.getElementById("category").value;

  if(!name || !price || !desc || !cat){
    status.innerText = "Fill all fields.";
    return;
  }

  status.innerText = "Saving product...";
  const productKey = editingKey || name.replace(/\s+/g, "_");

  try {
    await set(ref(db, 'products/' + productKey), {
      name,
      category: cat,
      description: desc,
      price: Number(price)
    });

    status.innerText = "Product Saved ✔";

    document.getElementById("pname").value = "";
    document.getElementById("price").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("category").selectedIndex = 0;
    editingKey = null;

    loadProducts();
  } catch(err){
    console.error(err);
    status.innerText = "Error saving product!";
  }
};

// ---------------- LOAD PRODUCTS ----------------
function loadProducts(){
  get(child(ref(db), 'products')).then(snapshot=>{
    productBody.innerHTML = "";

    if(snapshot.exists()){
      snapshot.forEach(item=>{
        const key = item.key;
        const p = item.val();
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>$${p.price}</td>
          <td>${p.description}</td>
          <td>
            <button onclick="editProduct('${key}')">Edit</button>
            <button onclick="deleteProduct('${key}')">Delete</button>
          </td>
        `;
        productBody.appendChild(tr);
      });
    } else {
      productBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No products found</td></tr>`;
    }
  });
}

// ---------------- DELETE PRODUCT ----------------
window.deleteProduct = async function(key){
  if(!confirm("Delete this product?")) return;
  try{
    await remove(ref(db,'products/'+key));
    alert("Deleted!");
    loadProducts();
  } catch(err){
    console.error(err);
    alert("Error deleting product");
  }
};

// ---------------- EDIT PRODUCT ----------------
window.editProduct = async function(key){
  const snapshot = await get(ref(db,'products/'+key));
  if(!snapshot.exists()) return alert("Product not found!");
  const p = snapshot.val();
  editingKey = key;

  document.getElementById("pname").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("desc").value = p.description;
  document.getElementById("category").value = p.category;
};

loadProducts();
</script>

</body>
</html>
