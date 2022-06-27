 document.addEventListener("DOMContentLoaded", function(e){

  const url = "http://localhost:3000/Cars"
  let button = document.querySelector(".inquiry-form")
  const info = document.querySelector(".info")
  let price = document.getElementById("price")
  let yom = document.getElementById("yom")
  let company = document.getElementById("man")
  let image = document.getElementById("img")
  let reviews= document.querySelector("#review-form")

  document.getElementById("mybtn").addEventListener("click", e => alert("Sorry, this page is under maintainance!"))


  document.querySelector(".details").addEventListener("mouseenter", entering)
  document.querySelector(".details").addEventListener("mouseleave", leaving)

  function entering(ev){
    ev.currentTarget.style.color = "red";
  }

  function leaving(ev){
    ev.currentTarget.style.color = "gold";
  }





  button.addEventListener("submit", e => {
    e.preventDefault()
  })

  //function handleSubmit(e){
    // e.preventDefault()
      //let carObject = {
        //  reviews: e.target.reviews.value
    // }
      //renderRiviews(carObject)
      //postReviews(carObject)
  //}


  function carData() {
      fetch(url)
        .then((response) => response.json())
        .then((cardata) => {
          const ul = document.getElementById("models");
          ul.innerHTML = "";
          for (const car of cardata) {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(car.name));
            li.id = car.id;
            li.onclick = "carClick()"
            li.setAttribute("onclick","carClick("+car.id+")")
            ul.appendChild(li);

          }
        })
        .catch((error) => console.warn(error));
    }
    carData();
    
    function carInfo(car_id) {
      fetch("http://localhost:3000/Cars/" + car_id)
        .then((res) => res.json())
        .then((carData) => {
          let carName  = document.querySelector("#car-name");
          carName.innerText = carData.name;
          price.innerText = carData.price;
          yom.innerText = carData.YOM;
          company.innerText = carData.manufacturer;
          image.src = carData.image
          //reviews.innerText = carData.reviews
          let ul = document.getElementById("review-list")
          ul.innerHTML=""
          //reviews.innerText=""
          for(const review of carData.reviews){
              let li = document.createElement("li")
              li.appendChild(document.createTextNode(review))
              ul.appendChild(li)
          }
      })
        .catch((error) => console.warn(error));
    }
    carInfo(4)

    function  carClick(car_id){
      carInfo(car_id)
  }
  


    function postReviews(){
        fetch("http://localhost:3000/Cars",{
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringfy({
              reviews: handleReview
            })
        })
        .then(res => res.json())
        .then(review => console.log(review))
    }


  reviews.onsubmit=handleReview
  function handleReview(e){
      e.preventDefault()
      let review = document.getElementById("review").value
      const ul = document.getElementById("review-list");
      let li = document.createElement("li");
          li.appendChild(document.createTextNode(review));
          ul.appendChild(li);

      postReviews(review)
      
  }


 })
