import * as THREE from './node_modules/three'
import './Portfolio/styles.css'
import gsap from 'gsap'

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoad = () => {
    console.log('loading finished')
}
loadingManager.onProgress = () => {
    console.log('loading progressing')
}
loadingManager.onError = () => {
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load('/image.png')
const texture1 = textureLoader.load('/image4.jpg')
const texture2 = textureLoader.load('/image1.png')
const texture3 = textureLoader.load('/image3.jpg')
texture.colorSpace = THREE.SRGBColorSpace

const cursor = {
    x: 0,
    y: 0
}

const canvas = document.querySelector('canvas.webgl')


//mouse movement
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector3((event.clientX / sizes.width) * 2 - 1, -(event.clientY / sizes.height) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([geoShape1]);
    const intersects1 = raycaster.intersectObjects([geoShape2]);
    const intersects2 = raycaster.intersectObjects([geoShape3]);
    const intersects3 = raycaster.intersectObjects([geoShape4]);

    // Update cursor style based on the intersection
    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
    } else if (intersects1.length > 0) {
        document.body.style.cursor = 'pointer';
    } else if (intersects2.length > 0) {
        document.body.style.cursor = 'pointer';
    } else if (intersects3.length > 0) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'auto';
    }
})


// window.addEventListener('mouseup', () => {
//     console.log('its up')
// })


const scene = new THREE.Scene();

//object
const objectDistance = 5;
const geoShape1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 1),
    new THREE.MeshBasicMaterial({ map: texture })
)
const geoShape2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 1),
    new THREE.MeshBasicMaterial({ map: texture1 })
)
const geoShape3 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 1),
    new THREE.MeshBasicMaterial({ map: texture2 })
)
const geoShape4 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 1),
    new THREE.MeshBasicMaterial({ map: texture3 })
)

geoShape1.position.y = -objectDistance * 0;
geoShape2.position.y = -objectDistance * 1;
geoShape3.position.y = -objectDistance * 2;
geoShape4.position.y = -objectDistance * 3;

geoShape1.position.x = 2
geoShape2.position.x = -2
geoShape3.position.x = 2
geoShape4.position.x = -2
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    //const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) for red color box

// material.opacity = 0.5
// const mesh = new THREE.Mesh(geoShape, material);
scene.add(geoShape1, geoShape2, geoShape3, geoShape4)

const section1 = [geoShape1, geoShape2, geoShape3, geoShape4]
const pointLight = new THREE.PointLight(0xff9000, 1.5)
scene.add(pointLight)

//camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    render.setSize(sizes.width, sizes.height)
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// double click fullscreen and vice versa
window.addEventListener('dblclick', () => {
    gsap.to('#EducationId', {
        duration: 0.00000000000001,
        opacity: 0,
        display: 'none',
    });
})

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
cameraGroup.add(camera)
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true;

//render
const render = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    // render.setClearAlpha(1)
render.setSize(sizes.width, sizes.height)
render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const clock = new THREE.Clock()
let previousTime = 0

let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
})

