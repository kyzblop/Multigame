// Gestion du clic droit
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert("Pas de clic droit ici")
})

// Gestion des raccourcis claviers
document.addEventListener('keydown', function(event) {
    // Désactiver les raccourcis pour les outils de développement
    if ((event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.key === 'F12')) {
  
      event.preventDefault(); // Empêche l'action par défaut
      alert('Pas d\'inspecteur ici');
    }
});

// detection de devtool

function verifierDevtool(){
    if(window.outerHeight - window.innerHeight > (0.15 * window.outerHeight)){
        sessionStorage.setItem("stack", 0)
        alert("Pas d'inspecteur")
    }

    if(window.outerWidth - window.innerWidth > (0.15 * window.outerWidth)) {
        sessionStorage.setItem("stack", 0)
        alert("Pas d'inspecteur")
    }
}


setInterval(verifierDevtool, 1000)