function serach(){
    window.location.href = 'Souvenir.html';
}
// data
const goodsItems = [
    {
        id:1,
        name:"Maple",
        picture:"image/souvenir_img6.jpeg",
        location:"vancouver"
    },
    { id:2,
        name:"Moose",
        picture:"image/souvenir_img6.jpeg",
        location:"vancouver"
    },
    {
        id:3,
        name:"Ice Wine",
        picture:"image/souvenir_img7.jpeg",
        location:"vancouver"
    },
    {
        id:4,
        name:"coffee",
        picture:"image/souvenir_img1.jpeg",
        location:"yakada"
    },
    {
        id:5,
        name:"Picnic",
        picture:"image/souvenir_img2.jpeg",
        location:"yakada"
    },

    {
        id:6,
        name:"Cloisonne",
        picture:"image/souvenir_img3.jpeg",
        location:"beijing"
    },
    {
        id:7,
        name:"Bookmark",
        picture:"image/souvenir_img4.jpeg",
        location:"beijing"
    },
  
]
//search
function parseUrl(url){
    if (url === ""){
        return {};
    }
    const t1 = url.split("?")
    if (t1.length <= 1){
        return {};
    }

    result = {};
    for (let q of t1[1].split("&")){
        let t = q.split("=");
        result[t[0]] = t[1];
    }
    return result;
}
function getGoodsItemsById(id){
    for(let goods of goodsItems){
        if(goods["id"]===id){
            return goods;
        }
    }
}
function search(value){
    return goodsItems.filter( x => x.location === value);
}
function addSearchEnter(){
    const goods = document.getElementById("searchbox");
    goods.addEventListener("keyup", (event) =>{
       if (event.keyCode === 13){
           console.info(event.target.value);
           document.getElementById("search").submit();
       }
    })
}
function createElement(config){
    let elm = document.createElement(config["name"]);
    let attrs = config["attr"];
    if(attrs) {
        for (let attr in attrs) {
            elm.setAttribute(attr, attrs[attr]);
        }
    }
    if(config["content"]){
        elm.innerHTML = config["content"];
    }
    return elm;
}


function goodsShows(){
    const searchQuery = parseUrl(window.location.href);
    let goodsList = goodsItems;
    if (searchQuery["location"]){
        goodsList = search(searchQuery["location"]);
    }
    
    let containerElm = document.getElementById("container");
    let i = 0;
    for(let good of goodsList){
        if (i % 2 === 0){
            var rowContainerElm = createElement({name: "div", attr: {class: "row  d-flex flex-wrap"} });
            containerElm.appendChild(rowContainerElm);
        }

        let nameElm = createElement({name:"h4", content: good["name"]});

        let imageElm = createElement({name: "img", attr: {
            src: good["picture"], class: "image_small", alt: good["name"]}})
      
        let goodsOuterElm = createElement({name:"div", attr:{class: "col-md-3 my-2 px-2"}});
        let goodsInnerElm = createElement({name:"div", attr:{class: "card h-100 shadow-lg"}});
        // goodsInnerElm.appendChild(nameElm);
        goodsInnerElm.appendChild(imageElm);
        goodsInnerElm.appendChild(nameElm);
        goodsOuterElm.appendChild(goodsInnerElm);
        rowContainerElm.appendChild(goodsOuterElm);
        i++;
    }
}

function goodsDetailInit(){
    const searchQuery = parseUrl(window.location.href);
    const mainContent = document.getElementById("container");
    if(searchQuery && searchQuery["id"]){
        const goods = getGoodsById(parseInt(searchQuery["id"]));
        if(goods){
            mainContent.appendChild(createElement({name:"img", attr:{
                src: goods["picture"], class: "image_normal", alt: goods["name"]
            }}));
            mainContent.appendChild(createElement({name:"h2", content:goods["name"], attr:{
                class:"item-name"
                }}));
            

        }
    }
}






// myForm
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function openForm2() {
    document.getElementById("myForm2").style.display = "block";
}
function closeForm2() {
    document.getElementById("myForm2").style.display = "none";
}

function openForm3() {
    document.getElementById("myForm3").style.display = "block";
}
function closeForm3() {
    document.getElementById("myForm3").style.display = "none";
}

function openForm4() {
    document.getElementById("myForm4").style.display = "block";
}
function closeForm4() {
    document.getElementById("myForm4").style.display = "none";
}

function openForm5() {
    document.getElementById("myForm5").style.display = "block";
}
function closeForm5() {
    document.getElementById("myForm5").style.display = "none";
}

function openForm6() {
    document.getElementById("myForm6").style.display = "block";
}
function closeForm6() {
    document.getElementById("myForm6").style.display = "none";
}

function radiobBtn() {
    if(document.getElementById("radio1") == true){
        alert("Received your order!")
        closeForm()
        closeForm2()
        closeForm3()
        closeForm4()
        closeForm5()
        closeForm6()
    }
    else {
        alert("Received your order!.")
        closeForm()
        closeForm2()
        closeForm3()
        closeForm4()
        closeForm5()
        closeForm6()
    }
}