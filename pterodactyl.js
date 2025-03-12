class Pterodactyl {
  constructor() {
    this.object = new THREE.Group();

    // Материал тела
    const material = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.7,
      metalness: 0.1
    });

    // Тело (цилиндр)
    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2, 8);
    const body = new THREE.Mesh(bodyGeometry, material);
    body.rotation.z = Math.PI / 2;
    this.object.add(body);

    // Голова (конус)
    const headGeometry = new THREE.ConeGeometry(0.2, 0.8, 8);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.set(1.2, 0, 0);
    head.rotation.z = -Math.PI / 2;
    this.object.add(head);

    // Крылья (плоскости)
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });

    const wingGeometry = new THREE.PlaneGeometry(2, 0.8);
    
    // Левое крыло
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(0, 0, -0.7);
    leftWing.rotation.y = Math.PI / 4;
    this.object.add(leftWing);

    // Правое крыло
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0, 0, 0.7);
    rightWing.rotation.y = -Math.PI / 4;
    this.object.add(rightWing);

    // Физика
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.speed = 0.1;
    this.lift = 0.02;
    this.boundingRadius = 1.0;

  // Увеличиваем масштаб модели в 1.5 раза
  this.object.scale.set(1.5, 1.5, 1.5);
  this.boundingRadius *= 1.5; // Обновляем радиус столкновений
    }

  animateWings(time) {
    const wings = this.object.children.filter(child => 
      child.geometry.type === "PlaneGeometry"
    );
    
    wings[0].rotation.z = Math.sin(time * 5) * 0.2;
    wings[1].rotation.z = -Math.sin(time * 5) * 0.2;
  }

  update(controls, deltaTime) {
  // Добавляем возможность снижения при отпускании клавиши
  if (!controls.up) {
    this.velocity.y -= this.lift * 0.5; // Плавное снижение
  }

  // Остальная логика без изменений
  // ...
  }

    // Горизонтальное движение
    if (controls.left) {
      this.velocity.x = -this.speed;
    } else if (controls.right) {
      this.velocity.x = this.speed;
    } else {
      this.velocity.x *= 0.95;
    }

    // Ограничение скорости
    this.velocity.y = Math.max(Math.min(this.velocity.y, 0.2), -0.2);
    
    // Обновление позиции
    this.object.position.add(this.velocity);
    this.object.rotation.z = -this.velocity.y * 2;
  }

  reset() {
    this.object.position.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
  }
}
