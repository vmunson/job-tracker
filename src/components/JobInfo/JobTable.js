import React from 'react'
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap'

import '../../App.css'

export default class JobInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            title: '',
            company: '',
            status: '',
            editJobInfo: false,
            id: 0,
            jobInfo: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.fetchJobInfo = this.fetchJobInfo.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.updateJIArray = this.updateJIArray.bind(this)
        this.toggle = this.toggle.bind(this)
        this.jobInfoView = this.jobInfoView.bind(this)
    }
    componentDidMount() {
        this.fetchJobInfo()
    }
    fetchJobInfo() {
        fetch("http://localhost:3000/api/jobinfo", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((jobData) => {
                return this.setState({ jobInfo: jobData })
            })
    }
    updateJIArray() {
        this.fetchJobInfo()
    }
    handleDelete(event) {
        fetch("http://localhost:3000/api/jobinfo", {
            method: 'DELETE',
            body: JSON.stringify({ jobinfo: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => this.updateJIArray())
    }
    handleUpdate(e) {
        e.preventDefault()
        fetch("http://localhost:3000/api/jobinfo", {
            method: 'PUT',
            body: JSON.stringify({ jobinfo: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.setState({ editJobInfo: false }))
            .then(() => this.updateJIArray())
    }
    handleChange(e) {
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    toggle(id) {
        console.log(id)
        this.setState({
            editJobInfo: true,
            id: id
        });
    }
    jobInfoView() {
        if (!this.state.editJobInfo) {
            return (
                <div>
                    <h3>Job Information</h3>
                    <hr />
                    <Table className="no-border">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.jobInfo.map((jobInfo, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{jobInfo.date}</td>
                                            <td>{jobInfo.title}</td>
                                            <td>{jobInfo.company}</td>
                                            <td>{jobInfo.status}</td>
                                            <td><Button  size="sm" onClick={e => this.toggle(jobInfo.id)} color="primary">Update</Button></td>
                                            <td><Button id={jobInfo.id} size="sm" onClick={this.handleDelete} color="danger">Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Update Information</h1>
                    <Form onSubmit={this.handleUpdate}>
                        <FormGroup>
                        <Label>Date Applied: </Label>
                        <Input className='form-control' type='date' name='date' onChange={this.handleChange}/>
                        <Label>Job Title: </Label>
                        <Input className='form-control' type='text' name='title' placeholder='Job Title' onChange={this.handleChange}/>
                        <Label>Company Name: </Label>
                        <Input className='form-control' type='text' name='company' placeholder='Company Name' onChange={this.handleChange}/>
                        <Label>Job Status: </Label>
                        <Input className="form-control" type="select" name="status" onChange={this.handleChange}>
                            <option></option>
                            <option>Applied and waiting to hear</option>
                            <option>Received intial phone interview</option>
                            <option>Got tech interview</option>
                            <option>Got an in person interview</option>
                            <option>Got the job</option>
                            <option>Didn't get the job</option>
                            <option>Waiting to hear back</option>
                        </Input>
                        <Button color="danger" onClick={()=>this.setState({editJobInfo:false})}>Cancel</Button>
                        <Button id='jobInputButton' type="submit" color="success">Save</Button>
                        </FormGroup>
                    </Form>
                </div>
            )
        }

    }
    render() {
        return (
            <div>
                {this.jobInfoView()}
            </div>
        )
    }
}