import * as THREE from 'three';
// Importamos la grúa para archivos GLB
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

export class Personaje {
    constructor(escena, rutaModelo, x, z) {
        this.escena = escena;
        this.modelo = null;
        
        // Llamamos a la función de carga
        this.cargarModelo(rutaModelo, x, z);
    }

    cargarModelo(ruta, x, z) {
        const loader = new GLTFLoader();
        
        loader.load(
            ruta, 
            (gltf) => {
                // Si la carga tiene éxito:
                this.modelo = gltf.scene;
                this.modelo.position.set(x, 0, z);
                this.escena.add(this.modelo);
                console.log("¡ÉXITO: Modelo cargado correctamente!");
            },
            (progreso) => {
                // Esto nos dice cuánto falta para cargar
                console.log("Cargando...", (progreso.loaded / progreso.total * 100) + "%");
            },
            (error) => {
                // SI HAY ERROR, esto nos dirá qué pasó
                console.error("ERROR AL CARGAR EL MODELO:", error);
            }
        );
    }
}