function searchAndPlay() {
  var songName = document.getElementById("songName").value;
  if (songName.trim() !== "") {
    searchForTrack(songName);
  } else {
    alert("Por favor, insira o nome da música.");
  }
}

function searchForTrack(songName) {
  var apiUrl = 'https://api.deezer.com/search?q=' + encodeURIComponent(songName);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar música: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.data && data.data.length > 0) {
        var trackUrl = data.data[0].preview;
        if (trackUrl) {
          playSong(trackUrl);
        } else {
          alert("Nenhuma prévia de música encontrada.");
        }
      } else {
        alert("Nenhuma música encontrada.");
      }
    })
    .catch(error => {
      console.error(error);
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
