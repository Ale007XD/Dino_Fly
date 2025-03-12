class Terrain {
  constructor(scene) {
    this.scene = scene;
    this.createGround();
    this.createMountains();
  }

  createGround() {
    const geometry = new THREE.PlaneGeometry(500, 500, 50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3CB371,
      roughness: 0.8,
      metalness: 0.1
    });

    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -10;
    this.scene.add(ground);
  }

  createMountains() {
    const mountainGroup = new THREE.Group();

    for (let i = 0; i < 15; i++) {
      const width = 80 + Math.random() * 120;
      const height = 40 + Math.random() * 60;
      const geometry = new THREE.ConeGeometry(width, height, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0x4682B4,
        roughness: 0.7
      });

      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.set(
        (Math.random() - 0.5) * 1000,
        -height / 2 - 5,
        -500 + Math.random() * 200
      );
      mountainGroup.add(mountain);
    }

    this.scene.add(mountainGroup);
  }
}
