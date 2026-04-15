import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import PopravakService from "../../services/popravci/PopravakService";
import { useEffect, useState } from "react";

export default function PopravakPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [popravak,setPopravak] = useState({})
    const [aktivan,setAktivan] = useState(false)

    async function ucitajPopravak() {
        await PopravakService.getBySifra(params.sifra).then((odgovor)=>{
            
            const s = odgovor.data
            // po potrebi prilagođavam podatke
            
            s.datumPokretanja = s.datumPokretanja.substring(0,10)
            
            setPopravak(s)

            setAktivan(s.aktivan)
        })
    }

    useEffect(()=>{
        ucitajPopravak()
    },[])

    async function promjeni(popravak){
        //console.table(popravak) // ovo je za kontrolu da li je sve OK
        await PopravakService.promjeni(params.sifra,popravak).then(()=>{
            navigate(RouteNames.POPRAVCI)
        })
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    return(
        <>
        <h3>
            Unos novog popravaka
        </h3>
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required 
                defaultValue={popravak.naziv} />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" name="trajanje" step={1} 
                defaultValue={popravak.trajanje}/>
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} 
                defaultValue={popravak.cijena}/>
            </Form.Group>

            <Form.Group controlId="datumPokretanja">
                <Form.Label>Datum pokretanja popravaka</Form.Label>
                <Form.Control type="date" name="datumPokretanja" 
                defaultValue={popravak.datumPokretanja}/>
            </Form.Group>

            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan" 
                checked={aktivan}
                onChange={(e)=>{setAktivan(e.target.checked)}}
                />
            </Form.Group>

            <hr style={{marginTop: '50px', border: '0'}} />

            <Row>
                <Col>
                    <Link to={RouteNames.POPRAVCI} className="btn btn-danger">
                    Odustani
                    </Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success">
                       Promjeni popravak
                    </Button>
                </Col>
            </Row>

        </Form>
        </>
    )
}