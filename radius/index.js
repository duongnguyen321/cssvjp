const select = document.querySelector(".select");
const radius = document.querySelector(".radius");
const input = document.querySelector(".input-el");
const inputVal = document.querySelector(".value-input");
const css = document.querySelector(".css");
const toast = document.querySelector(".toast");
const button = document.querySelector(".button");

const normalizeValue = (value) => {
  if (value.includes("/")) {
    value = value.replace("/", `${select.value}/`);
  }
  if (value.includes(" ")) {
    value = value.replace(" ", `${select.value} `);
  }
  return value;
};

const handleChange = () => {
  const value = input.value;
  if (value) {
    const valueRadius = normalizeValue(value) + select.value;
    radius.style.borderRadius = valueRadius;
    localStorage.setItem("radius-radius", valueRadius);
    localStorage.setItem("radius-select", select.value);
    localStorage.setItem("radius-input", value);
    css.textContent = `border-radius: ${valueRadius};`;
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(css.textContent);
  toast.textContent = "Copied to clipboard!";
  setTimeout(() => {
    toast.textContent = "Click button to copy css!";
  }, 1500);
};

css.addEventListener("click", handleCopy);
button.addEventListener("click", handleCopy);

select.addEventListener("change", (e) => {
  handleChange();
  input.placeholder = `Enter ${e.target.value} value`;
  inputVal.textContent = e.target.value;
});

input.addEventListener("input", (e) => {
  handleChange();
});

window.addEventListener("DOMContentLoaded", () => {
  const gradient = localStorage.getItem("gradient-gradient");
  if (gradient) {
    radius.style.background = gradient;
  }
  const radiusRadius = localStorage.getItem("radius-radius");
  const radiusSelect = localStorage.getItem("radius-select");
  const radiusInput = localStorage.getItem("radius-input");
  if (radiusRadius) {
    radius.style.borderRadius = radiusRadius;
    css.textContent = `border-radius: ${radiusRadius};`;
  }
  if (radiusSelect) {
    select.value = radiusSelect;
    input.placeholder = `Enter ${radiusSelect} value`;
    inputVal.textContent = radiusSelect;
  }
  if (radiusInput) {
    input.value = radiusInput;
  }
});
