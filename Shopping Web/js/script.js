
//owl carousel

$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    })
  });
  
 



// Json Ekleme

 async function getData(){
    const getir =await fetch("../js/data.json");
    const data =await  getir.json();
   
  data ? localStorage.setItem("ürün",JSON.stringify(data)) : []
  itemlerFun();
  
 
   
}   
getData()
    //Verileri Getirme

let ürün=[];
let cart=[];
cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      function addtoCard(){
        
  
        const buttons = [...document.getElementsByClassName("addItem")];
        buttons.forEach((button) =>{
         const carİc = cart.find((item) => item.id === Number(button.dataset.id));
         if(carİc){
          button.setAttribute("disable","disable");
         }else {
          button.addEventListener("click", function(e){
            e.preventDefault();
           const id = e.target.dataset.id;
           const itemle = ürün.find((ürün) => ürün.id === Number(id));
          
           cart.push({...itemle ,quantity:1});
           localStorage.setItem("cart" , JSON.stringify(cart))
           button.setAttribute("disabled","disabled");
          });
          
         }
         
        
        });
        cartaEkleme()
          
      }

          //Shop Sayfası
function itemlerFun(){
   ürün = JSON.parse(localStorage.getItem("ürün"));
    const itemsContainer = document.getElementById("items-list")
  
 
    let sonuc =""
    ürün.forEach((item) => { sonuc +=` 
   
    
    <div class="col-md-8 mx-md-auto col-lg-4  py-4  "  >
               
    <div class="card shadow-sm " id="items-list" >
      <img src="${item.url}" class="card-img-top img-fluid" alt="...">
      <div class="card-body text-center">
        <h4 class="card-title  text-warning">$${item.fiyat}</h4>
        <p class="card-text">White T-Shirt</p>
        <button class="btn addItem   px-3 py-1 bg-body-secondary border border-0" data-id=${item.id}><span><i class="fa-solid fa-cart-shopping pe-none  px-1"></i></span>add to cart</button>
      </div>
     
      <div class="card-body border border-top-1  d-lg-flex d-xl-block">
        <a href="#" class="card-link fs-6 text-body-secondary"><i class="fa-solid fa-plus mt-2  bg-secondary text-white"></i>Add to Whislist</a>
        <a href="#" class="card-link fs-6 text-body-secondary"><i class="fa-solid fa-plus mt-2 bg-secondary text-white "></i>Add to Whislist</a>
        
      </div>
    </div>      
  </div>
   `;
  
  
 });
 itemsContainer ?( itemsContainer.innerHTML = sonuc) :";"

 addtoCard()
 // Shop Sayfası arama 
 const ara = document.getElementById("ara")
   
  let value="";
  let filtre =[];
 
    ara.addEventListener("input" , (e) => {
 
      value=e.target.value
     value=value.trim().toLowerCase();
      filtre = ürün.filter((item) => item.baslik.trim().toLowerCase().includes(value));
     let result=""
      filtre.forEach((item)=> {
         result +=`
         <div class="col-md-8 mx-md-auto col-lg-4  py-4  "  >
                
         <div class="card shadow-sm " id="items-list" >
           <img src="${item.url}" class="card-img-top img-fluid" alt="...">
           <div class="card-body text-center">
             <h4 class="card-title  text-warning">$${item.fiyat}</h4>
             <p class="card-text">White T-Shirt</p>
             <button class="btn addItem   px-3 py-1 bg-body-secondary border border-0" data-id=${item.id}><span><i class="fa-solid fa-cart-shopping pe-none  px-1"></i></span>add to cart</button>
           </div>
          
           <div class="card-body border border-top-1  d-lg-flex d-xl-block">
             <a href="#" class="card-link fs-6 text-body-secondary"><i class="fa-solid fa-plus mt-2  bg-secondary text-white"></i>Add to Whislist</a>
             <a href="#" class="card-link fs-6 text-body-secondary"><i class="fa-solid fa-plus mt-2 bg-secondary text-white "></i>Add to Whislist</a>
             
           </div>
         </div>      
       </div>                
                 `
     })
     
      itemsContainer.innerHTML = result;
     addtoCard()
     
    });
  

 
  
}

itemlerFun()


  //Cart sayfası
  

function cartaEkleme(){
  let result = " "
  const capsar = document.querySelector("#capsar")
  cart.forEach((item)=>{
    result +=`
    
    <div class="col-md-12 "  >
    <ul
      class="list-group list-group-horizontal justify-content-center align-items-center d-block d-md-flex text-center mb-3 " 
    >
      <li class="list-group-item w-100 border-0">
        <img
          src="${item.url}"
          class="cart-img"
          alt=""
        />
      </li>
      <li class="list-group-item w-100 border-0">
        <p class="bg-warning d-block d-md-none">Price</p>
        <h6>BlackScuba</h6>
        <p>Web Id:25144578424</p>
      </li>
      <li class="list-group-item w-100 border-0">
        <p class="bg-warning d-block d-md-none">Price</p>
      </li>
      <li class="list-group-item w-100 border-0">
        <p>$${item.fiyat}</p>
      </li>
      <li
        class="list-group-item w-100 border-0 d-flex justify-content-center"
      >
        <button class="quantity-minus border-0 me-1 btn-cart azalt">
          <i class="fa fa-minus"></i>
        </button>
        <input
          class="quantity-input w-50 text-center sayi"
          type="number"
          value="1"
          readonly
          id="1"
        />
        <button class="quantity-plus border-0 ms-1 btn-cart arttır">
          <i class="fa fa-plus"></i>
        </button>
      </li>
      <li class="list-group-item w-100 border-0">
        <p class="bg-warning d-block d-md-none">Price</p>
      </li>
      <li
        class="list-group-item w-100 border-0 d-flex justify-content-around justify-content-md-between"
      >
        <p class="sonuc">$${item.fiyat}</p>
        <span><i class="fa-solid fa-xmark deleteCart" data-id=${item.id}></i></span>
      </li>
    </ul>
  </div>
  <div class="col-md-12">
        
    
    
    
    `;
  } );
  capsar ? (capsar.innerHTML=result) : "";
  deleteCartitem()
 
}
cartaEkleme();

// Cart sayfası Ürün silme 
function deleteCartitem(){
  const deleteCart = document.querySelectorAll(".deleteCart")
    console.log(deleteCart)
  deleteCart.forEach((butn)=> {
    butn.addEventListener("click",function(e){
       const id = e.target.dataset.id
       cart = cart.filter((item) => item.id !== Number(id));
       cartaEkleme()
       localStorage.setItem("cart" , JSON.stringify(cart))
       
    });
    hesaplama()
  });
}

function hesaplama(){
    const cartTotal =document.querySelector(".cartTotal");
    const taxT = document.getElementById("taxT")
    
 let itemsToplam =0;
  cart.length > 0 && cart.map((item)=> itemsToplam += item.fiyat * 1);
 
  cartTotal.innerHTML = `$${itemsToplam.toFixed(2)}`
  taxT.innerHTML=`$${(itemsToplam + 2).toFixed(2)}`

 
}
   



 


  