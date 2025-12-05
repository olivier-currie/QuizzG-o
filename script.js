// script.js
document.addEventListener("DOMContentLoaded", function() {
  // Fetch navbar content and load it dynamically
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
      document.addEventListener("click", (event) => {
        if (!document.getElementById("sidemenu").contains(event.target) && !document.getElementById("hamburger").contains(event.target)) {
          document.getElementById("sidemenu").classList.remove("open");
        }
      });
    })
    if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
      document.getElementById("start").addEventListener("click", function() {
        transition()
      });
    }});

function transition() {
  document.getElementById("startscreen").style.display = "none";
  document.getElementById("choicescreen").style.display = "block";
}

function togglemenu() {
  var sidemenu = document.getElementById("sidemenu");
  sidemenu.classList.toggle('open');
}




function goBack() {
  window.history.back();
}
let score = 0;

class MultipleChoiceQuestion {
  constructor(text, options, answer, exp) {
    this.text = text;
    this.options = options;
    this.answer = answer;
    this.exp = exp;
  }

  checkAnswer(selected, feedback) {
    const feedbackElement = document.getElementById(feedback);
    if (selected === this.answer) {
      feedbackElement.innerHTML = "✅ Correct";
      feedbackElement.style.color = "green";
      feedbackElement.style.backgroundColor = "white";
      score += 10;
    } else {
        feedbackElement.innerHTML = "❌ Incorrect";
        feedbackElement.style.color = "red";
        feedbackElement.style.backgroundColor = "white";
    }
    const nxtbtn = document.querySelectorAll('.nextbutton');
    nxtbtn.forEach(btn => {
    btn.style.display = "block";
    });
  }

  buttonClicked(buttonclass, expclass) {
    const buttons = document.querySelectorAll(buttonclass);
    for (let button of buttons) {
      if (button.innerText === this.answer) {
        button.style.backgroundImage = "none";
        button.style.backgroundColor = 'green';
        button.innerHTML = "&#10004; " + button.innerHTML;
      } else {
        button.style.backgroundImage = "none";
        button.style.backgroundColor = 'red';
        button.innerHTML = "&#10006; " + button.innerHTML;
      }
    }
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.pointerEvents = "none";
      btn.style.cursor = "default";});
    const explanation = document.querySelectorAll(expclass);
    explanation.forEach((xp) => {
      xp.innerHTML = this.exp;
      xp.style.backgroundColor = "white";
    });
  }

  render() {
    return `<div>
                <p class ="questiontext">${this.text}</p>
                ${this.options.map(option => 
                    `<button class="quizbutton">${option}</button>`
                ).join("")}
                <p id="feedback" class="feedback"></p>
                <p class="exp"></p>
            </div>`;
  }
}



class InputQuestion {
  constructor(text, answer, exp) {
    this.text = text;
    this.answer = answer;
    this.exp = exp;
  }

  checkAnswer(selected, feedback) {
    const feedbackElement = document.getElementById(feedback);
    if (selected.includes(this.answer)) {
      feedbackElement.innerHTML = "✅ Correct";
      feedbackElement.style.color = "green";
      feedbackElement.style.backgroundColor = "white";
      score += 10;
    } else {
        feedbackElement.innerHTML = "❌ Incorrect";
        feedbackElement.style.color = "red";
        feedbackElement.style.backgroundColor = "white";
    }
    const nxtbtn = document.querySelectorAll('.nextbutton');
    nxtbtn.forEach(btn => {
    btn.style.display = "block";
    });
  }
  submittedAnswer(inputbarclass, buttonclass, expclass) {
    const inputbar = document.querySelectorAll(inputbarclass);
    inputbar.forEach((input) => {
      input.readOnly = true;
      input.style.caretColor = "transparent";
    });
    const buttons = document.querySelectorAll(buttonclass);
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.pointerEvents = "none";
      btn.style.cursor = "default";});
    const explanation = document.querySelectorAll(expclass);
    explanation.forEach((xp) => {
      xp.innerHTML = this.exp;
      xp.style.backgroundColor = "white";
    });
  }

  render() {
    return `<div>
                <p class="questiontext">${this.text}</p>
                <input type="text" class="inputbar" id="answerId" />
                <button class="submitbutton">Soumettre</button>
                <p id="feedback" class="feedback"></p>
                <p class="exp"></p>
            </div>`;
  }
}

