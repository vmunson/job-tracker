import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import '../../App.css'

export default class JobInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            title: '',
            company: '',
            status: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch("localhost:3000/api/jobinfo", {
            method: 'POST',
            body: JSON.stringify({ jobinput: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(() => {
                document.getElementById("jobInput").reset()
            })
    }
    render() {

        return (
            <div>
                <h1>Enter Job Information</h1>
                <Form id='jobInput' onSubmit={this.handleSubmit}>
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
                        <Button id='jobInputButton' type="submit" color="success">Save</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}