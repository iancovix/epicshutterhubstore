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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
  display: block;
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
  
@media (max-width: 480px) {
  .logo{
    gap: 2px;
  }
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
      <li class="addproductBtn">Add Product</li>
      <li class="editproductBtn">Edit Product</li>
      <li class="showProductBtn">Product List</li>
  
    </ul>
  </div>

  <!-- MAIN PANEL
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
</div>-->

<!-- EDIT PRODUCT MODAL -->
<div id="editModal" class="admin-box" style="display: none;">
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
    <input type="file" accept="images/*" id="ImgFiles" multiple>
    <div id="editPreview" class="preview-container"></div>
    <button onclick="updateProduct()">Save Changes</button>
    <button style="background:#aaa;margin-top:10px;" onclick="closeEditModal()">Cancel</button>
  </div>
</div>
    <!-- ADD PRODUCT FORM -->
    <div class="admin-box" id="addProductBox" >
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
<div id="successPopup" class="popup">
  <div class="popup-content">
    <p id="popupMessage">Success!</p>
  </div>
</div>

<style>
.popup {
  position: fixed;
  top: 0;  
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  animation: pop 0.3s ease;
}

@keyframes pop { 
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1;}
}
</style>

    <!-- PRODUCT TABLE -->
    <div id="productListBox" class="admin-box" style="display:none;">
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
</script>
</script>
</body>
</html>

<script type="module">
/* ----------------------------- FIREBASE SETUP ----------------------------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getDatabase, ref, set, push, update, remove, get, child 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import {
  getStorage, ref as sRef, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

/* ------------------------ YOUR FIREBASE CONFIG --------------------------- */
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
const storage = getStorage();

/* ----------------------------- DOM ELEMENTS ------------------------------ */
const loginBox = document.getElementById("access");
const username = document.getElementById("username");
const password = document.getElementById("password");

const addBox = document.getElementById("addProductBox");
const editBox = document.getElementById("editModal");
const listBox = document.getElementById("productListBox");

const addBtn = document.querySelector(".addproductBtn");
const editBtn = document.querySelector(".editproductBtn");
const listBtn = document.querySelector(".showProductBtn");

const productBody = document.getElementById("productBody");


let editingKey = null;

/* ---------------------------- SIMPLE LOGIN ------------------------------- */
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

document.getElementById("accessForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (username.value === ADMIN_USER && password.value === ADMIN_PASS) {
    loginBox.style.display = "none";
  } else {
    alert("Invalid login");
  }
});

/* --------------------- SHOW / HIDE SECTIONS ------------------------------- */
addBtn.onclick = () => {
  addBox.style.display = "block";
  listBox.style.display = "none";
  editBox.style.display = "none";

};

editBtn.onclick = () => {
  editBox.style.display = "block";
  listBox.style.display = "none";
  addBox.style.display = "none";
};
listBtn.onclick = () => {
  loadProducts();
  addBox.style.display = "none";
  editBox.style.display = "none";
  listBox.style.display = "block";
};

/*  SAVE PRODUCT  */
window.saveProduct = async function () {
  const name = document.getElementById("pname").value.trim();
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const cat = document.getElementById("category").value;/*
  const images = document.getElementById("igFiles").files;
  
    for (let img of images) {
      const storageRef = sRef(storage, "products/" + Date.now() + img.name);
      await uploadBytes(storageRef, img);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
      }
*/
  if (!name || !price || !desc || !cat) {
    alert("Fill all fields");
    return;
  }

  const productRef = editingKey
    ? ref(db, "products/" + editingKey)
    : push(ref(db, "products"));

  let imageUrls = [];

  await set(productRef, {
    name,
    price: Number(price),
    description: desc,
    category: cat,
  });

  alert("Product saved successfully!");

  document.getElementById("pname").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("category").value = "Select Category";
  document.getElementById("imgFiles").value = "";

  loadProducts();
};

/* LOAD PRODUCTS */
function loadProducts() {
  get(child(ref(db), "products")).then((snap) => {
    productBody.innerHTML = "";
    if (!snap.exists()) return;

    snap.forEach((item) => {
      const p = item.val();
      const key = item.key;

      const row = `
        <tr>
          <td>${p.name}</td>
          <td>
            ${(p.images || [])
              .map((x) => `<img src="${x}" width="50" height="50">`)
              .join("")}
          </td>
          <td>$${p.price}</td>
          <td>${p.category}</td>
          <td>
            <button style="margin-bottom: 5px;" onclick="editProduct('${key}')">Edit</button>
            <button  style="margin-bottom: 5px;"  onclick="deleteProduct('${key}')">Delete</button>
          </td>
        </tr>
      `;
      productBody.innerHTML += row;
    });
  });
}

/* DELETE  */
window.deleteProduct = async function (key) {
  if (!confirm("Delete this product?")) return;

  await remove(ref(db, "products/" + key));
  
  loadProducts();
};

/* EDIT  */
window.editProduct = async function (key) {
  editingKey = key;
  const snap = await get(ref(db, "products/" + key));
  if (!snap.exists()) return alert("Product not found");

  const p = snap.val();

  document.getElementById("pname").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("desc").value = p.description;
  document.getElementById("category").value = p.category;

  alert("Now edit and press Save Product");
};

/* INITIAL LOAD  */

loadProducts();