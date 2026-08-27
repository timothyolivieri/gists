document.addEventListener("DOMContentLoaded", {
  var gitHubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken);    
  }
});
