import React, { useState } from "react";
import "../styles/UploadHackathon.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

function UploadHackathon() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    hackathonTitle: "",
    hackathonSummary: "",
    hackathonDescription: "",
    hackathonIcon: "",
    hackathonName: "",
    hackathonStartDate: "",
    hackathonEndDate: "",
    hackathonGithubRepo: "",
    hackathonOtherLinks: "",
  });
  const handleUpload = () => {
    let data = localStorage.getItem("hackathonList");
    data = data ? JSON.parse(data) : [];
    data.unshift({
      id: uuidv4(),
      favourite: false,
      uploadDate: moment().format("YYYY-MM-DD"),
      ...formState,
    });
    localStorage.setItem("hackathonList", JSON.stringify(data));

    navigate("/");
  };
  return (
    <div className="upload-hackathon">
      <form className="upload-form">
        <h1>New Hackathon Submission</h1>
        <Form.Group className="mb-3" controlId="hackathonTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title of your submission"
            onChange={(e) => {
              setFormState({ ...formState, [e.target.id]: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="hackathonSummary">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type="text"
            placeholder="A short summary of your submission (this will be visible with your submission)"
            onChange={(e) => {
              setFormState({ ...formState, [e.target.id]: e.target.value });
            }}
          />
        </Form.Group>
        <div className="description">
          <Form.Group className="mb-3" controlId="hackathonDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Write a long description of your project. You can describe your idea and approach here."
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
          </Form.Group>
          <div className="text-muted word-count">
            {formState.hackathonDescription.length} / 3,000 characters
          </div>
        </div>

        <div className="image">
          <h5>Cover Image</h5>
          <p className="text-muted">Minimum resolution: 360px X 360px</p>
          <Form.Group className="mb-3" controlId="hackathonIcon">
            <Form.Control
              type="file"
              placeholder=""
              onChange={(e) => {
                const elementId = e.target.id;
                const file = e.target.files[0];
                if (file) {
                  let fileReader = new FileReader();
                  fileReader.readAsDataURL(file);
                  fileReader.onload = (e) => {
                    console.log(e.target.result);
                    setFormState({
                      ...formState,
                      [elementId]: e.target.result,
                    });
                  };
                }
                console.log(file);
              }}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="hackathonName">
          <Form.Label>Hackathon Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the name of the hackathon"
            onChange={(e) => {
              setFormState({ ...formState, [e.target.id]: e.target.value });
            }}
          />
        </Form.Group>

        <div className="dates">
          <Form.Group className="mb-3" controlId="hackathonStartDate">
            <Form.Label>Hackathon Start Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="hackathonEndDate">
            <Form.Label>Hackathon End Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="hackathonGithubRepo">
          <Form.Label>Github Repository</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your submission’s public GitHub repository link"
            onChange={(e) => {
              setFormState({ ...formState, [e.target.id]: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="hackathonOtherLinks">
          <Form.Label>Other Links</Form.Label>
          <Form.Control
            type="text"
            placeholder="You can upload a video demo or URL of you demo app here."
            onChange={(e) => {
              setFormState({ ...formState, [e.target.id]: e.target.value });
            }}
          />
        </Form.Group>
        <Button variant="success" onClick={handleUpload}>
          Upload Submission
        </Button>
      </form>
    </div>
  );
}

export default UploadHackathon;
