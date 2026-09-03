window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.controller = {};
mvc.controller.token = (event) => {
  event.preventDefault();
  var githubToken = event.target.querySelector('input[type="password"]').value;
  alert("Checking token... " + githubToken);
  localStorage.setItem('github-token', githubToken);
  document.body.setAttribute("auth", githubToken); 
};
document.addEventListener("DOMContentLoaded", () => {
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken);    
  }
});