class ImageInput extends InputQuestion {
  constructor(text, answer, exp, image) {
    super(text, answer, exp);
    this.image = image;
  }

  render() {
    return `<div>
                <p class="questiontext">${this.text}</p>
                <div class="imagecontour">
                    <img src=${this.image} style="margin-top: 10px; width: clamp(190px, 20.6vw, 400px); height: clamp(120px, 21.25vh, 260px);">
                </div>
                <p></p>
                <input type="text" class="inputbar" id="answerId" />
                <button class="submitbutton">Soumettre</button>
                <p id="feedback" class="feedback"></p>
                <p class="exp"></p>
            </div>`;
  }
}

class CheckQuestion {
  constructor(text, options, answers, exp) {
    this.text = text;
    this.options = options;
    this.answers = answers;
    this.exp = exp;
  }

  checkAnswer(feedback) {
    const feedbackElement = document.getElementById(feedback);
    let selectedOptions = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(checkbox => checkbox.value);
    if (selectedOptions.length === this.answers.length && selectedOptions.every(answer => this.answers.includes(answer))) {
      feedbackElement.innerHTML = "✅ Correct";
      feedbackElement.style.color = "green";
      feedbackElement.style.backgroundColor = "white";
      score += 10;
    } else {
      feedbackElement.innerHTML = "❌ Incorrect";
      feedbackElement.style.color = "red";
      feedbackElement.style.backgroundColor = "white";
    }
    const nxtbtn = document.querySelectorAll('.nextbutton');
    nxtbtn.forEach(btn => {
    btn.style.display = "block";
    });
  }

  submittedAnswer(labelclass, expclass, buttonclass) {
    const checkboxes = document.querySelectorAll('input[name="answer"]');
    for (let checkbox of checkboxes) {
      checkbox.disabled = true;
    }
    const labels = document.querySelectorAll(labelclass);
    for (let label of labels) {
      if (this.answers.includes(label.textContent)) {
        label.style.backgroundImage = "none";
        label.style.backgroundColor = 'green';
        label.innerHTML = "&#10004; " + label.innerHTML;
      } else {
        label.style.backgroundImage = "none";
        label.style.backgroundColor = 'red';
        label.innerHTML = "&#10006; " + label.innerHTML;
      }
    }
    const explanation = document.querySelectorAll(expclass);
    explanation.forEach((xp) => {
      xp.innerHTML = this.exp;
      xp.style.backgroundColor = "white";
    });
    const buttons = document.querySelectorAll(buttonclass);
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.pointerEvents = "none";
      btn.style.cursor = "default";});
  }

  render() {
    return `<div>
                <p class="questiontext">${this.text}</p>
                <div class="checkboxgrid">
                    ${this.options.map(option => 
                        `<label class="label"><input type="checkbox" name="answer" value="${option}">${option}</label>`
                    ).join("")}
                </div>
                <button class="submitbutton">Soumettre</button> 
                <p id="feedback" class="feedback"></p>
                <p class="exp"></p>
            </div>`
                
  }
}

class DragDropQuestion {
  constructor(text, flags, countries, answers){
    this.text = text;
    this.flags = flags;
    this.countries = countries;
    this.answers = answers;
    this.options = [...this.countries].sort(() => Math.random() - 0.5);
    this.attempts = 0;
    this.correct = true;
  }

