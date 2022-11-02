document.addEventListener('DOMContentLoaded', (event) => {

  const canvas = document.querySelectorAll('.signature-box');
  const containerWidth = document.querySelector('.canvas-container').attributes.class.ownerElement.clientWidth;
  const ctx = [];
  const clearCanvas = document.querySelectorAll('.clear-canvas-btn');
  var painting = false;

  canvas.forEach(function(c){
    c.height = 250;
    c.width = containerWidth;
    ctx.push(document.getElementById(c.id).getContext('2d'));
  });

  ctx.forEach(function(c){
    c.canvas.addEventListener('mousedown', function(e){
      startPosition(e, c);
    });
    c.canvas.addEventListener('mouseup', function(e){
      finishedPostition(c);
    });
    c.canvas.addEventListener('mouseout', function(e){
        finishedPostition(c);
    });
    c.canvas.addEventListener('mousemove', function(e){
      draw(e, c);
    });
  });

  clearCanvas.forEach(function(i){
    i.addEventListener('click', function(e){
      var selectedCanvas = this.parentNode.querySelector('.signature-box');
      var context = selectedCanvas.getContext('2d');
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.beginPath();
      this.parentNode.querySelector('.signature-data').value = '';
      this.parentNode.querySelector('.signature-indicator').innerHTML = '';
    });
  });

  function startPosition(e, ctx){
    painting = true;
    draw(e, ctx);
  }

  function finishedPostition(ctx){
    painting = false;
    ctx.canvas.parentNode.querySelector('.signature-data').value = ctx.canvas.toDataURL();
    ctx.canvas.parentNode.querySelector('.signature-indicator').innerHTML = '<i class="fas fa-check-circle" style="color: #30b68c;"></i>';
    ctx.beginPath();
  }

  function draw(e, ctx){
    if(!painting) return;
    var rect = ctx.canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  
});
