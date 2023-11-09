const photo = {
    "id": 6590699,
    "width": 3264,
    "height": 4912,
    "url": "https://www.pexels.com/photo/tall-majestic-palm-trees-on-green-hills-6590699/",
    "photographer": "Alexis Ricardo Alaurin",
    "photographer_url": "https://www.pexels.com/@alexisricardoalaurin",
    "photographer_id": 1507405,
    "avg_color": "#A39A86",
    "src": {
        "original": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg",
        "large2x": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
    },
    "liked": false,
    "alt": "Tall majestic palm trees on green hills"
};





const URL = "https://api.pexels.com/v1/search?query=nature";
const API_KEY = "xxOMhInKqpJysREsPExj5IfIzvJHFXgROIB0pqM9iyV76aHFmVRyqlul";

const loadImgs = document.querySelector(".btn.btn-primary.my-2");
const secondaryImgs = document.querySelector(".btn.btn-secondary.my-2")
const photoCards = Array.from(document.getElementsByClassName("card mb-4 shadow-sm"));

const populatePhotoCard = (card, photo) => {
    const [svg, cardBody] = card.children;
    svg.remove();
    const cardImg = document.createElement("img");
    cardImg.src = photo.src.medium;
    card.appendChild(cardImg)
    cardBody.remove()
    card.appendChild(cardBody)
    const [title, text, bottom] = cardBody.children;
    console.log(bottom);
    bottom.children[1].innerText = photo.id;
}

loadImgs.onclick = () => {
  fetch("https://api.pexels.com/v1/search?query=nature", {
    headers: {"Authorization": API_KEY},
  })
    .then(response => response.json())
    .then(result => {
        // console.log(result)
        const photos = result.photos
        console.log(photos)
        const cardsAndPhotos = photoCards.map((photoCard, index) => {
            return {photoCard, photo: photos[index]}
        })
        cardsAndPhotos.forEach(cardsAndPhoto => {
            const {photoCard, photo} = cardsAndPhoto;
            populatePhotoCard(photoCard, photo);
        })
    })
    .catch(error => console.log("error", error));
};

secondaryImgs.onclick = () => {
    fetch("https://api.pexels.com/v1/search?query=food", {
    headers: {"Authorization": API_KEY},
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
};

const hideButtons = Array.from(document.getElementsByClassName("btn btn-sm btn-outline-secondary")).filter(btn => btn.innerText === "Hide");


hideButtons.forEach(btn => {
    btn.onclick = ev => {
      const cardCol = ev.target.parentElement.parentElement.parentElement.parentElement.parentElement;
      cardCol.remove();;
    };
  });



