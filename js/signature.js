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
    // Desktop
    c.canvas.addEventListener('mousedown', function(e){
      startPosition(e, c);
    });
    c.canvas.addEventListener('mouseup', function(e){
      finishedPostition(c);
    });
    c.canvas.addEventListener('mouseout', function(e){
        painting = false;
        c.beginPath();
    });
    c.canvas.addEventListener('mousemove', function(e){
      draw(e, c);
    });
    // Mobile -- need setting up and testing on mobile / tablet
    c.canvas.addEventListener('touchstart', function(e){
        startPosition(e, c);
    });
    c.canvas.addEventListener('touchend', function(e){
        finishedPostition(c);
    });
    c.canvas.addEventListener('touchcancel', function(e){
        painting = false;
        c.beginPath();
        if( c.canvas.parentNode.querySelector('.signature-data').value.length == 0 ){
            c.canvas.parentNode.querySelector('.signature-indicator').innerHTML = '<span class="pill-error"><i class="fa fa-times"></i></span>';
        }
    });
    c.canvas.addEventListener('touchmove', function(e){
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
    if( e.clientX == undefined ){
        var x = e.touches[0].clientX - rect.left;;
        var y = e.touches[0].clientY - rect.top;;
    } else {
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
    }
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

});
