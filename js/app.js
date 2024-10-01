import { initializeSignatureBoxes } from './signature-module.js';

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  initializeSignatureBoxes();
});