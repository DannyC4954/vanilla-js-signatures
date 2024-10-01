const canvas = document.querySelectorAll('.signature-box');
const containerWidth = document.querySelector('.canvas-container').attributes.class.ownerElement.clientWidth;
const eventTypes = ['mousedown', 'mouseup', 'mouseout', 'mousemove', 'touchstart', 'touchend', 'touchcancel', 'touchmove'];
const ctx = [];
const clearCanvas = document.querySelectorAll('.clear-canvas-btn');
let painting = false;

function generateHTMLElement(element, attributes = {}, text = '', icon = []){
  let newElement = document.createElement(element);

  if (text && text !== "") {
    if (icon.length > 0) {
        let iconElement = generateHTMLElement('i', {class: icon.join(' ')});
        newElement.appendChild(iconElement);
    }

    newElement.appendChild(document.createTextNode(text));
  }

  if (attributes) {
    for (let attribute in attributes) {
        newElement.setAttribute(attribute, attributes[attribute]);
    }
  }

  return newElement;
}

function prepateSignatureBoxes(){
  canvas.forEach(function(c){
    c.height = 250;
    c.width = containerWidth;
    ctx.push(document.getElementById(c.id).getContext('2d'));
  });

  if (ctx.length > 0) {
    ctx.forEach(function(c){
      handleMultipleEvents(eventTypes, c);
    });
  }

  clearCanvas.forEach(function(i){
    i.addEventListener('click', function(e){
      let selectedCanvas = this.parentNode.querySelector('.signature-box');
      let context = selectedCanvas.getContext('2d');

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.beginPath();
      
      this.parentNode.querySelector('.signature-data').value = '';
      this.parentNode.querySelector('.signature-indicator').textContent = '';
    });
  });
}

function handleMultipleEvents(eventTypes, ctx){
  eventTypes.forEach(function(et){
    ctx.canvas.addEventListener(et, function(e){
      switch(et){
        case 'mousedown':
        case 'touchstart':
          startPosition(e, ctx);
          break;
        case 'mouseup':
        case 'touchend':
          finishedPostition(ctx);
          break;
        case 'mouseout':
        case 'touchcancel':
          painting = false;
          ctx.beginPath();

          if (ctx.canvas.parentNode.querySelector('.signature-data').value.length == 0){
            ctx.canvas.parentNode.querySelector('.signature-indicator').textContent = '';
            ctx.canvas.parentNode.querySelector('.signature-indicator').appendChild(generateHTMLElement('span', {class: 'pill-error'}, ' ', ['fa fa-times']));
          }
          break;
        case 'mousemove':
        case 'touchmove':
          drawSignature(e, ctx);
          break;
      }
    });
  });
}

function startPosition(e, ctx){
    painting = true;
    drawSignature(e, ctx);
}

function finishedPostition(ctx){
    painting = false;
    ctx.canvas.parentNode.querySelector('.signature-data').value = ctx.canvas.toDataURL();
    ctx.canvas.parentNode.querySelector('.signature-indicator').textContent = '';
    ctx.canvas.parentNode.querySelector('.signature-indicator').appendChild(generateHTMLElement('span', {class: 'pill-success'}, ' ', ['fa fa-check']));
    ctx.beginPath();
}

function drawSignature(e, ctx){
    if(!painting) {
        return
    }

    let rect = ctx.canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (e.clientX == undefined) {
        x = e.touches[0].clientX - rect.left;;
        y = e.touches[0].clientY - rect.top;;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

prepateSignatureBoxes();
