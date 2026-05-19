import { popravci as defaultPopravci } from "./PopravakPodaci";

const STORAGE_KEY = 'brziPopravciData';

// Pomoćne funkcije za rad s localStorage
function getPopravci() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [...defaultPopravci];
}

function savePopravci(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 1/4 Read od CRUD
async function get() {
    return { data: getPopravci() } 
}

async function getBySifra(sifra) {
    const popravci = getPopravci();
    return { data: popravci.find(s => s.sifra === parseInt(sifra)) } 
}

// 2/4 Create od CRUD
async function dodaj(popravak) {
    const popravci = getPopravci();
    if (popravci.length > 0) {
        // Tražimo maksimalnu šifru kako bismo izbjegli duplikate kod dodavanja
        const maxSifra = Math.max(...popravci.map(p => p.sifra));
        popravak.sifra = maxSifra + 1;
    } else {
        popravak.sifra = 1;
    }
    
    popravci.push(popravak);
    savePopravci(popravci);
}

// 3/4 Update od CRUD
async function promjeni(sifra, popravak) {
    const popravci = getPopravci();
    const index = popravci.findIndex(s => s.sifra === parseInt(sifra));
    if (index !== -1) {
        popravci[index] = { ...popravci[index], ...popravak };
        savePopravci(popravci);
    }
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    let popravci = getPopravci();
    popravci = popravci.filter(s => s.sifra !== parseInt(sifra));
    savePopravci(popravci);
    return;
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}