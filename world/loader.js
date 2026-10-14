document.querySelectorAll('img[data-b64]').forEach(function(i){fetch(i.dataset.b64).then(function(r){return r.text()}).then(function(t){i.src='data:image/jpeg;base64,'+t.trim()})});
