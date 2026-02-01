import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Esta es la "clase" o molde para crear a nuestros héroes
export class Personaje {
    constructor(escena, archivoGLB, x, z) {
        this.escena = escena;      // Guardamos la escena para saber dónde meter al personaje
        this.modelo = null;         // Aquí guardaremos el cuerpo 3D cuando cargue
        this.mixer = null;          // Este será el "reproductor" de animaciones
        
        // Llamamos a una función interna para cargar el archivo
        this.cargarModelo(archivoGLB, x, z);
    }

    cargarModelo(archivoGLB, x, z) {
        const loader = new GLTFLoader();
        
        // Aquí es donde ocurre la magia de cargar el archivo de Blender
        loader.load(archivoGLB, (gltf) => {
            this.modelo = gltf.scene;
            this.modelo.position.set(x, 0, z); // Lo ponemos en su sitio
            
            this.escena.add(this.modelo);      // ¡Lo metemos en el mundo!
            console.log("¡Modelo cargado con éxito!");
        });
    }
}