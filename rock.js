class Rock {
  constructor(position, size) {
    const geometry = new THREE.IcosahedronGeometry(size, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x707070,
      roughness: 0.8,
      metalness: 0.1
    });
  }

    // Деформация вершин
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i] += (Math.random() - 0.5) * size * 0.3;
      vertices[i + 1] += (Math.random() - 0.5) * size * 0.3;
      vertices[i + 2] += (Math.random() - 0.5) * size * 0.3;
    }
    geometry.computeVertexNormals();

    this.object = new THREE.Mesh(geometry, material);
    this.object.position.copy(position);
    this.boundingRadius = size * 1.5;
  }

  update(speed) {
    this.object.position.z += speed;
  }
}

class RockGenerator {
  constructor(scene) {
    this.scene = scene;
    this.rocks = [];
    this.rockSpeed = 0.3;
  }

  createRock() {
  // Увеличиваем диапазон по X и Y
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 50, // x от -25 до 25 (было 30)
    (Math.random() - 0.5) * 30 + 5, // y от -10 до 20 (добавлен сдвиг +5)
    this.spawnDistance
  );

  // Увеличиваем максимальный размер скал
  const size = 1 + Math.random() * 3 * this.difficulty; // Было 2
  }

    const rock = new Rock(position, 2 + Math.random() * 4);
    this.scene.add(rock.object);
    this.rocks.push(rock);
  }

  update() {
    if (Math.random() < 0.04) this.createRock();

    this.rocks.forEach((rock, index) => {
      rock.update(this.rockSpeed);
      if (rock.object.position.z > 50) {
        this.scene.remove(rock.object);
        this.rocks.splice(index, 1);
      }
    });
  }

  reset() {
    this.rocks.forEach(rock => this.scene.remove(rock.object));
    this.rocks = [];
  }
}
