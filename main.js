import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js'

import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js'

import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()

scene.background = new THREE.Color(0x02030a)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(0, 0, 15)

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(
    window.innerWidth,
    window.innerHeight
)

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
)

renderer.outputColorSpace =
THREE.SRGBColorSpace

const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    2
)

scene.add(ambientLight)

const directionalLight =
new THREE.DirectionalLight(
    0x38bdf8,
    6
)

directionalLight.position.set(
    5,
    5,
    5
)

scene.add(directionalLight)

const blueLight =
new THREE.PointLight(
    0x00ffff,
    30,
    100
)

blueLight.position.set(
    -5,
    3,
    5
)

scene.add(blueLight)

const glowLight =
new THREE.PointLight(
    0x00ffff,
    40,
    50
)

glowLight.position.set(
    0,
    0,
    3
)

scene.add(glowLight)

const cursorLight =
new THREE.PointLight(
    0x00ffff,
    25,
    40
)

scene.add(cursorLight)

const particlesGeometry =
new THREE.BufferGeometry()

const particlesCount = 5000

const positions =
new Float32Array(
    particlesCount * 3
)

for(let i = 0; i < particlesCount * 3; i++){

    positions[i] =
    (Math.random() - 0.5) * 80
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
        positions,
        3
    )
)

const particlesMaterial =
new THREE.PointsMaterial({

    color: 0x8ddfff,

    size: 0.03,

    transparent: true,

    opacity: 0.8
})

const particles =
new THREE.Points(
    particlesGeometry,
    particlesMaterial
)

scene.add(particles)

const knotGeometry =
new THREE.TorusKnotGeometry(
    2,
    0.6,
    300,
    32
)

const knotMaterial =
new THREE.MeshPhysicalMaterial({

    color:0x00ffff,

    metalness:1,

    roughness:0,

    transmission:0.3,

    transparent:true,

    opacity:0.9
})

const knot =
new THREE.Mesh(
    knotGeometry,
    knotMaterial
)

scene.add(knot)

const wireGeometry =
new THREE.TorusKnotGeometry(
    2.05,
    0.62,
    300,
    32
)

const wireMaterial =
new THREE.MeshBasicMaterial({

    color:0xffffff,

    wireframe:true,

    transparent:true,

    opacity:0.2
})

const wireKnot =
new THREE.Mesh(
    wireGeometry,
    wireMaterial
)

scene.add(wireKnot)

const mouse =
new THREE.Vector2()

window.addEventListener(
    'mousemove',
    (event)=>{

        mouse.x =
        (event.clientX /
        window.innerWidth) * 2 - 1

        mouse.y =
        -(event.clientY /
        window.innerHeight) * 2 + 1
    }
)

gsap.from(
    '.hero .content',
    {
        opacity:0,
        y:100,
        duration:1.5,
        ease:'power3.out'
    }
)

gsap.utils
.toArray('.section')
.forEach((section)=>{

    const content =
    section.querySelector('.content')

    if(content){

        gsap.from(
            content,
            {
                opacity:0,
                y:80,
                duration:1,
                scrollTrigger:{
                    trigger:section,
                    start:'top 75%',
                    end:'bottom 30%',
                    toggleActions:
                    'play none none reverse'
                }
            }
        )
    }
})

gsap.to(
    camera.position,
    {
        z:8,
        y:2,
        scrollTrigger:{
            trigger:'.about',
            start:'top center',
            end:'bottom center',
            scrub:true
        }
    }
)

gsap.to(
    knot.rotation,
    {
        y:Math.PI * 2,
        scrollTrigger:{
            trigger:'.services',
            start:'top center',
            end:'bottom center',
            scrub:true
        }
    }
)

gsap.to(
    directionalLight.position,
    {
        x:-5,
        y:8,
        z:3,
        scrollTrigger:{
            trigger:'.portfolio',
            start:'top center',
            end:'bottom center',
            scrub:true
        }
    }
)

const counters =
document.querySelectorAll('.counter')

counters.forEach(counter=>{

    const target =
    +counter.dataset.target

    let current = 0

    const updateCounter = ()=>{

        current += target / 100

        if(current < target){

            counter.innerText =
            Math.floor(current)

            requestAnimationFrame(
                updateCounter
            )

        }else{

            counter.innerText =
            target
        }
    }

    ScrollTrigger.create({

        trigger:'.stats',

        start:'top 70%',

        once:true,

        onEnter:updateCounter
    })
})

const button =
document.querySelector('button')

if(button){

    button.addEventListener(
        'click',
        ()=>{

            gsap.to(
                window,
                {
                    duration:1.5,
                    scrollTo:'#about'
                }
            )
        }
    )
}

window.addEventListener(
    'resize',
    ()=>{

        camera.aspect =
        window.innerWidth /
        window.innerHeight

        camera.updateProjectionMatrix()

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        )
    }
)

const clock =
new THREE.Clock()

const animate = ()=>{

    requestAnimationFrame(
        animate
    )

    const elapsedTime =
    clock.getElapsedTime()

    knot.rotation.y += 0.004

    knot.rotation.x += 0.002

    knot.position.y =
    Math.sin(
        elapsedTime
    ) * 0.3

    wireKnot.rotation.y -= 0.002

    wireKnot.rotation.x += 0.001

    particles.rotation.y +=
    0.0005

    glowLight.position.x =
    Math.sin(elapsedTime) * 4

    glowLight.position.y =
    Math.cos(elapsedTime) * 2

    cursorLight.position.x =
    mouse.x * 10

    cursorLight.position.y =
    mouse.y * 5

    camera.position.x =
    mouse.x * 1.5

    camera.position.y +=
    (
        mouse.y * 0.8
        - camera.position.y
    ) * 0.03

    camera.lookAt(
        0,
        0,
        0
    )

    renderer.render(
        scene,
        camera
    )
}

animate()