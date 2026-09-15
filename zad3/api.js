// Zadanie 3 — pobranie danych z API i wyświetlenie ich jako lista kart.

const ADRES = "https://jsonplaceholder.typicode.com/users";

const wynik = document.querySelector("#wynik");
const filtr = document.querySelector("#filtr");
const licznik = document.querySelector("#licznik");

// Wszyscy pobrani użytkownicy. Filtrowanie NIE rusza tej tablicy —
// za każdym razem liczymy podzbiór od nowa, tak jak później w Reakcie.
let uzytkownicy = [];

// Dane od użytkownika i z sieci wstawiamy do HTML-a, więc trzeba je
// wcześniej unieszkodliwić — inaczej otwieramy drzwi na atak XSS.
function bezpieczny(tekst) {
  return String(tekst)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function kartaHtml(uzytkownik) {
  const { name, email, address, company } = uzytkownik;

  return `
    <li class="karta">
      <h2>${bezpieczny(name)}</h2>
      <dl>
        <dt>E-mail</dt>
        <dd><a href="mailto:${bezpieczny(email)}">${bezpieczny(email)}</a></dd>
        <dt>Miasto</dt>
        <dd>${bezpieczny(address.city)}</dd>
        <dt>Firma</dt>
        <dd>${bezpieczny(company.name)}</dd>
      </dl>
    </li>`;
}

// Jedno miejsce, które podmienia zawartość — i jedno przypisanie do innerHTML.
function pokazListe(lista) {
  if (lista.length === 0) {
    wynik.innerHTML = `<p class="stan">Brak wyników</p>`;
    return;
  }

  wynik.innerHTML = `<ul class="lista">${lista.map(kartaHtml).join("")}</ul>`;
}

function pokazBlad(komunikat) {
  wynik.innerHTML = `
    <p class="stan stan--blad">
      <strong>Nie udało się pobrać danych.</strong>
      ${bezpieczny(komunikat)}
    </p>`;
}

function odswiez() {
  const szukane = filtr.value.trim().toLowerCase();

  const widoczne = szukane === ""
    ? uzytkownicy
    : uzytkownicy.filter(u => u.name.toLowerCase().includes(szukane));

  licznik.textContent =
    `Widocznych: ${widoczne.length} z ${uzytkownicy.length}`;

  pokazListe(widoczne);
}

async function pobierzUzytkownikow() {
  try {
    const odpowiedz = await fetch(ADRES);

    // fetch NIE rzuca wyjątku przy 404 czy 500 — trzeba sprawdzić samemu.
    if (!odpowiedz.ok) {
      throw new Error(`Błąd HTTP: ${odpowiedz.status} ${odpowiedz.statusText}`);
    }

    // .json() też jest asynchroniczne, też wymaga await.
    return await odpowiedz.json();
  } catch (blad) {
    console.error("Nie udało się pobrać danych:", blad);
    throw blad;
  }
}

async function start() {
  // Napis „Ładowanie…" jest już w HTML-u, więc widać go od pierwszej klatki.
  filtr.disabled = true;

  try {
    uzytkownicy = await pobierzUzytkownikow();
    filtr.disabled = false;
    odswiez();
    filtr.focus();
  } catch (blad) {
    // Komunikat zamiast pustej białej strony.
    pokazBlad(blad.message);
    licznik.textContent = "";
  }
}

// input, nie change — lista ma się zmieniać w trakcie pisania.
filtr.addEventListener("input", odswiez);

start();
