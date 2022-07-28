import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstname: '',
            lastname: '',
            emailId: '',
            tech:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeTechHandler=this.changeTechHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({firstname: employee.firstname,
                lastname: employee.lastname,
                emailId : employee.emailId,
                tech:employee.tech
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstname: this.state.firstname, lastname: this.state.lastname, emailId: this.state.emailId,tech:this.state.tech};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.eid));
        EmployeeService.updateEmployee(employee).then( res => {
            this.employee=res.data;
            this.props.history.push('/getEmployees');
        });
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstname: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastname: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changeTechHandler= (event) => {
        this.setState({tech:event.target.value})
    }

    cancel(){
        this.props.history.push('/getEmployees');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Id: </label>
                                            <input  name="eid" className="form-control" 
                                                value={this.state.id} />
                                        </div>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstname} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastname} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Tech: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.tech} onChange={this.changeTechHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