const tick = () => {
    const escapeTime = clock.getElapsedTime()
    const deltaTime = escapeTime - previousTime
    previousTime = escapeTime
    camera.position.y = -scrollY / sizes.height * objectDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = -cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    for (const mesh of section1) {
        mesh.rotation.y = escapeTime * 0.05;
    }

    // geoShape1.rotation.y = cursor.y * 3;
    // geoShape1.rotation.x = cursor.x * 3;
    // geoShape1.lookAt(new THREE.Vector3())

    //use this for portfolio
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.y * 3
    // camera.lookAt(new THREE.Vector3())


    // mesh.position.y = escapeTime

    // controls.update()

    render.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()

window.addEventListener('mousedown', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector3((event.clientX / sizes.width) * 2 - 1, -(event.clientY / sizes.height) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([geoShape1]);
    const intersects1 = raycaster.intersectObjects([geoShape2]);
    const intersects2 = raycaster.intersectObjects([geoShape3]);
    const intersects3 = raycaster.intersectObjects([geoShape4]);

    if (intersects.length > 0) {
        onGeoShape1Click('1');
    } else if (intersects1.length > 0) {
        onGeoShape1Click('2');
    } else if (intersects2.length > 0) {
        onGeoShape1Click('3');
    } else if (intersects3.length > 0) {
        onGeoShape1Click('4');
    }
});


function onGeoShape1Click(event) {
    if (event == '1') {
        gsap.to('#Education', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape1.position.x === 2 ? -2.5 : 2;

                gsap.to(geoShape1.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#EducationId', {
                            duration: 0.00000000000001,
                            opacity: 0,
                            display: 'none',
                        });
                    },
                    onComplete: () => {
                        if (targetX === 2) {
                            gsap.to('#Education', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'block',
                            });
                            gsap.to('#EducationId', {
                                duration: 0.00000000000001,
                                opacity: 0,
                                display: 'none',
                            });
                        } else {
                            gsap.to('#EducationId', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'inline-block',
                            });
                            gsap.to('#Education', {
                                duration: 0.5,
                                opacity: 0,
                                display: 'none',
                            });
                        }
                    }
                });
            }
        });

    } else if (event == '2') {
        gsap.to('#Experience', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape2.position.x === -2 ? 2.5 : -2;

                gsap.to(geoShape2.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#ExperienceId', {
                            duration: 0.00000000000001,
                            opacity: 0,
                            display: 'none',
                        });
                    },
                    onComplete: () => {
                        if (targetX === -2) {
                            gsap.to('#Experience', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'block',
                            });
                            gsap.to('#ExperienceId', {
                                duration: 0.00000000000001,
                                opacity: 0,
                                display: 'none',
                            });
                        } else {
                            gsap.to('#ExperienceId', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'inline-block',
                            });
                            gsap.to('#Experience', {
                                duration: 0.5,
                                opacity: 0,
                                display: 'none',
                            });
                        }
                    }
                });
            }
        });
    } else if (event == '3') {
        gsap.to('#Publications', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape3.position.x === 2 ? -2.5 : 2;

                gsap.to(geoShape3.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#PublicationsId', {
                            duration: 0.00000000000001,
                            opacity: 0,
                            display: 'none',
                        });
                    },
                    onComplete: () => {
                        if (targetX === 2) {
                            gsap.to('#Publications', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'block',
                            });
                            gsap.to('#PublicationsId', {
                                duration: 0.00000000000001,
                                opacity: 0,
                                display: 'none',
                            });
                        } else {
                            gsap.to('#PublicationsId', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'inline-block',
                            });
                            gsap.to('#Publications', {
                                duration: 0.5,
                                opacity: 0,
                                display: 'none',
                            });
                        }
                    }
                });
            }
        });
    } else if (event == '4') {
        gsap.to('#Volunteering', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape4.position.x === -2 ? 2.5 : -2;

                gsap.to(geoShape4.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        if (targetX === -2) {
                            gsap.to('#Volunteering', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'block',
                            });
                        }
                    }
                });
            }
        });
    }
    document.getElementById("tab1").addEventListener("load", function() {
        changeTab(1);
    });

    document.getElementById("tab1").addEventListener("click", function() {
        changeTab(1);
    })
    document.getElementById("tab2").addEventListener("click", function() {
        changeTab(2);
    })
    document.getElementById("tab3").addEventListener("click", function() {
        changeTab(3);
    })

    function changeTab(tabNumber) {
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach((content) => {
            content.classList.remove('active');
        });

        // Show the selected tab content
        const selectedTabContent = document.getElementById(`tabContent${tabNumber}`);
        if (selectedTabContent) {
            selectedTabContent.classList.add('active');
        }

        // Update dot highlights
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === tabNumber);
        });
    }

}