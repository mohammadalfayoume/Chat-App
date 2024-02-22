import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [conn, setConnection] = useState();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/chat")
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceiveMessage", (username, msg, connId) => {
      const li = document.createElement('li');
      li.textContent = connId + ": " + username + " says " + msg;
      document.getElementById('messagesList').appendChild(li);
      console.log(`Message: ${msg}, from ${username}`);
    });

    connection.start()
      .then(() => {
        connection.invoke("GetConnectionId").then(function (id) {
          console.log(id);
          document.getElementById("connectionId").innerText = id;
        });
      })
      .catch(error => console.error('Error establishing connection:', error));

    setConnection(connection);

    return () => {
      connection.stop();
    };
  }, []);

  const sendMessage = async (username, message) => {
    try {
      await conn.invoke("SendMessage", username, message);
    } catch (e) {
      console.error(e);
    }
  };

  const sendToUser = async (username, message, receiverId) => {
    try {
      await conn.invoke("SendToUser", username, receiverId, message)
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <div>
      <main>
        <div className='row'>
          <div className='col-3'>Connection Id</div>
          <div className='col-'><span id='connectionId'></span></div>
        </div>
        <Container>
          <Row className="px-5 my-5">
            <Col sm='12'>
              <h1 className='font-weight-light'>Welcome to the F1 ChatApp</h1>
            </Col>
          </Row>
          <WaitingRoom sendMessage={sendMessage} sendToUser={sendToUser}></WaitingRoom>
        </Container>
        <div className="row">
            <div className="col-6">
                <ul id='messagesList'></ul>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
