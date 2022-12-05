class shootingBall {
    constructor() {
        const geometry = new SphereGeometry(1, 32, 32);
        const material = new MeshStandardMaterial({ color: `${'#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}` });

        this.mesh = new Mesh(geometry, material);
        this.mesh.position.x = Math.random() * 40 - 20;
        this.mesh.position.y = Math.random() * 40 - 20;
        this.mesh.position.z = -50;

        if (this.mesh.position.x < 5 &&
            this.mesh.position.x > -5 &&
            this.mesh.position.y < 5 &&
            this.mesh.position.y > -5) {

        }
        else {
            scene.add(this.mesh);
        }

    }
}

const canvas = document.querySelector('#background-canvas');
const scene = new Scene();
scene.background = new Color("white");
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const light = new AmbientLight(0x404040, 0.01); // soft white light
scene.add(light);
const lightA = new PointLight("white", 2, 50);
lightA.position.set(5, 5, 5);
scene.add(lightA);

const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;


const shootingBallArray = [];

const animateBackground = function () {
    requestAnimationFrame(animateBackground);

    shootingBallArray.push(new shootingBall());

    for (let i = 0; i < shootingBallArray.length; i++) {
        shootingBallArray[i].mesh.position.z += 0.2;

        if (shootingBallArray[i].mesh.position.z > 20) {
            scene.remove(shootingBallArray[i].mesh);
            shootingBallArray.splice(i, 1);
        }
    }

    renderer.render(scene, camera);
}

animateBackground();

