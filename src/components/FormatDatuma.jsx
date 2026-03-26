// datum je tipa podatka string
export default function FormatDatuma({datum,prikazZadano='-'}){
    if(!datum){
        return prikazZadano
    }
    const d = new Date(datum) // d je objekt tipa Date
    if(isNaN(d.getTime())){
        return prikazZadano
    }
    return Intl.DateTimeFormat('hr-HR',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(d) + (datum.includes('T') ? '' : '.')
}