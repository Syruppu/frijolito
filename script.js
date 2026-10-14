let isOpen = false;

// -------------------------------------------------------------
// CONFIGURA AQUÍ EL MENSAJE E IMAGEN PARA CADA OPCIÓN:
// -------------------------------------------------------------
const customContent = {
  "Besos": {
    text: "besito caturra",
    img: "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyemRwcXFqMHQyZGtncGY2c3JkMzQyMjNmbTV3M2cyaHBxanE0OGRmMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12aC2hH2jrDpDi/200w.gif"
  },
  "Abrazos": {
    text: "pero con cosquillas uwu",
    img: "https://i.pinimg.com/originals/69/2a/5c/692a5ca9ea28c54c77df560e374b798a.gif"
  },
  "Mimitos": {
    text: "Gei",
    img: "https://i.pinimg.com/736x/66/93/e8/6693e889993e65e95853651dd58b4ea3.jpg"
  }
};
// -------------------------------------------------------------

// Abre el sobre al hacer clic
function openEnvelope() {
  if (!isOpen) {
    document.getElementById('envelopeWrapper').classList.add('open');
    isOpen = true;
  }
}

// Transición suave entre tarjetas de la carta
function switchCard(currentCardId, nextCardId) {
  const currentCard = document.getElementById(currentCardId);
  const nextCard = document.getElementById(nextCardId);

  if (currentCard && nextCard) {
    currentCard.classList.remove('active');
    currentCard.classList.add('hidden');

    setTimeout(() => {
      nextCard.classList.remove('hidden');
      nextCard.classList.add('active');
    }, 400);
  }
}

// Si responde "Sí"
function sayYes(event) {
  event.stopPropagation();
  const activeCard = document.querySelector('.card.active');
  if (activeCard) {
    if (activeCard.id === 'card2') {
      document.getElementById('finalMessage').innerHTML = "💖 ¡Sabía que dirías que sí! Me haces muy feliz. ✨";
      switchCard('card2', 'cardOptions');
    } else {
      switchCard(activeCard.id, 'cardOptions');
    }
  }
}

// Si responde "No" en la primera pregunta
function sayNo(event) {
  event.stopPropagation();
  switchCard('card1', 'card2');
}

// Si responde "Definitivamente no"
function sayFinalNo(event) {
  event.stopPropagation();
  alert("wekito");
}

// Al presionar "Continuar ❤️" en la lista de opciones
function submitOptions(event) {
  event.stopPropagation();

  // Lee directamente el radio button seleccionado en la tarjeta de opciones
  const selectedRadio = document.querySelector('input[name="option"]:checked');

  if (!selectedRadio) {
    alert("¡Selecciona una opción! ❤️");
    return;
  }

  const selectedValue = selectedRadio.value;

  if (selectedValue === "Secreto") {
    switchCard('cardOptions', 'cardSecret');
  } else {
    const data = customContent[selectedValue];
    if (data) {
      document.getElementById('detailImg').src = data.img;
      document.getElementById('detailText').innerText = data.text;
      switchCard('cardOptions', 'cardDetail');
    }
  }
}

// Al presionar "Enviar 💌" en el Secreto
function submitSecret(event) {
  event.stopPropagation();

  const phoneNumber = "56982962632"; 
  const secretText = document.getElementById('secretInput').value.trim();

  if (secretText === "") {
    alert("¡Escribe un secreto primero! 🤫");
    return;
  }

  const message = `Hola amor, mi secreto es: ${secretText}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

// Botón "Volver a elegir 🔄"
function backToOptions(event) {
  event.stopPropagation();
  
  // Desmarca la opción para permitir volver a elegir
  const selectedRadio = document.querySelector('input[name="option"]:checked');
  if (selectedRadio) {
    selectedRadio.checked = false;
  }

  switchCard('cardDetail', 'cardOptions');
}