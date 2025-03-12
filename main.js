document.addEventListener('DOMContentLoaded', () => {
  if (!isWebGLAvailable()) {
    const warning = document.createElement('div');
    warning.textContent = 'Ошибка: Ваш браузер не поддерживает WebGL!';
    warning.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background: red;
      color: white;
      border-radius: 5px;
    `;
    document.body.appendChild(warning);
    return;
  }

  new Game();
});

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}
