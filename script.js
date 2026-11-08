window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.view['/'] = async(token) => {
  var feed = document.getElementById("feed-gists");
  console.log('Feed Elements', {feed});
  console.log(token);
  try {
    var gists = await request("/gists/raw/asset/json/gists.json");
    console.log('Getting My Gists', {token, gists});
    if(gists.length > 0) {
      var g = 0;
      do {
        var gist = gists[g];
        var card = feed.previousElementSibling.content.firstElementChild.cloneNode(true);
        var date = new Date(gist.created_at);
        card.querySelector('picture img').src = gist.owner.avatar_url;
        card.querySelector('.username').textContent = gist.owner.login;
        card.querySelector('.filename').textContent = Object.values(gist.files)[0].filename;
        card.querySelector('.filename').setAttribute('href', '/gists/gist/?id=' + gist.id);
        card.querySelector('.created').textContent = new Intl.DateTimeFormat("en-US", {
          dateStyle: "full",
          timeStyle: "long",
        }).format(date);
        card.querySelector('.description').textContent = gist.description;
        feed.insertAdjacentHTML('beforeend', card.outerHTML);
        g++;
      } while(g < gists.length);
    }
  } catch(e) {
    console.log('Error', {e})
  }
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
    mvc.view['/'](githubToken);   
  }
});
