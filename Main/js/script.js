new fJs.AutoWriteText({
    separator: '|',
    timeout: 50
});

// Initialisation de la valeur du stack
let valeurStack = sessionStorage.getItem("stack")
document.getElementById("stackValeur").innerText = valeurStack

// Gestion du clic droit
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert("Pas de clic droit ici, Nulos")
})

// Gestion des raccourcis claviers
document.addEventListener('keydown', function(event) {
    // Désactiver les raccourcis pour les outils de développement
    if ((event.ctrlKey && event.shiftKey && event.key === 'I') || // Ctrl + Shift + I
        (event.key === 'F12') || // F12
        (event.ctrlKey && event.key === 'U') || // Ctrl + U (voir source)
        (event.ctrlKey && event.key === 'S') || // Ctrl + S (enregistrer la page)
        (event.ctrlKey && event.key === 'P')) { // Ctrl + P (imprimer)
  
      event.preventDefault(); // Empêche l'action par défaut
      alert('Essaie encore');
    }
});