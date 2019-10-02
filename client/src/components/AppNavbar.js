import React, {Component, Fragment} from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import RegisterModal from "./Auth/RegisterModal";
import LoginModal from "./Auth/LoginModal";
import Logout from "./Auth/Logout";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
class AppNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    toggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render(){
        const {isAuthenticated, user} = this.props.auth;
        const authLinks  = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )
        const guestLink = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto">
                               {isAuthenticated ? authLinks : guestLink}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(AppNavbar);