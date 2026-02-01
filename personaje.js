import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Personaje {
    constructor(escena, rutaModelo, x, z) {
        this.escena = escena;
        this.modelo = null;
        this.velocidad = 0.1; // Qué tan rápido se moverá
        this.cargarModelo(rutaModelo, x, z);
    }

    cargarModelo(ruta, x, z) {
        const loader = new GLTFLoader();
        loader.load(ruta, (gltf) => {
            this.modelo = gltf.scene;
            this.modelo.scale.set(0.5, 0.5, 0.5); 
            this.modelo.position.set(x, 0, z);
            this.escena.add(this.modelo);
        });
    }

    // Esta función la llamaremos 60 veces por segundo
    mover(teclas) {
        if (!this.modelo) return; // Si el modelo no ha cargado, no hacemos nada

        if (teclas.w) this.modelo.position.z -= this.velocidad;
        if (teclas.s) this.modelo.position.z += this.velocidad;
        if (teclas.a) this.modelo.position.x -= this.velocidad;
        if (teclas.d) this.modelo.position.x += this.velocidad;
    }
}