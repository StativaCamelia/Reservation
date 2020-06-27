var location_start;
var location_end;
var distance;
var selected_car;
var car_prices = {
  car1: 1,
  car2: 2,
  car3: 3,
};
var first_location = {};
var map;

var geocoder = new google.maps.Geocoder();
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();

document.addEventListener("DOMContentLoaded", formHandler);
document.addEventListener("DOMContentLoaded", tryGetLocation);

function tryGetLocation() {
  let location = document.getElementById("location");
  location.addEventListener("click", getLocation);
  location.click;
  getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
}

function getPosition(position) {
  first_location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  var marker = new google.maps.Marker({
    position: first_location,
    animation: google.maps.Animation.DROP,
  });
  marker.setMap(map);
  map.setCenter(marker.getPosition());
  getGeocodeFromLatLng();
}

function getGeocodeFromLatLng() {
  let from_field = document.getElementById("from_field");
  geocoder.geocode({ location: first_location }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        from_field.value = results[0].formatted_address;
        geocodePlaceId(
          map,
          results[0].place_id,
          "start",
          directionsRenderer,
          directionsService
        );
        console.log(results[0]);
      }
    }
  });
}

function initMap() {
  var input_from = document.getElementById("from_field");
  var autocomplete1 = new google.maps.places.Autocomplete(input_from);
  var input_to = document.getElementById("to_field");
  var autocomplete2 = new google.maps.places.Autocomplete(input_to);
  map = document.getElementById("map");

  prevent_refresh(input_from);
  prevent_refresh(input_to);

  lati = parseInt(map.getAttribute("latitude"));
  lngi = parseInt(map.getAttribute("longitude"));

  google.maps.event.addListener(map, "bounds_changed", function () {
    autocomplete1.bindTo(map, "bounds");
  });
  autocomplete1.setFields([
    "place_id",
    "address_components",
    "geometry",
    "icon",
    "name",
  ]);

  google.maps.event.addListener(autocomplete1, "place_changed", function () {
    geocodePlaceId(
      map,
      autocomplete1.getPlace().place_id,
      "start",
      directionsRenderer,
      directionsService
    );
  });

  google.maps.event.addListener(map, "bounds_changed", function () {
    autocomplete2.bindTo(map, "bounds");
  });
  autocomplete2.setFields([
    "place_id",
    "address_components",
    "geometry",
    "icon",
    "name",
  ]);
  google.maps.event.addListener(autocomplete2, "place_changed", function () {
    geocodePlaceId(
      map,
      autocomplete2.getPlace().place_id,
      "stop",
      directionsRenderer,
      directionsService
    );
  });
  var uluru = {
    lat: first_location.lat ? first_location.lat : lati,
    lng: first_location.lng ? first_location.lng : lngi,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: uluru,
  });
  directionsRenderer.setMap(map);
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

document.addEventListener("load", function () {
  initMap();
});

function prevent_refresh(type) {
  google.maps.event.addDomListener(type, "keydown", function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
}

function getDirections(directionsRenderer, directionsService) {
  if (location_end && location_start) {
    var start = `${location_start.lat()}, ${location_start.lng()}`;
    var end = `${location_end.lat()}, ${location_end.lng()}`;
    directionsService.route(
      {
        origin: { query: start },
        destination: { query: end },
        travelMode: "DRIVING",
      },
      function (response, status) {
        if (status === "OK") {
          distance = setDurationAndDistance(
            response.routes[0].legs[0].duration.text,
            response.routes[0].legs[0].distance.text,
            response.routes[0].legs[0].distance.value
          );
          directionsRenderer.setDirections(response);
        } else {
          window.alert("We can get your informations because: " + status);
        }
      }
    );
  }
}

function geocodePlaceId(
  map,
  placeId,
  type,
  directionsRenderer,
  directionsService
) {
  var placeId = geocoder.geocode({ placeId: placeId }, function (
    results,
    status
  ) {
    if (status === "OK") {
      if (results[0]) {
        type === "start"
          ? (location_start = results[0].geometry.location)
          : (location_end = results[0].geometry.location);
        getDirections(directionsRenderer, directionsService);
      } else {
        window.alert("No results found");
      }
    }
  });
}

function setDurationAndDistance(durantion, distance, distanceNumber) {
  const duration_field = document.getElementById("duration");
  const distance_field = document.getElementById("distance");
  duration_field.innerText += durantion;
  distance_field.innerText += distance;
  return distanceNumber;
}

function formHandler() {
  let submit_button = document.getElementById("submit");
  selectCar();
  submit_button.addEventListener("click", submitForm);
}

function closeModal() {
  let closeModal = document.getElementById("close");
  let modal = document.getElementById("modal");
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
function checkValues() {}

function submitForm(e) {
  e.preventDefault();
  let completedValues = 0;
  let valuesToComplete = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("from_field"),
    document.getElementById("to_field"),
  ];
  let modal = document.getElementById("modal");
  let modal_text = document.getElementById("modal_text");
  closeModal();
  for (let i = 0; i < valuesToComplete.length; i++) {
    valuesToComplete[i].value
      ? avertisation(valuesToComplete[i], i, "right")
      : avertisation(valuesToComplete[i], i, "wrong");
    if (valuesToComplete[i].value) completedValues++;
  }
  !selected_car
    ? avertisation(null, 4, "wrong")
    : avertisation(null, 4, "right");
  if (
    completedValues === 4 &&
    selected_car &&
    checkEmail(valuesToComplete[1].value, valuesToComplete[1])
  ) {
    var price = calcPrice();
    modal.style.display = "block";
    modal_text.innerText = `Multumim pentru comanda domnule/doamna ${valuesToComplete[0].value}. Pretul d-voastra este ${price}`;
  }
}

function checkEmail(email, element) {
  const error_email = document.getElementById("email_adv");
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    element.style.border = "solid 2px red";
    error_email.innerText = "Introdu un email valid";
    error_email.style.display = "block";
  } else {
    element.style.border = "1px solid #D8B4A0";
    error_email.style.display = "none";
    error_email.innerHTML = "Introdu email-ul";
  }
  return re.test(String(email).toLowerCase());
}

function calcPrice() {
  return (distance / 1000) * car_prices[selected_car];
}
function selectCar() {
  let cars;
  let car1 = document.getElementById("car1");
  let car2 = document.getElementById("car2");
  let car3 = document.getElementById("car3");
  cars = [car1, car2, car3];
  for (let i = 0; i < cars.length; i++) {
    addClickEvent(cars[i], i);
  }
}

function addClickEvent(car, index) {
  car.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      chooseCar(car, index);
    },
    false
  );
}

function chooseCar(car, index) {
  let cars;
  let car1 = document.getElementById("car1_img");
  let car2 = document.getElementById("car2_img");
  let car3 = document.getElementById("car3_img");
  cars = [car1, car2, car3];
  for (let i = 0; i < cars.length; i++) {
    if (i === index) {
      selected_car = car.value;
      cars[i].style.background = "#95A4A2";
    } else {
      cars[i].style.background = "";
    }
  }
}

function avertisation(element, index, type) {
  let avertisments = [
    document.getElementById("name_adv"),
    document.getElementById("email_adv"),
    document.getElementById("from_adv"),
    document.getElementById("to_adv"),
    document.getElementById("car_adv"),
  ];
  if (type === "wrong") {
    if (element) {
      element.style.border = "solid 2px red";
    }
    avertisments[index].style.display = "block";
  } else {
    if (element) element.style.border = "1px solid #D8B4A0";
    avertisments[index].style.display = "none";
  }
}
