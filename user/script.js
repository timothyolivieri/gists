window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.controller = {};
mvc.controller.token = (event) => {
  event.preventDefault();
  var token = event.target.querySelector('input[type="password"]').value;
  alert("Checking token... " + token);
  localStorage.setItem('github-token', token);
};
document.addEventListener("DOMContentLoaded", () => {
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken);    
  }
});
