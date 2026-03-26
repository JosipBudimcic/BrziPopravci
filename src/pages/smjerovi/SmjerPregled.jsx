import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Table, Button } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function SmjerPregled() {

    const navigate = useNavigate()
    const [smjerovi, setSmjerovi] = useState([])


    useEffect(() => {
        ucitajSmjerove()
    }, [])

    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {

            // u dev modu (na našem računalu) ispisati će dva puta, sve će biti u redu u produkciji
          //  console.table(odgovor.data)

            setSmjerovi(odgovor.data)
        })
    }


    return (
        <>
            <Link to={RouteNames.SMJEROVI_NOVI} 
            className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog smjera
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
                    {smjerovi && smjerovi.map((smjer) => (
                        <tr key={smjer.sifra}>
                            <td>{smjer.naziv}</td>
                            <td>{smjer.trajanje}</td>
                            <td>
                                <NumericFormat
                                    value={smjer.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' €'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                />
                            </td>
                            <td>
                                <FormatDatuma datum={smjer.datumPokretanja} />
                            </td>
                            <td>
                                <GrValidate
                                    size={25}
                                    color={smjer.aktivan ? 'green' : 'red'}
                                />
                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/smjerovi/${smjer.sifra}`)}}>
                                    Promjena
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}