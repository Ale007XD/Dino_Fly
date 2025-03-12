class Game {
  constructor() {
    // Инициализация
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(this.renderer.domElement);

    // Освещение
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    this.scene.add(new THREE.AmbientLight(0x404040));

    // Игровые объекты
    this.pterodactyl = new Pterodactyl();
    this.terrain = new Terrain(this.scene);
    this.rockGenerator = new RockGenerator(this.scene);
    this.scene.add(this.pterodactyl.object);
    this.camera.position.set(0, 0, 50);

    // Состояние игры
    this.isGameOver = false;
    this.score = 0;
    this.controls = { up: false, left: false, right: false };
    this.setupEventListeners();
    this.animate();
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp': this.controls.up = true; break;
        case 'ArrowLeft': this.controls.left = true; break;
        case 'ArrowRight': this.controls.right = true; break;
        case ' ': if (this.isGameOver) this.restartGame(); break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp': this.controls.up = false; break;
        case 'ArrowLeft': this.controls.left = false; break;
        case 'ArrowRight': this.controls.right = false; break;
      }
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  restartGame() {
    this.isGameOver = false;
    this.score = 0;
    document.getElementById('score').textContent = `Счет: ${this.score}`;
    document.getElementById('game-over').classList.add('hidden');
    this.pterodactyl.reset();
    this.rockGenerator.reset();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.isGameOver) return;

    // Обновление
    this.pterodactyl.update(this.controls);
    this.rockGenerator.update();
    this.pterodactyl.animateWings(performance.now() / 1000);

    // Камера
    this.camera.position.lerp(
      new THREE.Vector3(
        this.pterodactyl.object.position.x,
        this.pterodactyl.object.position.y,
        50
      ),
      0.1
    );
    this.camera.lookAt(this.pterodactyl.object.position);

    // Рендеринг
    this.renderer.render(this.scene, this.camera);
  }
}
