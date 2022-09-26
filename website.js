document.getElementById("url-input").value = "Enter any url..."

document.getElementById("url-input").onfocus = () => {
    if(document.getElementById("url-input").value === "Enter any url...") {
        document.getElementById("url-input").value = "";
    }
}

document.getElementById("url-input").addEventListener("focusout", () => {
    if(document.getElementById("url-input").value === "") {document.getElementById("url-input").value = "Enter any url..."}
});

function onButtonDownloadClick() {
    if(isValidHttpUrl(document.getElementById("url-input").value)) {
        fetch("/api/info?songUrl="+document.getElementById("url-input").value)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("result-info-artist").innerText = data.author;
                document.getElementById("result-info-title").innerText = data.title;
                document.getElementById("result-image").src = data.artwork;
                document.getElementById("result").style.visibility = "visible";
                //download
                fetch("/api/download?songUrl="+document.getElementById("url-input").value + "&saveFileName=" + "[scdl.kz-n.net] "+ data.title)
                    .then(resp => resp.blob())
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        // the filename you want
                        a.download = "[scdl.kz-n.net] "+ data.title + ".mp3";
                        console.log(a.download);
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(() => alert('Failed to download file'));
            });
    } else {
        document.getElementById("result-info-artist").innerText = "Invalid URL"
        document.getElementById("result-info-title").innerText = "Error"
        document.getElementById("result").style.visibility = "visible"; 
    }
}

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}