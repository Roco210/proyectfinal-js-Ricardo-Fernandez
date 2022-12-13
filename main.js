
//principal usuario o invitado
class Usuario {
    constructor(usuario,password){
        this.usuario=usuario,
        this.password=password
    }
}
class Producto {
    constructor(id, nombre, precio, imagen, stock) {
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen,
        this.stock = stock
    }
}

//creacion de objetos
const maceta = new Producto(1, "maceta 5 lts", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKStZsebgqXi6Oxry4FdHiiqSNQg7KPrz4Jw&usqp=CAU", 10)
const sustrato = new Producto(2, "sustrato ligero 25dm", 2200, " https://http2.mlstatic.com/D_NQ_NP_863283-MLA43259201302_082020-W.jpg", 10)
const fertilizante = new Producto(3, "fertilizante completo", 800, " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnc021QXFS6JuYvhUzEJczjWKz4IlS4_p2zA&usqp=CAU", 10)
const insecticida = new Producto(4, "insecticida", 500, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAljp23Kld9LQa4HaeUC68qHSIBOtrrY_-jw&usqp=CAU ", 10)



let stock = []
stock.push(maceta)
stock.push(sustrato)
stock.push(fertilizante)
stock.push(insecticida)
localStorage.setItem("base",JSON.stringify(stock))


let checkUsuario 
let btnPrin = document.getElementById("btnPrin")
let principal=document.getElementById("principal")

/* localStorage.setItem("carrito", JSON.stringify(carritoProd)) */


function botonPrincipal(){
    btnPrin.onclick=(e)=>{
    if(e.target.id === "btnPrinUs"){
        //agregar funcion dom usuario
        principal.innerHTML = `
        <div class="row align-items-center" id="principal">
            <img src="https://media.istockphoto.com/id/470649314/es/foto/nursery.jpg?s=612x612&w=0&k=20&c=ZlD3m-OxamXVHfssBEEsnnoLukFz4nQMomTLzpgGFqM="
        alt="">
            <div class="col d-flex justify-content-center " id="btnPrin">
                <form id="formularioUsuario">
                    <div class="mb-3" Id ="usua">
                        <label for="usuario" class="form-label">Usuario</label>
                        <input type="Name" class="form-control" id="usuario">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password">
                    </div>
                    <div id="submitUsuario">
                        <button type="button" class="btn btn-primary " id="env">Enviar</button>
                        <button type="button" class="btn btn-primary" id="noEnv">No tengo Usuario</button>
                    </div>
                </form>
                </div>
        </div>`
        validacionUsuario()
    } else{(tienda())}
    
}}

//verificacion de acceso
function ingreso (){
    if(JSON.parse(localStorage.getItem("usuario")=== null)){
        
    }else {tienda()}

}


function validacionUsuario(){
        let btnUs = document.getElementById("submitUsuario")
        btnUs.onclick= async (e)=>{
            if(e.target.id === "env"){
                let formulario= document.getElementsByClassName("form-control")
                let password = await formulario.password.value
                let usuario = await formulario.usuario.value
                const usuarioActivo = new Usuario (usuario,password)
                let response = await fetch("./usuarios.json")
                let listaUsuarios = await response.json()
                let filtradoUsuario = await listaUsuarios.find(e=>e.usuario === usuarioActivo.usuario)
                if (filtradoUsuario != undefined && filtradoUsuario.usuario== usuarioActivo.usuario && filtradoUsuario.password== usuarioActivo.password){
                    const almacenarUsuario ={"nombre":filtradoUsuario.usuario,"acceso":filtradoUsuario.superadmin}
                    localStorage.setItem("usuario",JSON.stringify(almacenarUsuario))
                    tienda()
                }else{alert("Por favor ingresar Usuario/Contraseña correcta")}
            }else {tienda()}
        }
    }
        


function tienda (){
    principal.innerHTML=`
    <nav id="tiendaNav">
    <div class="row">
        <h1>Bienvenido a la tienda virtual</h1>
    </div>
    <div class="row align-items-center "></div>    
        <div class="col d-flex justify-content-evenly">
            <button id="btnCarrito" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"> Carrito </button>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Carrito</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div id="chart">
            </div>
        </div>
        <div class="modal-footer" id="btnChart">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close">Cerrar</button>
            <button type="button" class="btn btn-primary" id="endShop">Finalizar compra</button>
        </div>
        </div>
    </div>
    </div>
    </nav>
    <main>
    <div class="container d-flex ">
        <div class="row" id="tarjetas" >
        </div>
    </div>
        
    </main>
    `
    let nav =document.getElementById("tiendaNav")
    let tarjetas = document.getElementById("tarjetas")
    let infobase = JSON.parse(localStorage.getItem("base"))
    infobase.forEach(p => {
    tarjetas.innerHTML += `
    <div class="card col-2 m-2 " style="width: 18rem;">
        <div class="card-body align-items-start">
            <img src="${p.imagen}" class="card-img-top" alt="...">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text"> $ ${p.precio} </p>
            <button id= "${p.id}" type="button" class="btn btn-danger">AGREGAR AL CARRITO</button>
        </div>
    </div>`})
    
    selectProduct()
    
    }

 function carrito(){
    let btnCarrito = document.getElementById("btnCarrito")
    let chart = document.getElementById("chart")
    let btnChart = document.getElementById("btnChart")
    let listaCarrito =  JSON.parse(localStorage.getItem("carrito"))
    let total =  JSON.parse(localStorage.getItem("total"))
    btnCarrito.onclick =async (e)=>{
    listaCarrito.forEach(p=>{
    chart.innerHTML+=`
    <div>
    <h5>${p.nombre}   =>   ${p.cantidad}</h5>
    </div>
    ` })
    chart.innerHTML+=`Total:${total}`}
    btnChart.onclick=(e)=>{
    if(e=== close){
        chart.remove()
    } else{ location.reload()}
    }
    
}

function selectProduct(){
    let carritoProd =[]
    let elementos=[]
    let total =0
    tarjetas.onclick=(e)=>{
        let ip=parseInt((e.target.id))
        let productoEscojido = stock.find(element=>element.id===ip)
        let temp =carritoProd.includes(productoEscojido)
        Toastify({
            text: `${productoEscojido.nombre} sumado al carrito`,
            duration: 500,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
            }).showToast();
        //agrega en el localStorage los productos y la cantidad escogida
        if(temp===false){
            total = JSON.parse(localStorage.getItem("total"))
            let productoCarrito ={"id":ip,"nombre":productoEscojido.nombre, "cantidad": 1,"precio":productoEscojido.precio}
            total+=productoEscojido.precio
            carritoProd.push(productoEscojido)
            elementos.push(productoCarrito)
            localStorage.setItem("total",JSON.stringify(total))
            localStorage.setItem("carrito",JSON.stringify(elementos))
        }else{
            total = JSON.parse(localStorage.getItem("total"))
            elementos = JSON.parse(localStorage.getItem("carrito"))
            productoEscojido = elementos.find(element=>element.id ===ip)
            productoEscojido.cantidad++
            total+=productoEscojido.precio
            localStorage.setItem("total",JSON.stringify(total))
            localStorage.setItem("carrito",JSON.stringify(elementos))
        }
        
}}

// ejecucuion de funciones


ingreso()
botonPrincipal()
carrito()