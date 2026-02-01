import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Personaje {
    constructor(escena, rutaModelo, x, z) {
        this.escena = escena;
        this.modelo = null;
        this.cargarModelo(rutaModelo, x, z);
    }

    cargarModelo(ruta, x, z) {
        const loader = new GLTFLoader();
        
        loader.load(ruta, (gltf) => {
            this.modelo = gltf.scene;
            
            // --- AJUSTE DE ESCALA ---
            // 0.5 significa 50% del tamaño original. 
            // Si sigue grande, prueba con 0.2 o 0.1
            this.modelo.scale.set(0.5, 0.5, 0.5); 
            
            this.modelo.position.set(x, 0, z);
            this.escena.add(this.modelo);
            console.log("Personaje listo");
        }, undefined, (error) => {
            console.error("Error al cargar el modelo:", error);
        });
    }
}