window.mvc = {};
mvc.model = {};
mvc.view = {};
mvc.view['/gist'] = async(token) => {
      
  window.cm = {};

  window.dom = {

    body: document.body,

    "html": document.getElementById('CodeMirrorHTML'),

    "css": document.getElementById('CodeMirrorCSS'),

    "js": document.getElementById('CodeMirrorJS'),

    "resize": {

      "code": document.getElementById("resizer"),

      "html": document.getElementById('html-resizer'),

      "css": document.getElementById('css-resizer'),

      "js": document.getElementById('js-resizer')

    },

    "iframe": {

      "code": {

        "elem": document.getElementById("iframe-code")

      }

    }
  }
  
  var uri = window.location.pathname;
  var search = window.location.search;
  var url = new URL(uri+search,location.origin);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const allParams = Object.fromEntries(params);
  console.log(41, {url, search, id, token, allParams});

  if(id) {
    
    cm.html = CodeMirror(dom.html, {
  
      lineNumbers: true,
  
      lineWrapping: true,
  
      htmlMode: true,
  
      mode: 'xml',  
  
      styleActiveLine: true,
  
      matchBrackets: true
  
    });
  
    cm.html.on("change",(change) => { 
  
      upd();
  
    });
      
    
    cm.css = CodeMirror(dom.css, {
  
      lineNumbers: true,
  
      lineWrapping: true,
  
      mode: 'css',  
  
      styleActiveLine: true,
  
      matchBrackets: true
  
    });
  
    cm.css.on("change",(change) => { 
  
      upd();
  
    });
  
      
    
    cm.js = CodeMirror(dom.js, {
  
      lineNumbers: true,
  
      lineWrapping: true,
  
      mode: 'javascript',  
  
      styleActiveLine: true,
  
      matchBrackets: true
  
    });
  
    cm.js.on("change",(change) => {
  
      upd();
  
    });
    
    try {
      var gist = await github.gists.id(id);
      console.log(49, {gist});    
      if(gist) {
        var keys = Object.keys(gist.files);
        var vals = Object.values(gist.files)
        console.log(55, {keys, vals});  
        if(keys.length > 0) {
          var i = 0;
          do {
            var key = keys[i];
            var ext = key.split(".")[1];
            if(key == "index.html") {
              cm[ext].setValue(vals[i].content);
              cm[ext].body = true;
            }
            if(key == "script.js") {
                  cm[ext].setValue(vals[i].content);
                  cm[ext].body = true;
            }
            if(key == "style.css") {
                  cm[ext].setValue(vals[i].content);
                  cm[ext].body = true;
            }
            i++;
          } while(i < keys.length)         
        }
      }
    } 
    catch(e) {
      
    }
  }
  else {

    cm.html = CodeMirror(dom.html, {
  
      lineNumbers: true,
  
      lineWrapping: true,
  
      htmlMode: true,
  
      mode: 'xml',  
  
      styleActiveLine: true,
  
      matchBrackets: true
  
    });
  
    cm.html.on("change",(change) => { 
  
      upd();
  
    });
    
      
    
    cm.css = CodeMirror(dom.css, {
  
      lineNumbers: true,
  
      lineWrapping: true,
  
      mode: 'css',  
  
      styleActiveLine: true,
  
      matchBrackets: true
  
    });
  
    cm.css.on("change",(change) => { 
  
      upd();
  
    });
  
      
    
    cm.js = CodeMirror(dom.js, {
  
      lineNumbers: true,
  
      lineWrapping: true,
  
      mode: 'javascript',  
  
      styleActiveLine: true,
  
      matchBrackets: true
  
    });
  
    cm.js.on("change",(change) => {
  
      upd();
  
    });
    //pvw();
    
  }
      
}
mvc.controller = {};
mvc.controller.logout = () => {
  localStorage.removeItem('github-token');
  document.body.removeAttribute('auth');
  window.location.href = '/gists/user';
}
mvc.controller.menu = target => {
  var btn = target.closest('a');
  var nav = btn.nextElementSibling;
  var display = nav.getAttribute('css-display');
  display === "none" ? nav.setAttribute("css-display", "flex") : nav.setAttribute("css-display", "none");
}
mvc.controller.save = async() => {
      var html = cm["html"].getValue();
      var css = cm["css"].getValue();
      var js = cm["js"].getValue();
      console.log(234, {html, css, js});
      
      var uri = window.location.pathname;
      var search = window.location.search;
      var url = new URL(uri+search,location.origin);
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      var files = {};
      if(html !== "") {
            files["index.html"] = {
                  content: html
            }
      } else {
            if(cm["html"].body === true) {
                  files["index.html"] = {
                        content: ""
                  }
            }
      }
      if(css !== "") {
            files["style.css"] = {
                  content: css
            }
      } else {
            if(cm["css"].body === true) {
                  files["style.css"] = {
                        content: ""
                  }
            }
      }
      if(js !== "") {
            files["script.js"] = {
                  content: js
            }
      } else {
            if(cm["js"].body === true) {
                  files["script.js"] = {
                        content: ""
                  }
            }
      }
      
      var settings = {
            body: JSON.stringify({
                  "files": files
            }),
            method: "PATCH"
      }
      console.log("Pushing Gist to Git... ", {id, settings}, {files});
      try {
            var patch = await github.gists.id(id, settings);
            console.log(245, {patch});
            alert("Gist patched successfully!");
            window.location.reload();
      } catch(e) {
            console.log(246, {e})
      }
}

document.addEventListener("DOMContentLoaded", async() => {
  
  var githubToken = localStorage.getItem("github-token");
  if(githubToken) {
    document.body.setAttribute("auth", githubToken); 
  }
  mvc.view['/gist'](githubToken);   
  
}, {once: true});

function getBlobURL(code, type) {

  const blob = new Blob([code], { type });

  return URL.createObjectURL(blob);

}

function getPageURL(html,css,js) {

  const cssURL = getBlobURL(css, 'text/css');

  const jsURL = getBlobURL(js, 'text/javascript');

  const source = `

    <html>

      <head>

        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}

        ${js && `<script src="${jsURL}">${atob('PC9zY3JpcHQ+')}`}

      </head>

      <body>

        ${html || ''}

      </body>

    </html>

  `;

  return getBlobURL(source, 'text/html');

}

function pvw() {

  dom.iframe.code.doc = document.getElementById("iframe-code").contentDocument;

  dom.iframe.code.head = document.getElementById("iframe-code").contentDocument.querySelector('head');

  dom.iframe.code.head.innerHTML = '<style id="style"></style>';

  dom.iframe.code.style = dom.iframe.code.head.querySelector('style');   

  dom.iframe.code.body = document.getElementById("iframe-code").contentDocument.querySelector('body');

}

function upd() {

  pvw();

  var html = cm.html.getValue();

  var css = cm.css.getValue();

  var js = cm.js.getValue();

  var page = getPageURL(html,css,js);

  dom.iframe.code.style.textContent = css;

  dom.iframe.code.elem.src = page;

}