const btn = document.getElementById("search-btn");
const result = document.getElementById("result");
const sound = document.getElementById("sound");

btn.addEventListener("click", () => {
  const input_word = document.getElementById("input-word").value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input_word}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
        let example = "";
        for (const definition of data[0].meanings[0].definitions) {
          if (definition.example) {
            example = definition.example;
            break;
          }
        }
        
        result.innerHTML = `
          <div class="word">
            <h3>${data[0].word}</h3>
            <button onClick="playSound()">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
          <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic || ""}/</p>
          </div>
          <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
            ${example}
          </p>`;

        if (
          data[0].phonetics &&
          data[0].phonetics[0] &&
          data[0].phonetics[0].audio
        ) {
          sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        }
      } else {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playSound() {
  sound.play();
}
