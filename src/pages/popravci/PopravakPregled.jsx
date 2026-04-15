import { useEffect, useState } from "react"
import popravakService from "../../services/popravci/PopravakService"
import { Table, Button } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import PopravakService from "../../services/popravci/PopravakService"

export default function PopravakPregled() {

    const navigate = useNavigate()
    const [popravci, setPopravci] = useState([])


    useEffect(() => {
        ucitajPopravke()
    }, [])

    async function ucitajPopravke() {
        await popravakService.get().then((odgovor) => {

            // u dev modu (na našem računalu) ispisati će dva puta, sve će biti u redu u produkciji
          //  console.table(odgovor.data)

            setPopravci(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if(!confirm('Sigurno obrisati')){
            return
        }
        await PopravakService.obrisi(sifra)
        ucitajPopravke()
    }


    return (
        <>
            <Link to={RouteNames.POPRAVCI_NOVI} 
            className="btn btn-success w-100 mb-3 mt-3">
                Pregled i dodavanje novog popravka
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Datum pokretanja</th>
                        <th>Aktivan</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {popravci && popravci.map((popravak) => (
                        <tr key={popravak.sifra}>
                            <td>{popravak.naziv}</td>
                            <td>{popravak.trajanje}</td>
                            <td>
                                <NumericFormat
                                    value={popravak.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' €'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                />
                            </td>
                            <td>
                                <FormatDatuma datum={popravak.datumPokretanja} />
                            </td>
                            <td>
                                <GrValidate
                                    size={25}
                                    color={popravak.aktivan ? 'green' : 'red'}
                                />
                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/popravci/${popravak.sifra}`)}}>
                                    Promjena
                                </Button>
                                 &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(popravak.sifra)}>
                                Obriši
                            </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}