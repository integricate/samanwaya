import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './firebase-applet-config.json';
import { createIcons, Trash2 } from 'lucide';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const authSection = document.getElementById('auth-section');
const adminContent = document.getElementById('admin-content');
const loginBtn = document.getElementById('login-btn');
const eventForm = document.getElementById('event-form');
const adminEventsList = document.getElementById('admin-events-list');

onAuthStateChanged(auth, (user) => {
    if (user) {
        authSection?.classList.add('hidden');
        adminContent?.classList.remove('hidden');
        loadAdminEvents();
    } else {
        authSection?.classList.remove('hidden');
        adminContent?.classList.add('hidden');
    }
});

loginBtn?.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        console.error("Login failed:", err);
    }
});

async function loadAdminEvents() {
    if (!adminEventsList) return;
    
    try {
        const q = query(collection(db, 'events'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        
        adminEventsList.innerHTML = '';
        
        if (querySnapshot.empty) {
            adminEventsList.innerHTML = '<p class="text-text-main/40 italic">No events found.</p>';
            return;
        }

        querySnapshot.forEach((documentRef) => {
            const data = documentRef.data();
            const date = data.date?.toDate().toLocaleDateString();
            
            const item = document.createElement('div');
            item.className = "flex justify-between items-center p-4 bg-cream/50 rounded-xl border border-stone-200 group";
            item.innerHTML = `
                <div class="text-left">
                    <h4 class="font-bold text-primary-green">${data.title}</h4>
                    <p class="text-[10px] text-text-main/40 uppercase font-black">${date} • ${data.location}</p>
                </div>
                <button class="delete-btn p-2 text-text-main/20 hover:text-red-500 transition-colors" data-id="${documentRef.id}">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            `;
            adminEventsList.appendChild(item);
        });

        createIcons({ icons: { Trash2 } });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                if (id && confirm('Delete this event?')) {
                    await deleteDoc(doc(db, 'events', id));
                    loadAdminEvents();
                }
            });
        });

    } catch (err) {
        console.error("Error loading events:", err);
    }
}

eventForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const dateInput = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    try {
        await addDoc(collection(db, 'events'), {
            title,
            date: Timestamp.fromDate(new Date(dateInput)),
            location,
            description,
            createdAt: Timestamp.now()
        });
        
        eventForm.reset();
        loadAdminEvents();
    } catch (err) {
        console.error("Error adding event:", err);
    }
});
