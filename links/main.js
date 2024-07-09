/* eslint-disable */

const btn = document.getElementById("mobile-button");
const hamburguer = document.querySelector("#hamburguer");

function toggleMenu() {
  const navigation = document.querySelector(".mobile-items");
  navigation.classList.toggle("active-toggle");
  hamburguer.classList.toggle("active-toggle");
}

btn.addEventListener("click", toggleMenu);

// botao de fechar o form

// const closeIcon = document.querySelector('#close');

// closeIcon.addEventListener('click', () => {
//   document.querySelector(".form-full").classList.add("d-none");
// })

// // script do form

(() => {
  console.log('passei aqui')
  const linksForm = (acTagEnv) => {
    let link;
    switch (acTagEnv) {
      case "cacique-betmidas":
        link = "https://caciqueadslinks.com/betmidas";
        break;
      case "cacique-estrela":
        link = "https://caciqueadslinks.com/estrelabet";
        break;
      case "cacique-br4bet":
        link = "https://caciqueadslinks.com/br4bet";
        break;
      case "cacique-trevobet":
        link = "https://caciqueadslinks.com/trevobet";
        break;
      case "cacique-chillibet":
        link = "https://caciqueadslinks.com/chillibet";
        break;
      case "cacique-compayz":
        link = "https://caciqueadslinks.com/compayz";
        break;
      case "cacique-olhodedeus":
        link = "https://caciqueadslinks.com/olhodedeus";
        break;
      case "cacique-telegram":
        link = "https://www.carregar.me/grupodotelegramcacique";
        break;

      default:
        link = "https://google.com";
        break;
    }

    return link;
  };
// teste
  const banners = document.querySelectorAll(".banner-link");

  let acTagEnv;
  let targetUrlEnv;

  banners.forEach((banner) => {
    banner.onclick = () => {
      const result = linksForm(banner.id);
      document.querySelector(".form-full").classList.remove("d-none");
      acTagEnv = banner.id;
      targetUrlEnv = result;
    };
  });

  document.querySelector("form ._submit").disabled = true;
  document.querySelector("form ._submit").classList.add("hide-me");

  const formElements = document.querySelectorAll("div._form_element");
  const hiddenFieldsElements = [];
  const hiddenFieldsInputs = [];

  formElements.forEach((formElement) => {
    const formElementInput = formElement.querySelector(
      '._field-wrapper input[name^="field"]'
    );
    if (formElementInput) {
      formElementInput.value = "";
      formElementInput.style.display = "none";
      const newFormElement = formElement;
      newFormElement.style.display = "none";
      hiddenFieldsElements.push(formElement);
      hiddenFieldsInputs.push(formElementInput);
    }
  });

  const btn = document.createElement("button");
  btn.innerHTML = "Enviar";
  btn.type = "button";
  btn.className = "btn btn-success btn-lg";
  btn.style.cssText = "width: 100%;";
  btn.id = "customSubmit";

  const formContainer = document.querySelector("._form > div._form-content");
  if (formContainer) {
    formContainer.appendChild(btn);
  }
  // Active Form
  const acForm = document.querySelector("._form");

  document.querySelector("#customSubmit").onclick = () => {
    console.log(acTagEnv, targetUrlEnv);
    // Montando url de destino
    const currentPageUrl = new URL(window.location);
    const currentPageQueryParams = Object.fromEntries(
      currentPageUrl.searchParams
    );
    const targetUrl = new URL(targetUrlEnv);
    console.log(targetUrl);
    const targetQueryParams = Object.fromEntries(targetUrl.searchParams);

    const mergedQueryParams = Object.assign(
      targetQueryParams,
      currentPageQueryParams
    );
    mergedQueryParams.afp = document.getElementById("email").value || "";
    mergedQueryParams.afp1 = mergedQueryParams.fbclid || "";
    mergedQueryParams.afp2 = document.getElementById("phone").value || "";
    // mergedQueryParams.afp3 = mergedQueryParams.event || '';
    mergedQueryParams.afp4 = document.getElementById("fullname").value || "";
    mergedQueryParams.afp5 = mergedQueryParams.jtm || "";
    mergedQueryParams.c = mergedQueryParams.jtm || "";
    targetUrl.search = new URLSearchParams(mergedQueryParams);

    // Active Campaign - Fields
    hiddenFieldsInputs[0].value = targetUrl.href.replace(/https?:\/\//i, "");
    hiddenFieldsInputs[1].value = acTagEnv;

    // submit no Form
    acForm.requestSubmit();

    // Botão desativado por um tempo pra evitar que o lead clique varias vezes seguidas
    document.querySelector("#customSubmit").disabled = true; // Submit Disabled
    setTimeout(() => {
      document.querySelector("#customSubmit").disabled = false; // Enabled
    }, 2500);
  };
})();


