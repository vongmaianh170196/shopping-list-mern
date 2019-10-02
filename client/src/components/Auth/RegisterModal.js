import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../../actions/authAction"
import {clearErr} from '../../actions/errorAction';
import { timingSafeEqual } from 'crypto';
class RegisterModal extends Component{
    state ={
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErr: PropTypes.func.isRequired
    }
    componentDidUpdate(prev) {
        const {error, isAuthenticated} = this.props;
        if(error !== prev.error){
            if(error.id == "REGISTER_FAIL"){
                this.setState({msg: error.msg.msg})
            }else{
                this.setState({msg: null})
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }
    toggle = () => {
        this.props.clearErr();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password} = this.state;
        const newUser = {
            name, 
            email,
            password
        }
        this.props.register(newUser);
        //this.toggle();
    }
    render(){
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Regidter</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                className="mb-3"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={this.onChange}
                                ></Input>
                                <Label for="email">Email</Label>
                                <Input
                                className="mb-3"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={this.onChange}
                                ></Input>
                                <Label for="name">Password</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                className="mb-3"
                                ></Input>
                            <Button
                                color="dark"
                            >
                            Register
                            </Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {register, clearErr})(RegisterModal);