import { getNodeByDataAttr } from "../../utils";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = getNodeByDataAttr("button", "login");
  if (!loginBtn) return;

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "/main";
  });
});
