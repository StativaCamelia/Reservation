document.addEventListener("DOMContentLoaded", function () {
  const romanian = document.getElementById("romania");
  romanian.addEventListener("click", change_ro);
  const english = document.getElementById("english");
  english.addEventListener("click", change_en);

  let durata = document.getElementById("duration");
  let distanta = document.getElementById("distance");

  let main_title = document.getElementById("main_title");

  let client = document.getElementById("client");
  let route = document.getElementById("route");

  let tip = document.getElementById("tip");
  let label_nume = document.getElementById("nume_l");
  let nume = document.getElementById("name");
  let nume_adv = document.getElementById("name_adv");

  let label_email = document.getElementById("email_l");
  let email = document.getElementById("email");
  let email_adv = document.getElementById("email_adv");

  let from_l = document.getElementById("from_l");
  let from = document.getElementById("from_field");
  let from_adv = document.getElementById("from_adv");

  let to_l = document.getElementById("to_l");
  let to = document.getElementById("to_field");
  let to_adv = document.getElementById("to_adv");

  let car_l = document.getElementById("car_l");
  let car1 = document.getElementById("car1_text");
  let car2 = document.getElementById("car2_text");
  let car3 = document.getElementById("car3_text");
  let car_adv = document.getElementById("car_adv");
  let submit = document.getElementById("submit");
  let title = document.getElementById("title");

  function change_ro() {
    durata.innerText = "Durata:";
    distance.innerText = "Distanta:";
    main_title.innerText = "Rezerva o masina";

    client.innerText = "Detalii client";
    route.innerHTML = "Detalii traseu";
    tip.innerText =
      "Tot ce trebuie sa faci este sa introduci un nume, un email, locatia de ponire si destinatia si sa alegi o masina!";
    label_nume.innerText = "Nume:";
    nume.placeholder = "Introdu numele";
    nume_adv.innerText = "Introdu numele";

    label_email.innerText = "Email:";
    email.placeholder = "Introdu email";
    email_adv.innerHTML = "Introdu email";

    from_l.innerText = "De la:";
    from.placeholder = "Introdu adresa de start";
    from_adv.innerText = "Introdu adresa de start";

    to_l.innerText = "Pana la";
    to.placeholder = "Introdu destinatia";
    to_adv.innerText = "Introdu destinatia";

    car_l.innerText = "Selecteaza o masina";
    car1.innerText = "Masina 1";
    car2.innerText = "Masina 2";
    car3.innerText = "Masina 3";
    car_adv.innerText = "Selecteaza o masina";
    submit.innerText = "Calculeaza pretul";

    title.innerText = "Rezervarea a fost plasata!";
  }

  function change_en() {
    durata.innerText = "Duration:";
    distanta.innerText = "Distance:";
    main_title.innerText = "Reserve a car";
    client.innerText = "Client info";
    route.innerHTML = "Client route";
    tip.innerText =
      "Enter your name, email, your start location and your end location and choose a car!";
    label_nume.innerText = "Name:";
    nume.placeholder = "Enter your name";
    nume_adv.innerText = "Enter your name";

    label_email.innerText = "Email:";
    email.placeholder = "Enter your email";
    email_adv.innerHTML = "Enter your email";

    from_l.innerText = "From:";
    from.placeholder = "Enter your start adress";
    from_adv.innerText = "Enter your start andress";

    to_l.innerText = "To:";
    to.placeholder = "Enter your destination";
    to_adv.innerText = "Enter your destination";

    car_l.innerText = "Select a car";
    car1.innerText = "Car 1";
    car2.innerText = "Car 2";
    car3.innerText = "Car 3";
    car_adv.innerText = "Select a car";
    submit.innerText = "Calculate the price";

    title.innerText = "Your reservation has been placed!";
  }
});
