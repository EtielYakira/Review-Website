import React from 'react'
import {Button,Modal} from 'react-bootstrap'

function Sginout({handleClose,show,handleUser}) {

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>logout warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are going to logout, are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              just a moment!
            </Button>
            <Button variant="primary" onClick={() => {handleClose();handleUser("")}}>
               Yes Log me out
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Sginout
