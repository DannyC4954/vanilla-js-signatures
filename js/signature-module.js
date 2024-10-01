const eventTypes = ['mousedown', 'mouseup', 'mouseout', 'mousemove', 'touchstart', 'touchend', 'touchcancel', 'touchmove'];

class SignatureBox {
  #painting = false;

  constructor(canvasElement, containerWidth) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = 250;
    this.canvas.width = containerWidth;
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    eventTypes.forEach(eventType => 
      this.canvas.addEventListener(eventType, this.#handleEvent.bind(this))
    );
  }

  #handleEvent(event) {
    const handlers = {
      mousedown: this.#startDrawing,
      touchstart: this.#startDrawing,
      mouseup: this.#stopDrawing,
      touchend: this.#stopDrawing,
      mouseout: this.#cancelDrawing,
      touchcancel: this.#cancelDrawing,
      mousemove: this.#draw,
      touchmove: this.#draw
    };

    handlers[event.type]?.call(this, event);
  }

  #startDrawing(event) {
    this.#painting = true;
    this.#draw(event);
  }

  #stopDrawing() {
    this.#painting = false;
    this.ctx.beginPath();
    this.#updateSignatureData();
  }

  #cancelDrawing() {
    this.#painting = false;
    this.ctx.beginPath();

    if (this.ctx.canvas.parentNode.querySelector('.signature-data').value.length === 0) {
        this.#updateSignatureIndicator(false);
    }
  }

  #draw(event) {
    if (!this.#painting) return;

    const rect = this.canvas.getBoundingClientRect();
    let x = event.clientX ?? event.touches[0].clientX - rect.left;
    let y = event.clientY ?? event.touches[0].clientY - rect.top;

    x = (event.clientX == undefined) ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    y = (event.clientY == undefined) ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  #updateSignatureData() {
    const dataInput = this.canvas.parentNode.querySelector('.signature-data');
    dataInput.value = this.canvas.toDataURL();
    this.#updateSignatureIndicator(true);
  }

  #updateSignatureIndicator(success = false) {
    const indicator = this.canvas.parentNode.querySelector('.signature-indicator');
    indicator.textContent = '';

    const iconClass = success ? 'fa-check' : 'fa-times';
    const pillClass = success ? 'pill-success' : 'pill-error';
    indicator.appendChild(SignatureBox.#createIcon(iconClass, pillClass));
  }

  static #createIcon(iconClass, pillClass) {
    const span = document.createElement('span');
    span.className = pillClass;
    const icon = document.createElement('i');
    icon.className = `fa ${iconClass}`;
    span.appendChild(icon);
    return span;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.canvas.parentNode.querySelector('.signature-data').value = '';
    this.canvas.parentNode.querySelector('.signature-indicator').textContent = '';
  }
}

export function initializeSignatureBoxes() {
  const container = document.querySelector('.canvas-container');
  const containerWidth = container?.clientWidth ?? 300; // Default width if container not found
  const canvasElements = document.querySelectorAll('.signature-box');
  const signatureBoxes = Array.from(canvasElements).map(canvas => new SignatureBox(canvas, containerWidth));

  document.querySelectorAll('.clear-canvas-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => signatureBoxes[index].clear());
  });
}