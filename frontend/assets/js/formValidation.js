import IMask from "imask";

var creditCard = document.getElementById("credit-card");
var creditCardMask = {
  mask: "0000-0000-0000-0000",
};
var creditCardIMask = IMask(creditCard, creditCardMask);

var expDate = document.getElementById("exp-date");
var expDateMask = {
  mask: "00/00",
};
IMask(expDate, expDateMask);

var phoneNumber = document.getElementById("phone");
var phoneNumberMask = {
  mask: "(000) 000-00-00",
};
var phoneNumberIMask = IMask(phoneNumber, phoneNumberMask);

const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

checkout.onsubmit = (e) => {
  e.preventDefault();

  const inputIds = [
    "first-name",
    "last-name",
    "email",
    "country",
    "postal",
    "phone",
    "credit-card",
    "CVV",
    "exp-date",
  ];

  const formValid = () => {
    inputIds.forEach((inputId) => {
      const input = document.querySelector(`#${inputId}`);
      input.parentElement.querySelector(".error-msg").innerText = null;

      if (input.value === "") {
        input.value = "";

        input.parentElement.querySelector(".error-msg").innerText =
          "Field cannot be empty";
      }

      if (input.id === "email" && !emailTest.test(input.value)) {
        input.value = "";
        input.parentElement.querySelector(".error-msg").innerText =
          "Wrong email format ex (john@doe.com)";
      }

      if (input.id === "postal" && input.value.length < 5) {
        input.value = "";
        input.parentElement.querySelector(".error-msg").innerText =
          "Postal code should have 5 digits";
      }
      if (input.id === "phone" && phoneNumberIMask.unmaskedValue.length < 9) {
        input.value = "";
        input.parentElement.querySelector(".error-msg").innerText =
          "Phone number should have 9 digits";
      }

      if (input.id === "CVV" && input.value.length < 3) {
        input.value = "";
        input.parentElement.querySelector(".error-msg").innerText =
          "CVV should have exacly 3 digits";
      }

      if (
        input.id === "credit-card" &&
        creditCardIMask.unmaskedValue.length < 16
      ) {
        input.value = "";
        input.parentElement.querySelector(".error-msg").innerText =
          "Credit card number should have 16 digits";
      }
      if (input.id === "exp-date" && input.value.length < 5) {
        input.value = "";
        input.parentElement.querySelector(".error-msg").innerText =
          "Exp Date wrong format ex (12/23)";
      }
    });
  };

  formValid();

  const formData = new FormData(checkout);
  formData.set("phone", phoneNumberIMask.unmaskedValue);
  formData.set("creditCard", creditCardIMask.unmaskedValue);

  fetch("/order", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) =>
      data.message ? alert("You did it!") : alert("oh god no, please no...")
    );
};
