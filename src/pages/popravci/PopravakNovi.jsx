import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import PopravakService from "../../services/popravci/PopravakService";

export default function PopravakNovi(){

    const navigate = useNavigate()

    async function dodaj(popravak){
        //console.table(popravak) // ovo je za kontrolu da li je sve OK
        await PopravakService.dodaj(popravak).then(()=>{
            navigate(RouteNames.POPRAVCI)
        })
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
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
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" name="trajanje" step={1} />
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} />
            </Form.Group>

            <Form.Group controlId="datumPokretanja">
                <Form.Label>Datum pokretanja popravka</Form.Label>
                <Form.Control type="date" name="datumPokretanja" />
            </Form.Group>

            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan" />
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
                        Dodaj novi popravak
                    </Button>
                </Col>
            </Row>

        </Form>
        </>
    )
}