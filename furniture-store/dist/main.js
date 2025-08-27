let myMoney = 1000;
const myMoneyClass = document.querySelector(".myMoney");
myMoneyClass.textContent = `You have ${myMoney} money`;

function updateMoneyDisplay() {
  myMoneyClass.textContent = `You have ${myMoney} money`;
}

function displayPriceInPage(price) {
  const priceSet = document.querySelector(".priceSet");
  priceSet.textContent = `the price is ${price}`;
}

function searchFurniture() {
  const search = document.querySelector(".search-Priceitem").value.trim();

  console.log(`/priceCheck/${encodeURIComponent(search)}`);

  fetch(`/priceCheck/${encodeURIComponent(search)}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Price check result:", data);
      displayPriceInPage(data.price);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

function displayPropInPage(item) {
  const buySet = document.querySelector(".buySet");
  buySet.textContent = `Congratulations, you've just bought ${item.name} for ${item.price}. There are ${item.inventory} left now in the store.`;
}

function buyItem() {
  const name_of_item = document.querySelector(".buy-item").value.trim();

  // Step 1: check price
  fetch(`/priceCheck/${encodeURIComponent(name_of_item)}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.price) {
        alert("Item not found!");
        return;
      }

      if (myMoney >= data.price) {
        // Step 2: buy
        fetch(`/buy/${encodeURIComponent(name_of_item)}`)
          .then((res) => res.json())
          .then((item) => {
            if (!item.error) {
              myMoney -= item.price; // subtract number
              updateMoneyDisplay();
            }
            displayPropInPage(item);
          });
      } else {
        alert("Not enough money! You should get a job 😅");
      }
    });
}

let lastChairPrice = Infinity; // start with very high value

setInterval(() => {
  fetch("/priceCheck/chair")
    .then((res) => res.json())
    .then((data) => {
      const currentPrice = data.price;

      if (currentPrice < lastChairPrice) {
        // price dropped → buy chair
        fetch("/buy/chair")
          .then((res) => res.json())
          .then((item) => {
            console.log("bought chair for less");
            myMoney -= item.price; // reduce money
            updateMoneyDisplay();
          });
      } else {
        console.log("still waiting for a price drop...");
      }

      lastChairPrice = currentPrice;
    })
    .catch((err) => console.error("Price check error:", err));
}, 3000);