  checkAnswer(feedback) {
    const feedbackElement = document.getElementById(feedback);
    this.correct = true;
    for (let dropId in this.answers) {
      let dropZone = document.getElementById(dropId);
      let droppedCountry = dropZone.getAttribute("data-dropped");
      if (droppedCountry !== this.answers[dropId]) {
        this.correct = false;
      }
    }
    if (this.correct) {
      feedbackElement.innerHTML = "✅ Correct";
      feedbackElement.style.color = "green";
      feedbackElement.style.backgroundColor = "white";
      score += 10;
    } else {
      this.attempts++;
      feedbackElement.innerHTML = `❌ Incorrect. Il vous reste ${3 - this.attempts} essais.`;
      feedbackElement.style.color = "red";
      feedbackElement.style.backgroundColor = "white";
    }
    if (this.attempts === 3 || this.correct == true) {
      const nxtbtn = document.querySelectorAll('.nextbutton');
      nxtbtn.forEach(btn => {
      btn.style.display = "block";
      });
    }
  }
  submittedAnswer(buttonclass) {
    if (this.attempts === 3 || this.correct == true) {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
      img.setAttribute('draggable', 'false');
      });
      const buttons = document.querySelectorAll(buttonclass);
      buttons.forEach((btn) => {
        btn.disabled = true;
        btn.style.pointerEvents = "none";
        btn.style.cursor = "default";
      });
    }
  }
  render() {
    return `
    <div>
        <p class="questiontext">${this.text}</p>
        <div class="draganddrop">
            <div class="flagarea">
            ${this.flags.map((flag, i) => `
              <div id="flagzone" class="drop-zone" ondrop="drop(event)" 
                  ondragover="allowDrop(event)"><img src="${flag}" id="flag${i}" 
                  class="flag" draggable="true" 
                  ondragstart="drag(event)" data-country="${this.countries[i]}"></div>
            `).join("")}
            </div><div class="dropside">
              ${this.options.map((country) => `
                <div id="drop${country}" class="drop-zone" 
                    ondrop="drop(event)" 
                    ondragover="allowDrop(event)">
                </div><p class="countrytag">${country}</p>
              `).join("")}
            </div>
        </div>
        <button class="submitbutton">Soumettre</button>
        <p id="feedback" class="feedback"></p>
    </div>`
  }
}
const EuropeQuestions = [
  new MultipleChoiceQuestion("Quelle est la capitale de la Serbie?", ["Sarajevo", "Sofia", "Belgrade", "Zagreb"], "Belgrade", "La capitale de la Serbie est Belgrade."),
  new InputQuestion("Quel est le plus grand pays d'Europe excluant la Russie?", "ukraine", "Avec une superficie de 603 628 kilomètres carrés, l'Ukraine est le second plus grand pays d'Europe."),
  new CheckQuestion("Lesquels de ces pays n'ont aucun accès à la mer?", ["Macédoine", "Moldavie", "Bosnie", "Slovénie"], ["Macédoine", "Moldavie"], "La Macédoine et la Moldavie n'ont toutes deux aucun accès à la mer."),
  new DragDropQuestion("Placez les drapeaux à côté du bon pays.", ["assets/estoniaflag.jpg", "assets/latviaflag.jpg", "assets/luxemburgflag.jpg", "assets/lithuaniaflag.jpg"], ["Estonie", "Lettonie", "Luxembourg", "Lithuanie"], {"dropEstonie" : "Estonie", "dropLettonie" : "Lettonie", "dropLuxembourg" : "Luxembourg", "dropLithuanie" : "Lithuanie"}),
  new ImageInput("Dans quel pays est situé le contenu de l'image ci-dessous?", "france", "Le Mont Saint-Michel est situé en France.", "assets/mont-saint-michel.jpg"),
  new MultipleChoiceQuestion("Quelle est le plus long fleuve d'Europe?", ["Danube", "Volga", "Rhin", "Seine"], "Volga", "Le fleuve Volga en Russie est le plus long d'Europe avec 3692 km de long."),
  new InputQuestion("Quel pays d'Europe subit une guerre civile dévastatrice entre 1936 et 1939?", "espagne", "L'Espagne fut en période de guerre civile entre 1936 et 1939."),
  new CheckQuestion("Lesquels de ces pays sont gouvernés par une monarchie?", ["Portugal", "Espagne", "Belgique", "Danemark"], ["Espagne", "Belgique", "Danemark"], "L'Espagne, la Belgique et le Danemark sont gouvernées par des monarchies. Le Portugal est une république."),
  new DragDropQuestion("Placez les drapeaux à côté du bon pays.", ["assets/norwayflag.jpg", "assets/icelandflag.jpg", "assets/denmarkflag.jpg", "assets/finlandflag.jpg"], ["Norvège", "Islande", "Danemark", "Finlande"], {"dropNorvège" : "Norvège", "dropIslande" : "Islande", "dropDanemark" : "Danemark", "dropFinlande" : "Finlande"}),
  new ImageInput("Dans quel pays est situé le contenu de l'image ci-dessous?", "allemagne", "La Porte de Brandebourg est situé en Allemagne.", "assets/brandenburg-gate.jpg")
]; 
const AfricaQuestions = [
  new MultipleChoiceQuestion("Quel est le plus long fleuve d'Afrique?", ["Congo", "Nile", "Niger", "Zambezi"], "Nile", "D'une longueur de près de 6650 km de long, le Nile est le plus long fleuve d'Afrique."),
  new InputQuestion("Quel est le plus grand pays d'Afrique?", "algerie", "Avec environ 2.38 millions de km carrés, l'Algérie est le plus grand pays d'Afrique."),
  new CheckQuestion("Lesquels de ces pays ont le français et l'arabe comme langues officielles?", ["Djibouti", "Chad", "Mali", "Mauritanie"], ["Djibouti", "Chad"], "Ce sont le Djibouti et le Chad."),
  new DragDropQuestion("Placez les drapeaux à côté du bon pays.", ["assets/kenyaflag.jpg", "assets/mozambiqueflag.jpg", "assets/zimbabweflag.jpg", "assets/angolaflag.jpg"], ["Kenya", "Mozambique", "Zimbabwe", "Angola"], {"dropKenya" : "Kenya", "dropMozambique" : "Mozambique", "dropZimbabwe" : "Zimbabwe", "dropAngola" : "Angola"}),
  new ImageInput("Dans quel pays se trouve cette fameuse montagne d'Afrique?", "tanzanie", "Le mont Kilimanjaro est situé en Tanzanie.", "assets/kilimanjaro.jpg"),
  new MultipleChoiceQuestion("Quel est le pays le plus peuplé d'Afrique?", ["Nigeria", "Égypte", "RD du Congo", "Éthiopie"], "Nigeria", "Le Nigeria est le pays le plus peuplé d'Afrique avec 237.5 millions d'habitants."),
  new InputQuestion("Quel pays d'Afrique n'a jamais été colonisé, excepté une brève occupation italienne sous Mussolini?", "ethiopie", "Il s'agit de l'Éthiopie."),
  new CheckQuestion("Lesquelles de ces villes se trouvent au bord de la mer Méditérannée?", ["Algiers", "Marrakech", "Tunis", "Benghazi"], ["Algiers", "Tunis", "Benghazi"], "Il s'agit d'Algiers, Tunis et Benghazi."),
  new DragDropQuestion("Placez les drapeaux à côté du bon pays.", ["assets/sudanflag.jpg", "assets/ghanaflag.jpg", "assets/libyaflag.jpg", "assets/mauritaniaflag.jpg"], ["Soudan","Ghana", "Libye", "Mauritanie"], {"dropSoudan" : "Soudan", "dropGhana" : "Ghana", "dropLibye" : "Libye", "dropMauritanie" : "Mauritanie"}),
  new ImageInput("Dans quel pays d'Afrique se trouve le site dans cette image?", "tunisie", "Il s'agit des ruines d'un collisée romain à El Djem en Tunisie.", "assets/el-djem.jpg")
];
const AsiaQuestions = [
  new MultipleChoiceQuestion("Quel pays d'Asie possède le plus d'îles?", ["Indonésie", "Japon", "Philippines", "Corée du Sud"], "Indonésie", "Avec ses 17 508 îles, l'Indonésie est la plus nombreuse archipel d'Asie."),
  new InputQuestion("Quelle ancienne colonnie française asiatique fut jadis divisée en deux pays?", "vietnam", "Il s'agit du Viet Nam."),
  new CheckQuestion("Lesquels de ces pays ne touchent PAS à la mer Caspienne?", ["Iran", "Arménie", "Turquie", "Khazakstan"], ["Arménie", "Turquie"], "Ce sont l'Arménie et la Turquie."),
  new DragDropQuestion("Placez les drapeaux à côté du bon pays.", ["assets/iraqflag.jpg", "assets/uaeflag.jpg", "assets/syriaflag.jpg", "assets/koweitflag.jpg"], ["Irak", "Émirats Arabes Unis", "Syrie", "Koweit"], {"dropIrak" : "Irak", "dropÉmirats Arabes Unis" : "Émirats Arabes Unis", "dropSyrie" : "Syrie", "dropKoweit" : "Koweit"}),
  new ImageInput("Dans quel pays se trouve le site dans cette image?", "jordanie", "La cité de Petra est en Jordanie.", "assets/petra.jpg"),
  new MultipleChoiceQuestion("Quel est le fleuve le plus long d'Asie?", ["Indus", "Ganges", "Yangtze", "Fleuve Jaune"], "Yangtze", "D'une longueur de près de 6300 km de long, le Yangtze est le plus long fleuve d'Asie."),
  new InputQuestion("Quelle est la capitale du Pakistan?", "islamabad", "La capitale du Pakistan est Islamabad."),
  new CheckQuestion("Lesquels de ces villes sont la capitale de leur pays?", ["Dubai", "Alep", "Muscat", "Dhaka"], ["Muscat", "Dhaka"], "Muscat est la capitale de l'Oman et Dhaka est la capitale du Bangladesh."),
  new DragDropQuestion("Placez les drapeaux à côté du bon pays.", ["assets/cambodiaflag.jpg", "assets/thailandflag.jpg", "assets/burmaflag.jpg", "assets/laosflag.jpg"], ["Cambodge", "Thailande", "Birmanie", "Laos"], {"dropCambodge" : "Cambodge", "dropThailande" : "Thailande", "dropBirmanie" : "Birmanie", "dropLaos" : "Laos"}),
  new ImageInput("Dans quel pays d'Asie se trouve le site dans cette image?", "inde", "Le Hawa Mahal se trouve en Inde.", "assets/hawa-mahal.jpg")
];



