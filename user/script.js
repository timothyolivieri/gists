window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.view['/user'] = async(token) => {
  console.log(token);
  var gists = await github.gists.list(null, token);
  console.log('Getting My Gists', {token, gists});
}
mvc.controller = {};
mvc.controller.logout = () => {
  localStorage.removeItem('github-token');
  document.body.removeAttribute('auth');
}
mvc.controller.token = async(event) => {
  event.preventDefault();
  var githubToken = event.target.querySelector('input[type="password"]').value;
  //alert(githubToken);
  try {
    var user = await github.users.token(githubToken);
    console.log("Checking token... ", {githubToken, user});
    localStorage.setItem('github-token', githubToken);
    document.body.setAttribute("auth", githubToken);
    mvc.view['/user'](githubToken);
  } catch(e) {
    alert('Invalid Access Token');
  }
};
document.addEventListener("DOMContentLoaded", () => {
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken); 
    mvc.view['/user'](githubToken);   
  }
});
