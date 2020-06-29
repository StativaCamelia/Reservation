document.addEventListener("DOMContentLoaded", function () {
  let bulb = document.getElementById("bulb");
  let body = document.querySelector("body");
  let main = document.getElementsByClassName("main_container")[0];
  let left = document.getElementsByClassName("left_container")[0];
  let car_text = document.getElementsByClassName("car_text");
  let right = document.getElementsByClassName("right_container")[0];
  let select = document.getElementsByClassName("text_input");
  let info = document.getElementsByClassName("info_text");
  let label = document.getElementsByClassName("text_input_label");
  let car_label = document.getElementsByClassName("car_select_label")[0];
  let title = document.getElementById("main_title");
  let client = document.getElementById("client");
  let route = document.getElementById("route");
  let currentTheme = true;

  bulb.addEventListener("click", changeTheme);
  function changeTheme() {
    if (currentTheme) {
      darkTheme();
      currentTheme = !currentTheme;
    } else {
      lightTheme();
      currentTheme = !currentTheme;
    }
  }

  function lightTheme() {
    bulb.src = "./images/black_bulb.png";
    document.body.style.backgroundImage =
      "url('http://wallpapercrafter.com/uploads/posts/53675-___red-light-rush-hour-traffic-and-day-hd.jpg')";
    main.style.backgroundColor = "white";
    left.style.backgroundColor = "white";
    right.style.backgroundColor = "white";
    for (let i = 0; i < info.length; i++) info[i].style.color = "black";
    title.style.color = "black";
    for (let i = 0; i < select.length; i++) {
      select[i].style.backgroundColor = "white";
    }
    for (let i = 0; i < label.length; i++) {
      label[i].style.backgroundColor = "#D8B4A0";
      label[i].style.color = "black";
    }
    for (let i = 0; i < car_text.length; i++) {
      car_text[i].style.color = "black";
    }
    car_label.style.color = "black";
    client.style.color = "black";
    route.style.color = "black";
  }

  function darkTheme() {
    bulb.src = "./images/yellow_bulb.png";
    document.body.style.backgroundImage =
      "url('https://images.wallpaperscraft.com/image/road_cars_street_157475_2560x1440.jpg')";
    main.style.backgroundColor = "#30475e";
    left.style.backgroundColor = "#30475e";
    right.style.backgroundColor = "#30475e";
    for (let i = 0; i < info.length; i++) info[i].style.color = "white";
    title.style.color = "white";
    for (let i = 0; i < select.length; i++) {
      select[i].style.backgroundColor = "#f0ece2";
    }
    for (let i = 0; i < label.length; i++) {
      label[i].style.backgroundColor = "#222831";
      label[i].style.color = "white";
    }
    for (let i = 0; i < car_text.length; i++) {
      car_text[i].style.color = "white";
    }
    car_label.style.color = "white";
    client.style.color = "white";
    route.style.color = "white";
  }
});
