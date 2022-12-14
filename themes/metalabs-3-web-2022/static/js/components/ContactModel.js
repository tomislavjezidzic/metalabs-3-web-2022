import gsap from "gsap";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import is from "is_js";

gsap.registerPlugin(ScrollTrigger);

export default class HeaderModel {
    constructor() {
        this.DOM = {
            wrapper: ".js-contact-model-wrapper",
        };

        this.wrapper = document.querySelector(this.DOM.wrapper);
        this.model = null;

        // config
        this.config = {
            modelOffset: 6,
            modelScale: 1,
        };
    }

    init() {
        if (!this.wrapper) return;

        this.loader = new GLTFLoader();

        // loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(window.dracoPath);
        dracoLoader.setDecoderConfig({
            type: "js",
        });
        this.loader.setDRACOLoader(dracoLoader);

        THREE.Cache.enabled = true;

        this.width = this.wrapper.offsetWidth;
        this.height = this.wrapper.offsetHeight;

        this.initCamera();
        this.initScene();
        this.initLights();
        this.initRenderer();

        document.addEventListener("afterLoader", () => {
            this.animate();
        });

        if (!is.mobile()) {
            this.mouseMove();
        }
        this.initModel();

        // handle resize
        window.addEventListener("resize", () => this.onWindowResize(), false);
    }

    mouseMove() {
        window.addEventListener("mousemove", (ev) => {
            let mouseY = ev.clientY;

            gsap.to(this.yellowLight.position, {
                y: -1 - (mouseY - window.innerHeight) / 400,
            });

            gsap.to(this.blueLight.position, {
                y: -(mouseY - window.innerHeight) / 400,
            });
        });
    }

    /**
     * camera setup
     */
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
        this.camera.position.set(-2, 0.5, 5.5);
        this.camera.lookAt(0.1, 0.4, 0);
    }

    /**
     * scene setup
     */
    initScene() {
        this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
    initLights() {
        const lightWrapper = new THREE.Object3D();

        this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
        this.yellowLight.position.set(-1, 1, 2);

        this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
        this.blueLight.position.set(1, 0, 1);

        lightWrapper.add(this.blueLight);
        lightWrapper.add(this.yellowLight);

        this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.physicallyCorrectLights = true;
        this.wrapper.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
    initModel() {
        if (this.wrapper.dataset?.model === "" || this.wrapper.dataset?.model === null) return;

        this.loader.load(
            this.wrapper.dataset.model,
            (gltf) => {
                gltf.scene.rotation.y = -Math.PI / 2;

                gltf.scene.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);

                this.model = gltf.scene;

                this.scrollModelAnimation(gltf.scene);

                this.scene.add(gltf.scene);
            },
            (xhr) => {
                // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                // console.log("An error happened");
            },
        );
    }

    scrollModelAnimation(model) {
        gsap.fromTo(
            model.rotation,
            {
                y: "+=0.5",
                x: "-=0.1",
            },
            {
                y: "-=1",
                x: "+=0.2",
                ease: "none",
                scrollTrigger: {
                    trigger: this.wrapper,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            },
        );
    }

    /**
     *
     */
    onWindowResize() {
        if (!this.model) return;

        this.model.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);

        this.camera.aspect = this.wrapper.offsetWidth / this.wrapper.offsetHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.wrapper.offsetWidth, this.wrapper.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
    animate() {
        let raf = null;

        const animate = () => {
            this.renderer.render(this.scene, this.camera);
            if (this.renderer != null) {
                raf = requestAnimationFrame(animate);
            }
        };

        ScrollTrigger.create({
            trigger: this.wrapper,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
                raf = requestAnimationFrame(animate);
            },
            onLeave: () => {
                cancelAnimationFrame(raf);
            },
            onEnterBack: () => {
                raf = requestAnimationFrame(animate);
            },
            onLeaveBack: () => {
                cancelAnimationFrame(raf);
            },
        });
    }
}
