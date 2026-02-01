import * as THREE from 'three';

// Usamos "export" para que el index.html pueda ver esta clase
export class Personaje {
    constructor(escena, x, z) {
        this.escena = escena;
        
        // En lugar de cargar un modelo, creamos una esfera de prueba
        const geometria = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Color verde
        this.modelo = new THREE.Mesh(geometria, material);
        
        // La posicionamos
        this.modelo.position.set(x, 1, z);
        
        // La añadimos a la escena
        this.escena.add(this.modelo);
        
        console.log("¡La conexión funciona! Esfera creada.");
    }
}