class Producto {
    constructor(id,nombre,tipo, color, precio, tamano,img, stock, cantidad){
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.color = color;
    this.precio = precio;
    this.tamano = tamano;
    this.img = img;
    this.stock = stock;
    this.cantidad = cantidad;
}

//ver estos metodos

aumentarStock(cantProductos){
    this.stock += cantProductos;

}

disminuirStock(cantProductos){
    this.stock -= cantProductos;
    if (cantProductos >=5){
        this.stock=true
    }else{
        this.stock=false;
        console.log("SIN STOCK")
    }
}

}


const producTaza = new Producto(0,"taza ficus","taza", "azul", 1000, "10 cm altura",'/fotosProduct/taza.jpeg', 0, 1);
const producHornito = new Producto(1,"hornito humificador","hornito", "azul", 1200, "12cm altura",'/fotosProduct/hornito.jpeg', 0, 1);
const producFuente = new Producto(2,"Fuente","fuente","azul y blanca", 3000,"35cm largo",'/fotosProduct/fuente.jpeg', 0, 1);
const producMate = new Producto(3,"mate","mate","azul",1500,"9cm alto",'/fotosProduct/mate.jpeg',0, 1);
const producPipa = new Producto(4,"pipa","pipa","celeste",990,"7.5cm largo",'/fotosProduct/pipa.jpeg', 0, 1);
const producVela = new Producto(5,"Vela","vela","tostado",2400,"50cm diametro",'/fotosProduct/vela.jpeg', 0, 1)

producTaza.aumentarStock(400);
producHornito.aumentarStock(150);
producFuente.aumentarStock(200);
producMate.aumentarStock(500);
producPipa.aumentarStock(250);
producVela.aumentarStock(300);


let arrayProductos =[producTaza, producHornito, producFuente,producMate,producPipa,producVela]


let stockProductos[
    {id: 1, nombre:"Taza Zimbabwe", color:"azul", precio: 1500, tamaño:"10 cm altura", img:'/fotosProduct/taza.jpeg',stock: 0,cantidad: 1}
    {id: 2, nombre:"Hornito Mozambique", color:"azul", precio: 2000, tamaño:"12 cm altura", img:'/fotosProduct/hornito.jpeg',stock: 0,cantidad: 1}
    {id: 3, nombre:"Fuente Marley", color:"azul y blanca", precio: 3500, tamaño:"35cm largo", img:'/fotosProduct/fuente.jpeg',stock: 0,cantidad: 1}
    {id: 4, nombre:"Mate Zimbabwe", color:"azul", precio: 1200, tamaño:"9cm altura", img:'/fotosProduct/mate.jpeg',stock: 0,cantidad: 1}
    {id: 5, nombre:"Pipa Ficus", color:"azul", precio: 990, tamaño:"7.5cm largo", img:'/fotosProduct/pipa.jpeg',stock: 0,cantidad: 1}
    {id: 6, nombre:"Vela Hortensia", color:"azul", precio:2700, tamaño:"50 cm diametro", img:'/fotosProduct/vela.jpeg',stock: 0,cantidad: 1}
]