let currentquestion = 0;
let currentimage = 0;
let Sorted = null;

function displayQuestions(questions) {
  if (questions === EuropeQuestions) {
    if (currentquestion === 0) {
      Sorted = [...EuropeQuestions].sort(() => Math.random() - 0.5);
    }
    document.getElementById("euroquiz").innerHTML = Sorted[currentquestion].render();
  } else if (questions === AfricaQuestions) {
    if (currentquestion === 0) {
      Sorted = [...AfricaQuestions].sort(() => Math.random() - 0.5);
    }
    document.getElementById("afroquiz").innerHTML = Sorted[currentquestion].render();
  } else if (questions === AsiaQuestions) {
    if (currentquestion === 0) {
      Sorted = [...AsiaQuestions].sort(() => Math.random() - 0.5);
    }
    document.getElementById("asiaquiz").innerHTML = Sorted[currentquestion].render();
  }
  if (Sorted[currentquestion] instanceof MultipleChoiceQuestion) {
    const buttons = document.querySelectorAll('.quizbutton');
    buttons.forEach((btn)=> {
      setImages(btn);
      btn.addEventListener('click', () => {
        Sorted[currentquestion].checkAnswer(btn.textContent, 'feedback');
        Sorted[currentquestion].buttonClicked('.quizbutton', '.exp');
        displayScore('scorebox', '.quizzbox');
      });
    });
  } else if (Sorted[currentquestion] instanceof InputQuestion) {
    const buttons = document.querySelectorAll('.submitbutton');
    buttons.forEach((btn)=> {
      btn.addEventListener('click', () => {
        Sorted[currentquestion].checkAnswer(document.getElementById('answerId').value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ''), 'feedback');
        Sorted[currentquestion].submittedAnswer('.inputbar', '.submitbutton', '.exp');
        displayScore('scorebox', '.quizzbox');
      });
    });
  } else if (Sorted[currentquestion] instanceof CheckQuestion) {
    const buttons = document.querySelectorAll('.submitbutton');
    const labels = document.querySelectorAll('.label');
    labels.forEach((lbl)=> {
      setImages(lbl);
    })
    buttons.forEach((btn)=> {
      btn.addEventListener('click', () => {
        Sorted[currentquestion].checkAnswer('feedback');
        Sorted[currentquestion].submittedAnswer('.label', '.exp', '.submitbutton');
        displayScore('scorebox', '.quizzbox');
      });
    });
  } else {
    const buttons = document.querySelectorAll('.submitbutton');
    buttons.forEach((btn)=> {
      btn.addEventListener('click', () => {
        Sorted[currentquestion].checkAnswer('feedback');
        Sorted[currentquestion].submittedAnswer('.submitbutton');
        displayScore('scorebox', '.quizzbox');
      });
    });
  }
}

