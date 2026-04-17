import * as THREE from 'three';
import { createIcons, Menu, X, ArrowDown, Globe, Users, Target, Rocket, Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Shield } from 'lucide';
import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navbarLogos = document.querySelectorAll('.navbar-logo');
const navbarLogoNp = document.querySelector('.navbar-logo-np');

createIcons({
  icons: { Menu, X, ArrowDown, Globe, Users, Target, Rocket, Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Shield }
});

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar?.classList.add('bg-cream/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        navbar?.classList.remove('bg-transparent', 'py-6');
        navbarLogos.forEach(logo => logo.classList.add('opacity-100'));
        navbarLogoNp?.classList.add('opacity-70');
    } else {
        navbar?.classList.remove('bg-cream/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        navbar?.classList.add('bg-transparent', 'py-6');
        navbarLogos.forEach(logo => logo.classList.remove('opacity-100'));
        navbarLogoNp?.classList.remove('opacity-70');
    }

    const reveals = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('reveal-visible');
        }
    });
});

let isMenuOpen = false;
menuToggle?.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu?.classList.remove('hidden');
        menuToggle.innerHTML = '<i data-lucide="x"></i>';
    } else {
        mobileMenu?.classList.add('hidden');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    }
    createIcons({ icons: { Menu, X } });
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
        isMenuOpen = false;
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        createIcons({ icons: { Menu } });
    });
});

function initHeroScene() {
    const container = document.getElementById('hero-scene');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFFFFFF, 1.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1B4332, 
        metalness: 0.8, 
        roughness: 0.2,
        wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const particlesCount = 20;
    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
        const pGeom = new THREE.SphereGeometry(0.1, 16, 16);
        const pMat = new THREE.MeshStandardMaterial({ color: 0x40916C });
        const p = new THREE.Mesh(pGeom, pMat);
        p.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        scene.add(p);
        particles.push(p);
    }

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.002;
        
        particles.forEach((p, i) => {
            p.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
        });

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

function initCoordinationScene() {
    const container = document.getElementById('coordination-scene');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    scene.add(ambientLight);

    const group = new THREE.Group();
    scene.add(group);

    const nodes = [
        [0, 1.5, 0], [1.5, 0, 1.5], [-1.5, 0, 1.5], 
        [0, -1.5, 0], [1.5, 0, -1.5], [-1.5, 0, -1.5]
    ];

    nodes.forEach(pos => {
        const geom = new THREE.SphereGeometry(0.15, 32, 32);
        const mat = new THREE.MeshStandardMaterial({ color: 0x40916C, emissive: 0x40916C, emissiveIntensity: 0.5 });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(pos[0], pos[1], pos[2]);
        group.add(mesh);
    });

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function initImpactChart() {
    const container = d3.select("#impact-chart");
    const width = 300, height = 300, radius = Math.min(width, height) / 2;
    
    const data = [
        { name: 'Youth Leaders', value: 45, color: '#1B4332' },
        { name: 'Women Delegates', value: 30, color: '#40916C' },
        { name: 'Policy Experts', value: 25, color: '#52B788' },
    ];

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

    svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => d.data.color)
        .attr("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", function() { d3.select(this).style("opacity", 1); })
        .on("mouseout", function() { d3.select(this).style("opacity", 0.8); });

    const legend = container.append("div").attr("class", "flex flex-wrap justify-center gap-4 mt-8");
    data.forEach(d => {
        const item = legend.append("div").attr("class", "flex items-center gap-2 text-xs font-bold uppercase text-cream/70");
        item.append("div").style("width", "12px").style("height", "12px").style("background-color", d.color).attr("class", "rounded-full");
        item.append("span").text(d.name);
    });
}

async function fetchEvents() {
    const eventsGrid = document.getElementById('events-grid');
    if (!eventsGrid) return;

    try {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'), limit(6));
        const querySnapshot = await getDocs(q);
        
        eventsGrid.innerHTML = '';

        if (querySnapshot.empty) {
            eventsGrid.innerHTML = `
                <div class="col-span-full py-20 text-center">
                    <p class="text-text-main/40 font-serif italic">Stay tuned for upcoming events.</p>
                </div>
            `;
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const dateStr = data.date?.toDate().toLocaleDateString('en-NE', { month: 'short', day: 'numeric', year: 'numeric' });
            
            const card = document.createElement('div');
            card.className = "reveal-fade-up bg-white rounded-[2rem] overflow-hidden border border-accent-green/10 shadow-sm hover:shadow-xl transition-all group";
            card.innerHTML = `
                <div class="h-48 overflow-hidden relative">
                    <img src="https://picsum.photos/seed/${doc.id}/800/600" alt="Samanwaya Event" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute top-4 right-4 bg-primary-green/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-widest">${dateStr || 'Upcoming'}</div>
                </div>
                <div class="p-8">
                    <h4 class="font-serif text-2xl text-primary-green mb-3 text-left">${data.title || 'Special Event'}</h4>
                    <p class="text-text-main/60 text-sm mb-6 line-clamp-2 text-left">${data.description || 'Join Samanwaya for a transformative experience in democratic coordination.'}</p>
                    <div class="flex items-center gap-2 text-accent-green text-xs font-bold uppercase tracking-widest">
                        <i data-lucide="map-pin" class="w-3 h-3"></i> ${data.location || 'Nepal'}
                    </div>
                </div>
            `;
            eventsGrid.appendChild(card);
        });
        
        createIcons({ icons: { MapPin } });

    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();
    initCoordinationScene();
    initImpactChart();
    fetchEvents();
});
