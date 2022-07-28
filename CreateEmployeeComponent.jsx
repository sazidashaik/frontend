import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            eid: this.props.match.params.id,
            firstname: '',
            lastname: '',
            emailId: '',
            tech:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeTechHandler=this.changeTechHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.eid).then( (res) =>{
                let employee = res.data;
                this.setState({firstname: employee.firstname,
                    lastname: employee.lastname,
                    emailId : employee.emailId,
                    tech:employee.tech
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstname: this.state.firstname, lastname: this.state.lastname, emailId: this.state.emailId,tech:this.state.tech};
        let employee1 = {eid:this.state.eid,firstname: this.state.firstname, lastname: this.state.lastname, emailId: this.state.emailId,tech:this.state.tech};
        console.log('employee => ' + JSON.stringify(employee1));

        // step 5
        if(this.state.eid === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/getEmployees');
            });
        }else{
            EmployeeService.updateEmployee(employee1).then( res => {
                this.props.history.push('/getEmployees');
            });
        }
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
        this.setState({tech: event.target.value});
    }

    cancel(){
        this.props.history.push('/getEmployees');
    }

    getTitle(){
        if(this.state.eid === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Id: </label>
                                            <input placeholder="Id" name="eid" className="form-control" 
                                                value={this.state.eid} />
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
                                            <input placeholder="Tech" name="tech" className="form-control" 
                                                value={this.state.tech} onChange={this.changeTechHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
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

export default CreateEmployeeComponent
