class Game {
  constructor() {
    // ... предыдущий код конструктора

    // Добавляем ландшафт
    this.terrain = new Terrain(this.scene);

    // Настраиваем камеру
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(0, 0, 0);

    // ... остальной код без изменений
  }

  animate() {
    // ... предыдущий код

    // Плавное перемещение камеры за птеродактилем
    this.camera.position.x += (this.pterodactyl.object.position.x - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.pterodactyl.object.position.y - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.pterodactyl.object.position);
  }
}
