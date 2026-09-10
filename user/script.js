window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.view['/user'] = async() => {
  var gists = await github.gists.list();
  console.log('Getting My Gists', {gists});
}
mvc.controller = {};
mvc.controller.logout = () => {
  localStorage.removeItem('github-token');
  document.body.removeAttribute('auth');
}
mvc.controller.token = (event) => {
  event.preventDefault();
  var githubToken = event.target.querySelector('input[type="password"]').value;
  alert("Checking token... " + githubToken);
  localStorage.setItem('github-token', githubToken);
  document.body.setAttribute("auth", githubToken);
  mvc.view['/user']();
};
document.addEventListener("DOMContentLoaded", () => {
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken); 
    mvc.view['/user']();   
  }
});
