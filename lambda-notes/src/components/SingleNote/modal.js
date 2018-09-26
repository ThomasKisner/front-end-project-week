import React from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";
import {Link} from 'react-router-dom';



const EditDeleteButton = styled.h4`
padding-top: 15px
text-decoration-line: underline;
display: inline;
margin: 0 7%;
&:hover {
  cursor: pointer;
}
`;

const ModalDiv = styled.div`
  display: inline;
`;

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    console.log("Modal CDM");
    const noteID = this.props.id;
    this.setState({ id: noteID }, () => console.log("state: " + this.props.id));
  }

  delete = () => {
    axios
      .delete(`https://killer-notes.herokuapp.com/note/delete/${this.props.id}`)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
      this.backHome();
  };

  backHome = () => {
    console.log('I want to go home x3');  
    () => this.props.history.push("/");
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    
  }

  render() {
    return (
      <ModalDiv>
        <EditDeleteButton onClick={this.toggle}>delete</EditDeleteButton>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <div className=" text-center">
            <ModalBody>Are you sure you want to delete this?</ModalBody>
            <ModalFooter>
              {/* <Link to='/'> */}
              <Button
                color="danger"
                size="lg"
                className="ml-auto  "
                onClick={this.delete}
                href="/"
              >
              
                Delete
              </Button>
              {/* </Link> */}
              <Button
                color="info"
                size="lg"
                className="mr-auto "
                onClick={this.toggle}
              >
                No
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </ModalDiv>
    );
  }
}

export default ModalExample;
