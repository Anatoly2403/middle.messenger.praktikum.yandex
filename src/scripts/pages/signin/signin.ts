import { getNodeByDataAttr } from "../../utils";

document.addEventListener("DOMContentLoaded", () => {
  const signinBtn = getNodeByDataAttr("button", "signin");
  if (!signinBtn) return;

  signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/main";
  });
});
