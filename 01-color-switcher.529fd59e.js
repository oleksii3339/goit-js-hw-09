!function(){var t=document.body,e=document.querySelector([data-start]),n=document.querySelector([data-stop]),a=null;e.addEventListener("click",(function(){a=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),e.disabled=!0})),n.addEventListener("click",(function(){clearInterval(a),e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.529fd59e.js.map
