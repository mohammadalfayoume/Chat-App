import { useState } from "react"
import { Form, Button, Col, Row } from "react-bootstrap";
const WaitingRoom = ({sendMessage, sendToUser}) => {
    const[username, setUsername] = useState();
    const[message, setMessage] = useState();
    const[receiverId, setReceiverId] = useState();
    const onSendAllSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(username, message);
       
    }
    const onSendSubmit = async (e) => {
        e.preventDefault();
        await sendToUser(username, message, receiverId);
       
    }
    return(
        <>
        <Form onSubmit={onSendAllSubmit}>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    <Form.Group>
                        <Form.Control placeholder='Username' onChange={e => setUsername(e.target.value)} />
                        <Form.Control placeholder='Message' onChange={e => setMessage(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col sm={12}>
                    <hr/>
                    <Button variant='success' type='submit'>Send Message To All</Button>
                </Col>
            </Row>
        </Form>
        <hr/>
        <Form onSubmit={onSendSubmit}>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    <Form.Group>
                        <Form.Control placeholder='Username' onChange={e => setUsername(e.target.value)} />
                        <Form.Control placeholder='Message' onChange={e => setMessage(e.target.value)} />
                        <Form.Control placeholder='ReceiverId' onChange={e => setReceiverId(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col sm={12}>
                    <hr/>
                    <Button variant='success' type='submit'>Send Message</Button>
                </Col>
            </Row>
        </Form>
        <hr/>
        
        </>
    )
}

export default WaitingRoom;