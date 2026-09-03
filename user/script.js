window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.controller = {};
mvc.controller.token = (event) => {
  event.preventDefault();
  alert("Checking token...");
};
document.addEventListener("DOMContentLoaded", () => {
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken);    
  }
});
