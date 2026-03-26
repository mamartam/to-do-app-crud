const inputCheckBox = document.querySelector(".input");
const moonSunImg = document.querySelector(".moon-sun-img");

const SUN_IMG = "assets/images/sun.svg";
const MOON_IMG = "assets/images/moon.svg";

function applyTheme(savedMode) {
  document.documentElement.setAttribute("data-theme", savedMode);

  if (savedMode === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    moonSunImg.src = SUN_IMG;
    inputCheckBox.checked = true;
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    moonSunImg.src = MOON_IMG;
    inputCheckBox.checked = false;
  }
}

const savedMode = localStorage.getItem("bodyBgMode") || "light";
applyTheme(savedMode);

inputCheckBox.addEventListener("change", (e) => {
  const newTheme = e.target.checked ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("bodyBgMode", newTheme);
});
