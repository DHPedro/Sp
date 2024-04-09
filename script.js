function searchAndPlay() {
  var songName = document.getElementById("songName").value;
  if (songName.trim() !== "") {
    searchForTrack(songName);
  } else {
    alert("Por favor, insira o nome da música.");
  }
}

function searchForTrack(songName) {
  var apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + encodeURIComponent(songName) + '&api_key=b88d55f0dcd1940a2575dc70394e126d&format=json';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.trackmatches && data.results.trackmatches.track.length > 0) {
        var trackUrl = data.results.trackmatches.track[0].url;
        fetch(trackUrl)
          .then(response => response.json())
          .then(trackData => {
            if (trackData.track && trackData.track.url) {
              playSong(trackData.track.url);
            } else {
              alert("URL de áudio inválido.");
            }
          })
          .catch(error => {
            console.error("Erro ao carregar URL de áudio:", error);
            alert("Erro ao carregar música.");
          });
      } else {
        alert("Nenhuma música encontrada.");
      }
    })
    .catch(error => {
      console.error("Erro ao buscar música:", error);
      alert("Erro ao buscar música.");
    });
}

function playSong(trackUrl) {
  var musicPlayer = document.getElementById("musicPlayer");
  musicPlayer.src = trackUrl;
  musicPlayer.play();
}

function pauseSong() {
  var musicPlayer = document.getElementById("musicPlayer");
  musicPlayer.pause();
}

function stopSong() {
  var musicPlayer = document.getElementById("musicPlayer");
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
}
