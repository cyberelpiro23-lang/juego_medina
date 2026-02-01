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
            // Guardamos el modelo en una constante para manipularlo más fácil
            const objetoRaiz = gltf.scene;
            
            this.modelo = objetoRaiz;
            this.modelo.scale.set(0.5, 0.5, 0.5); 
            this.modelo.position.set(x, 0, z);

            // --- AQUÍ ESTÁ EL TRUCO PARA EL GIRO ---
            // Usamos Math.PI para girar. 
            // Math.PI / 2 es igual a 90 grados.
            // Si ves que se gira para el lado contrario, prueba con: -Math.PI / 2
            // O si necesita media vuelta completa, usa solo: Math.PI
            this.modelo.rotation.y = Math.PI*2; // Prueba primero con esto (180 grados)

            this.escena.add(this.modelo);
        });
    }

    // Esta función la llamaremos 60 veces por segundo
  mover(teclas) {
        if (!this.modelo) return;

        // Creamos un vector para calcular la dirección del movimiento
        const direccion = new THREE.Vector3(0, 0, 0);

        if (teclas.w) direccion.z -= 1;
        if (teclas.s) direccion.z += 1;
        if (teclas.a) direccion.x -= 1;
        if (teclas.d) direccion.x += 1;

        // Solo si estamos presionando alguna tecla (la dirección no es cero)
        if (direccion.length() > 0) {
            // 1. Normalizamos la dirección (para que no camine más rápido en diagonal)
            direccion.normalize();

            // 2. Aplicamos el movimiento
            this.modelo.position.addScaledVector(direccion, this.velocidad);

            // 3. HACEMOS QUE MIRE HACIA DONDE SE MUEVE
            // Calculamos un punto frente al personaje basado en la dirección
            const puntoParaMirar = new THREE.Vector3();
            puntoParaMirar.addVectors(this.modelo.position, direccion);
            this.modelo.lookAt(puntoParaMirar);
        }
    }
}