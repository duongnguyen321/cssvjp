const elements = {
  gradient: document.querySelector(".gradient"),
  select: document.querySelector("select"),
  css: document.querySelector(".css"),
  toast: document.querySelector(".toast"),
  button: document.querySelector("button"),
  input1: document.querySelector("#input1"),
  input2: document.querySelector("#input2"),
};

let inputTimeout;

const dataDeg = {
  "to-right": 90,
  "to-bottom": 180,
  "to-left": 270,
  "to-top": 0,
  "to-top-right": 45,
  "to-bottom-right": 135,
  "to-bottom-left": 225,
  "to-top-left": 315,
};

const checkValue = () =>
  elements.input1.value.trim().length >= 3 &&
  elements.input1.value.trim().length <= 6 &&
  elements.input2.value.trim().length >= 3 &&
  elements.input2.value.trim().length <= 6;

const handleDeg = () => dataDeg[elements.select.value];

const formatGradientValue = () =>
  `linear-gradient(${handleDeg()}deg, #${elements.input1.value}, #${
    elements.input2.value
  })`;

const handleChangeColor = () => {
  if (checkValue()) {
    const value = formatGradientValue();
    elements.gradient.style.backgroundImage = value;
    elements.css.textContent = `background: ${value};`;
    localStorage.setItem("gradient-gradient", value);
    ["input1", "input2", "select"].forEach((key) =>
      localStorage.setItem(`gradient-${key}`, elements[key].value)
    );
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(elements.css.textContent).then(() => {
    elements.toast.textContent = "Copied to clipboard!";
    setTimeout(
      () => (elements.toast.textContent = "Click button to copy css!"),
      1500
    );
  });
};

const handleInput = (input) => {
  clearTimeout(inputTimeout);
  inputTimeout = setTimeout(() => {
    if (input.value.trim().length > 6)
      input.value = input.value.trim().slice(0, 6);
    if (input.value.trim().length === 3) {
      input.value = input.value.repeat(2);
    }
    handleChangeColor();
  }, 500);
};

Object.values(elements)
  .slice(5)
  .forEach((input) =>
    input.addEventListener("input", () => handleInput(input))
  );

elements.select.addEventListener("change", handleChangeColor);
elements.css.addEventListener("click", handleCopy);
elements.button.addEventListener("click", handleCopy);

window.addEventListener("DOMContentLoaded", () => {
  [
    "gradient-gradient",
    "gradient-input1",
    "gradient-input2",
    "gradient-select",
  ].forEach((key) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      // slice gradient- from key
      const newKey = key.slice(9);
      elements[newKey].setAttribute("placeholder", storedValue);
    }
  });
  if (localStorage.getItem("gradient-gradient")) {
    elements.gradient.style.backgroundImage =
      localStorage.getItem("gradient-gradient");
    elements.css.textContent = `background: ${localStorage.getItem(
      "gradient-gradient"
    )};`;
    elements.select.value = localStorage.getItem("gradient-select");
  }
});
