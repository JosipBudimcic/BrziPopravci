import { popravci } from "./PopravakPodaci";

// 1/4 Read od CRUD
async function get() {
    return {data: [...popravci]} // [...popravci] je kopija popravakova
}

async function getBySifra(sifra) {
   return {data: popravci.find(s => s.sifra === parseInt(sifra))} 
}

// 2/4 Create od CRUD
async function dodaj(popravak){
    if(popravci.length>0){
        popravak.sifra = popravci[popravci.length - 1].sifra + 1
    }else{
        popravak.sifra = 1
    }
    
    popravci.push(popravak);
}

// 3/4 Update od CRUD
async function promjeni(sifra,popravak) {
    const index = nadiIndex(sifra)
    popravci[index] = {...popravci[index], ...popravak}
}

function nadiIndex(sifra){
    return popravci.findIndex(s => s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        popravci.splice(index, 1);
    }
    return;
}



export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}