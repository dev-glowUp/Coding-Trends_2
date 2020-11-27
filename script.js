(function(){

    console.log("Teste");

// Criar 2 funções construtoras - Product + Order

    function Product(name, price) {
        this.name = name;
        this.price = price;
    }

    function Order(product, qtd) {
        this.product = product;
        this.qtd = qtd;
        this.value = this.qtd * this.product.price;
    }

// Inicializar um array com n products e um array de orders

    var products = [
        new Product("sugar", 0.89),
        new Product("rice", 0.90),
        new Product("apple", 1.05),
        new Product("soap", 1.00),
        new Product("onions", 1.19),
        new Product("toothpaste", 2.49),
        new Product("cofee", 2.90)
    ];

    var orders = [];

// Criar um “Combobox” (select) que mostre os vários products existentes,e um input que aceite a quantidade pretendida

    var productList = document.getElementById("products"); // drop-down selection element
    var qtdInput = document.getElementById("qtd"); //Qntd input
    
    function fillProductList(products) {
      // primeira de opção  linha vazia 
        var option = document.createElement("option");
        productList.appendChild(option);
      //
        for (var i = 0; i < products.length; i++) {
          var option = document.createElement("option");
          option.innerHTML = products[i].name + " " + products[i].price;
          option.value = i;
          productList.appendChild(option);
        }
      }
      
      fillProductList(products);

//Criar um botão que ao ser clicado crie uma order e adicione ao array orders, e mostre um alerta a informar que o produto foi adicionado ao carrinho

      var addToCartBtn = document.getElementById("add-to-cart"); // add to cart button
      var totalElem = document.getElementById("total");
      var total = 0;

      function addToCart() {
        var productIndex = productList.value;
        var currentpProduct = products[productIndex];
        var order = new Order(currentpProduct, qtdInput.value);
        orders.push(order);
        addLineToCart(order);
      
        total += order.value;
        totalElem.innerHTML = total.toFixed(2); // 2 casas decimais no total
      }

// ADICIONAR O AVISO

      var infoAlert = document.getElementById("alert");

      function addedToCartInfo() {
        var info = infoAlert;
        info.style.transition = "visibility 0.9s linear, opacity 0.9s linear";
        info.style.visibility = "visible";
      }

      addToCartBtn.addEventListener("click", addToCart);
      addToCartBtn.addEventListener("click", addedToCartInfo);

// REMOVER O AVISO - variavel do Seclect: productList

      function removeAdeaddedToCartInfo() {
        var info = infoAlert;
        info.style.visibility = "hidden";
      }

      productList.addEventListener("click", removeAdeaddedToCartInfo); // quando o utilizador clica no <select> o "alert" desaparece, também se pode usar o attribute "change"


// ADICIONAR PRODUTOS À LISTA DE COMPRAS

      var tbody = document.getElementById("table-body"); // table body

      function addLineToCart(order) {
                var orderLine = document.createElement("tr");
                var itemCell = document.createElement("td");
                var priceCell = document.createElement("td");
                var qtdCell = document.createElement("td");
                var valueCell = document.createElement("td");
                var actionsCell = document.createElement("td");
                var removeBtn = document.createElement("button");
             
                itemCell.innerHTML = order.product.name;
                priceCell.innerHTML = order.product.price;
                qtdCell.innerHTML = order.qtd;
                valueCell.innerHTML = order.value.toFixed(2); //2 casas decimais na tabela
                removeBtn.innerHTML = "x";
                removeBtn.addEventListener("click", removeTableLine);
                
                orderLine.appendChild(itemCell);
                orderLine.appendChild(priceCell);
                orderLine.appendChild(qtdCell);
                orderLine.appendChild(valueCell);
                actionsCell.appendChild(removeBtn);
        
                orderLine.appendChild(actionsCell);
                tbody.appendChild(orderLine);

}

// REMOVE BTN

var tBody = document.getElementById("table-body");

    function removeTableLine() {
        
      // console.log("worked");
      
        var productIndex = productList.value;
        var currentProduct = products[productIndex];
        var getTr = this.parentElement.parentElement;
        //var productValue = productList.price;

        console.log(productIndex);
        console.log(currentProduct);
        //console.log(productValue);

        //remover a tr do tbody

        tBody.removeChild(getTr);

        //--------------- update o TOTAL

        var index = row.rowIndex - 1;
        var order = orders[index];
        orders.splice(index, 1);
        console.log(orders)
        total -= order.value;
    
        tbody.removeChild(row);
        totalElem.innerHTML = total;

        total -= orders.value;
        totalElem.innerHTML = total // 2 casas decimais no total

        // ----------------

        //return productIndex = currentProduct-1;
        

    }



// LIMITE INPUT + RED LINE --------------

function paintLine(row, order, limit){
  if (limit < order.value){
      row.style.backgroundColor = "red";
      return;
  }
  
  row.style.backgroundColor = "white";
}

function updateBackgroundColor() {
  var limit = limitInput.value;
  var rows = tbody.getElementsByTagName("tr");
  for (var i = 0; i < orders.length; i++) {
    paintLine(rows[i], orders[i], limit);
  }
}

limitInput.addEventListener("change", updateBackgroundColor);



})();