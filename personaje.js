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
        
        loader.load(
            ruta, 
            (gltf) => {
                this.modelo = gltf.scene;
                this.modelo.position.set(x, 0, z);
                this.escena.add(this.modelo);
                console.log("¡Modelo cargado con éxito desde:", ruta, "!");
            },
            undefined, 
            (error) => {
                console.error("No se pudo cargar el archivo GLB. Revisa la ruta en la carpeta assets.", error);
            }
        );
    }
}