const Images = {
  "Sarajevo" : "assets/bosnia.jpg",
  "Sofia" : "assets/bulgaria.jpg",
  "Belgrade" : "assets/serbia.jpg",
  "Zagreb" : "assets/croatia.jpg",
  "Volga" : "assets/volga.jpg",
  "Danube" : "assets/danube.jpg",
  "Rhin" : "assets/rhine.jpg",
  "Seine" : "assets/seine.jpg",
  "Belgique" : "assets/belgium.jpg",
  "Espagne" : "assets/spain.jpg",
  "Portugal" : "assets/portugal.jpg",
  "Danemark" : "assets/denmark.jpg",
  "Macédoine" : "assets/macedonia.jpg",
  "Moldavie" : "assets/moldova.jpg",
  "Slovénie" : "assets/slovenia.jpg",
  "Bosnie" : "assets/bosnia.jpg",
  "Djibouti" : "assets/djibouti.jpg",
  "Chad" : "assets/chad.jpg",
  "Mali" : "assets/mali.jpg",
  "Mauritanie" : "assets/mauritania.jpg",
  "Algiers" : "assets/algiers.jpg",
  "Tunis" : "assets/tunis.jpg",
  "Benghazi" : "assets/benghazi.jpg",
  "Marrakech" : "assets/marrakech.jpg",
  "Nigeria" : "assets/nigeria.jpg",
  "Égypte" : "assets/egypt.jpg",
  "Éthiopie" : "assets/ethiopia.jpg",
  "RD du Congo" : "assets/drc.jpg",
  "Nile" : "assets/nile.jpg",
  "Niger" : "assets/niger.jpg",
  "Congo" : "assets/congo.jpg",
  "Zambezi" : "assets/zambezi.jpg",
  "Iran" : "assets/iran.jpg",
  "Arménie" : "assets/armenia.jpg",
  "Turquie" : "assets/turkey.jpg",
  "Khazakstan" : "assets/khazakstan.jpg",
  "Indus" : "assets/indus.jpg",
  "Ganges" : "assets/ganges.jpg",
  "Yangtze" : "assets/yangtze.jpg",
  "Fleuve Jaune" : "assets/yellow-river.jpg",
  "Muscat" : "assets/muscat.jpg",
  "Alep" : "assets/aleppo.jpg",
  "Dubai" : "assets/dubai.jpg",
  "Dhaka" : "assets/dhaka.jpg",
  "Indonésie" : "assets/indonesia.jpg",
  "Japon" : "assets/japan.jpg",
  "Philippines" : "assets/philippines.jpg",
  "Corée du Sud" : "assets/korea.jpg"
}

