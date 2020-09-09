class Popup {
  constructor(){
    this.btnPopup = document.getElementById("contact-form-btn")
    this.popup_expire = document.querySelector('.Reservation_expire')
    this.timer = document.getElementById('timer');
    this.Reservation_popup = document.querySelector('.Reservation_popup')
    this.form1 = document.querySelector(".contact-form-text")
    this.form2 = document.querySelector(".contact-form-text2")
    this.veloDispo = document.getElementById('velos_Dispo')
    this.minutes = null
    this.secondes = null
    this.interval = null
    this.nom = null
    this.prenom = null
    this.nbMinutes = null
    this.nbSecondes = null
    this.initEvenements();
  }

  validForm() {
    //je verifie que les cases ne sont pas vide
    if(this.form1.value == "" || this.form2.value == ""){
      alert('Entrer votre nom et prénom');
      return false;
    }
    this.Reservation_popup.style.display = "block";
    //je prend la valeur des cases et je les stock dans le localstorage
    localStorage.setItem('form1',this.form1.value);
    localStorage.setItem('form2',this.form2.value);
  }

  afficheName(){
    //je rentre les valeur contenues dans localstorage dans des variables
    this.nom = localStorage.getItem('form1');
    this.prenom = localStorage.getItem('form2');
    //je rentre les valeur de nom et prenom dans les cases
    this.form1.value = this.nom
    this.form2.value = this.prenom
  }

  compteur() {
    //on rentre les variables minutes et temps sous forme de patern dans la div timer
    this.timer.textContent = `${this.minutes} : ${this.secondes}`;
    //on enleve une seconde a chaque 1000ms pour crée le décompte
    this.secondes--;
    sessionStorage.setItem('minutes', this.minutes);
    sessionStorage.setItem('secondes',this.secondes);

    //decompte des minutes si 0 secondes restantes
    if(this.secondes === -1 && this.minutes > 0) {
      this.minutes--;
      this.secondes = 59;
    }

    //si il ne reste plus de minutes ni de secondes on arrete de timer et on affiche le popup d'expiration
    if(this.minutes === 0) {
      if(this.secondes == -1) {
        clearInterval(this.interval);
        this.Reservation_popup.style.display = "none";
        this.popup_expire.style.display = "block";
      }

    }
  }

  loadTimer(){
    clearInterval(this.interval);
    //on lance la fonction compteur toute les 1000ms
    this.interval= setInterval(() => {this.compteur()}, 1000);
  }

  afficheCompteur(){
    this.nbMinutes = sessionStorage.getItem('minutes');
    this.nbSecondes = sessionStorage.getItem('secondes');

    if(this.nbMinutes > 0 || this.nbSecondes > 0){
      this.minutes = this.nbMinutes
      this.secondes = this.nbSecondes
      this.Reservation_popup.style.display = "block";
      this.loadTimer();
    }
  }

  validReservation (){
    if(this.veloDispo.textContent == 0){
      alert('Veuillez choisir une station avec des vélos disponibles ');
      return false;
    }
    this.Reservation_popup.style.display = "block";
    this.minutes = 20;
    this.secondes = 0;
    this.loadTimer();
  }

  initEvenements(){

    //affiche la fonction afficheName au demmarage de la page
    window.onload = this.afficheName();
    window.onload = this.afficheCompteur();

    this.btnPopup.addEventListener("click",() => {
      this.validReservation();
      this.validForm();
    });
  }
}

let popup = new Popup();
