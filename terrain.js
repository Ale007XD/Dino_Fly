class Terrain {
  constructor(scene) {
    this.scene = scene;
    this.ground = null;
    this.mountains = [];
    
    this.createGround();
    this.generateMountains();
  }

  createGround() {
    // Создаем плоскость для земли
    const geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4CAF50,
      roughness: 0.8,
      metalness: 0.1
    });
    
    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -15;
    this.scene.add(this.ground);
  }

  generateMountains() {
    // Генерация случайных гор
    const mountainGeo = new THREE.PlaneGeometry(200, 50, 100, 20);
    const vertices = mountainGeo.attributes.position.array;

    // Добавляем шум для вершин
    for (let i = 0; i < vertices.length; i += 3) {
      if (i % 9 === 0) { // Только каждую 3-ю вершину
        vertices[i + 1] = Math.random() * 10 + 5;
      }
    }
    mountainGeo.attributes.position.needsUpdate = true;

    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x607D8B,
      side: THREE.DoubleSide
    });

    const mountains = new THREE.Mesh(mountainGeo, mountainMat);
    mountains.rotation.x = Math.PI / 2;
    mountains.position.set(0, -10, -50);
    this.scene.add(mountains);
  }
}