function setImages(token) {
  const tokentxt = token.textContent;
  const tokenimg = Images[tokentxt];
  token.style.backgroundImage = `url(${tokenimg})`;
}


// adjust css using clamp() for sizes

let startTime = null;
let endTime = null;

function nextQuestion() {
  if (window.location.pathname === '/Europe.html') {
    if (currentquestion < EuropeQuestions.length - 1) {
      currentquestion++;
      displayQuestions(EuropeQuestions);
    } else if (currentquestion === EuropeQuestions.length - 1) {
      endTime = new Date();
      endQuiz("euroquiz", "Europe");
    }
  } else if (window.location.pathname === '/Afrique.html') {
    if (currentquestion < AfricaQuestions.length - 1) {
      currentquestion++;
      displayQuestions(AfricaQuestions);
    } else if (currentquestion === AfricaQuestions.length - 1) {
      endTime = new Date();
      endQuiz("afroquiz", "Afrique");
    }
  } else if (window.location.pathname === '/Asie.html') {
      if (currentquestion < AsiaQuestions.length - 1) {
        currentquestion++;
        displayQuestions(AsiaQuestions);
      } else if (currentquestion === AsiaQuestions.length - 1) {
        endTime = new Date();
        endQuiz("asiaquiz", "Asie");
      }
  }
  const nxtbtn = document.querySelectorAll('.nextbutton');
  nxtbtn.forEach(btn => {
    btn.style.display = "none";
  });
}

