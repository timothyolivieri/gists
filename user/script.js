document.addEventListener("DOMContentLoaded", () => {
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken);    
  }
});
