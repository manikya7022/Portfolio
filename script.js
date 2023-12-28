function changeTab(tabNumber) {
    document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
    });

    const selectedTabContent = document.getElementById(`tabContent${tabNumber}`);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    }

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === tabNumber);
    });
}

function changeTabExp(tabNumber) {
    document.querySelectorAll('.tab-contentExp').forEach((content) => {
        content.classList.remove('active');
    });

    const selectedTabContent = document.getElementById(`tabContentExp${tabNumber}`);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    }

    document.querySelectorAll('.dotExp').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === tabNumber);
    });
}
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
document.addEventListener('DOMContentLoaded', function() {
    changeTab(1);
    changeTabExp(1)
});


const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load('./images/image.png')
const texture1 = textureLoader.load('./images/image4.jpg')
const texture2 = textureLoader.load('./images/image1.png')
const texture3 = textureLoader.load('./images/image3.jpg')
texture.colorSpace = THREE.SRGBColorSpace

const cursor = {
    x: 0,
    y: 0
}

const canvas = document.querySelector('canvas.webgl')

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

const scene = new THREE.Scene();

const objectDistance = 5;
const geoShape1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture })
)
const geoShape2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture1 })
)
const geoShape3 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture2 })
)
const geoShape4 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 1),
    new THREE.MeshBasicMaterial({ map: texture3 })
)

geoShape1.position.y = -objectDistance * 1;
geoShape2.position.y = -objectDistance * 2;
geoShape3.position.y = -objectDistance * 3;
geoShape4.position.y = -objectDistance * 4;

geoShape1.position.x = 2.5
geoShape2.position.x = -2.5
geoShape3.position.x = 2.5
geoShape4.position.x = -2.5
scene.add(geoShape1, geoShape2, geoShape3, geoShape4)

const section1 = [geoShape1, geoShape2, geoShape3, geoShape4]
const pointLight = new THREE.PointLight(0xff9000, 1.5)
scene.add(pointLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    render.setSize(sizes.width, sizes.height)
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
cameraGroup.add(camera)

const render = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

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

    render.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()

window.addEventListener('click', (event) => {
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
                const targetX = geoShape1.position.x === 2.5 ? -3 : 2.5;

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
                        if (targetX === 2.5) {
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
                const targetX = geoShape2.position.x === -2.5 ? 3 : -2.5;

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
                        if (targetX === -2.5) {
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
                const targetX = geoShape3.position.x === 2.5 ? -3 : 2.5;

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
                        if (targetX === 2.5) {
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
                const targetX = geoShape4.position.x === -2.5 ? 3 : -2.5;

                gsap.to(geoShape4.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#VolunteeringId', {
                            duration: 0.00000000000001,
                            opacity: 0,
                            display: 'none',
                        });
                    },
                    onComplete: () => {
                        if (targetX === -2.5) {
                            gsap.to('#Volunteering', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'block',
                            });
                            gsap.to('#VolunteeringId', {
                                duration: 0.00000000000001,
                                opacity: 0,
                                display: 'none',
                            });
                        } else {
                            gsap.to('#VolunteeringId', {
                                duration: 0.5,
                                opacity: 1,
                                display: 'inline-block',
                            });
                            gsap.to('#Volunteering', {
                                duration: 0.5,
                                opacity: 0,
                                display: 'none',
                            });
                        }
                    }
                });
            }
        });
    }

    document.getElementById("tab1").addEventListener("click", function() {
        changeTab(1);
    })
    document.getElementById("tab2").addEventListener("click", function() {
        changeTab(2);
    })
    document.getElementById("tab3").addEventListener("click", function() {
        changeTab(3);
    })


    document.getElementById("tabExp1").addEventListener("click", function() {
        changeTabExp(1);
    })
    document.getElementById("tabExp2").addEventListener("click", function() {
        changeTabExp(2);
    })
    document.getElementById("tabExp3").addEventListener("click", function() {
        changeTabExp(3);
    })

}