<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signature Boxes</title>
    <link rel="stylesheet" href="http://localhost:8000/css/stylesheet.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/091d3a3550.js" crossorigin="anonymous"></script>
    <script type="module" src="http://localhost:8000/js/app.min.js"></script>
  </head>
  <body>
    <header>
    </header>
    <main>
      <section class="main-content">
        <!-- Works with single or multiple signatures -->
        <div class="canvas-container">
          <label class="signature-label">First Signature<span class="signature-indicator"></span></label>
          <canvas class="signature-box" id="signature-box-1">
          </canvas>
          <input type="hidden" class="signature-data" name="customer-signature-1" />
          <a class="clear-canvas-btn">Clear</a>
        </div>
      </section>
    </main>
    <footer>
    </footer>
  </body>
</html>