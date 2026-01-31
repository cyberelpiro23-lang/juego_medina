import * as THREE from 'three';

export class Character {
    constructor(scene, color, xPos) {
        this.mesh = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.5, 1, 4, 8),
            new THREE.MeshStandardMaterial({ color: color })
        );
        body.position.y = 1;
        this.mesh.add(body);
        
        const nose = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.5), new THREE.MeshStandardMaterial({ color: 0x000000 }));
        nose.position.set(0, 1.2, 0.5);
        this.mesh.add(nose);
        
        this.mesh.position.set(xPos, 0, 0);
        scene.add(this.mesh);
    }

    mover(x, z) {
    
        if (x !== 0 || z !== 0) this.mesh.rotation.y = Math.atan2(x, z);
    }
}