function displayScore(scoreboxid, quizclass) {
  const scorebox = document.getElementById(scoreboxid);
  scorebox.innerHTML = `<p class="score">Score: ${score}</p>`;
  const quizbox = document.querySelectorAll(quizclass);
  quizbox.forEach(box => {
    box.style.marginTop = "0";
  });
}
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setData("country", event.target.getAttribute("data-country"));
}
function allowDrop(event) {
  event.preventDefault();
}
function drop(event) {
  event.preventDefault();
  let draggedId = event.dataTransfer.getData("text");
  let draggedCountry = event.dataTransfer.getData("country");

  let dropZone = event.target;

  if (dropZone.classList.contains("drop-zone")) {
    dropZone.innerHTML = "";
    dropZone.appendChild(document.getElementById(draggedId)); 
    dropZone.setAttribute("data-dropped", draggedCountry);
  }
}

function endQuiz(qbid, name) {
  document.getElementById("scorebox").style.display = "none";
  const qb = document.getElementById(qbid);
  const timeDifference = endTime - startTime;
  const minutes = Math.floor(timeDifference / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);
  qb.style.backgroundColor = "white";
  qb.style.marginTop = "clamp(80px, 20vh, 200px)";
  qb.innerHTML = `<h3>Vous avez terminé le quiz sur l'${name}!</h3>
                  <p class="finishtxt">Votre score est: </p>
                  <p></p>
                  <p class="scoretxt">${score}</p>
                  <p></p>
                  <p class="finishtxt">Votre temps est: </p>
                  <p></p>
                  <p class="scoretxt">${minutes} min ${seconds} secs</p>
                  <p></p>
                  <p class="finishtxt">Vous pouvez retourner à l'accueil</p>
                  <button class="accueilbutton" onclick = "window.location.href='index.html';">Accueil &rarr;</button>`;
  
}

window.onload = function() {
  if (window.location.pathname === '/Europe.html') {
    startTime = new Date();
    displayQuestions(EuropeQuestions);
  } else if (window.location.pathname === '/Afrique.html') {
    startTime = new Date();
    displayQuestions(AfricaQuestions);
  } else if (window.location.pathname === '/Asie.html') {
    startTime = new Date();
    displayQuestions(AsiaQuestions);
  }
}

