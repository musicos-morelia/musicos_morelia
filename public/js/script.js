
fetch('json_data.json')
  .then(response => response.json())
  .then(data => {
    // Use the parsed JSON data to create product cards
    for (let i of data) {
      // console.log(i)
      //Create Card
      let card = document.createElement("div");
      //Card should have category and should stay hidden initially
      card.classList.add("card", i.category, "hide");

      //product name
      let name = document.createElement("h5");
      name.classList.add("product-name");
      name.innerText = i.title.toUpperCase();
      card.appendChild(name);

      //links
      let link = document.createElement("a");
      link.classList.add("product-link");
      link.innerText = "Read More";
      link.href = i.url;
      card.appendChild(link);

      document.getElementById("products").appendChild(card);
    }
    //Initially display all products
    filterProduct("all");
  })
  .catch(error => console.error(error));

/*
for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.title.toUpperCase();
  card.appendChild(name);
  

  let link = document.createElement("a");
  link.classList.add("product-name");
  link.innerText = i.title.toUpperCase();
  link.href = i.url;
  card.appendChild(link);

  document.getElementById("products").appendChild(card);
}
*/

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};
