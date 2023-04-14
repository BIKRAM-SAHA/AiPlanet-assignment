import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../styles/EditHackathon.css";
import hackathonValidationSchema from "../validations/hackathonFormValidation";

const defaultState = {
  id: 0,
  favourite: false,
  uploadDate: Date.now(),
  hackathonTitle: "",
  hackathonSummary: "",
  hackathonDescription: "",
  hackathonIcon: "",
  hackathonName: "",
  hackathonStartDate: "",
  hackathonEndDate: "",
  hackathonGithubRepo: "",
  hackathonOtherLinks: "",
};

function EditHackathon() {
  const { hackathonid } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("hackathonList"));
    if (item === null) {
      console.error("hackathon list not found");
      navigate("/");
    } else {
      item = item.filter((item) => item.id === hackathonid);
      let hackathon;
      hackathon = item[0];
      if (hackathon === undefined) {
        console.error("hackathon not found");
        navigate("/");
        return;
      }

      setFormState({ ...hackathon });
    }
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async () => {
    let item = JSON.parse(localStorage.getItem("hackathonList"));
    try {
      await hackathonValidationSchema.validate(formState, {
        abortEarly: false,
      });
      item = item.map((item) =>
        item.id === hackathonid ? { ...formState } : item
      );
      localStorage.setItem("hackathonList", JSON.stringify([...item]));

      navigate(`/hackathons/${hackathonid}`);
    } catch (err) {
      let parseErrors = defaultState;
      for (let i = 0; i < err.inner.length; i++) {
        const validationError = err.inner[i];
        parseErrors = {
          ...parseErrors,
          [validationError.path]: validationError.errors[0],
        };
      }
      setErrors({
        ...errors,
        ...parseErrors,
      });
    }
  };

  return (
    <div className="edit-hackathon">
      <div className="edit-hackathon-container">
        <form className="upload-form">
          <h1>Edit Hackathon Submission</h1>
          <Form.Group className="mb-3" controlId="hackathonTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title of your submission"
              value={formState.hackathonTitle}
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
            <div className="err">{errors.hackathonTitle}</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="hackathonSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type="text"
              placeholder="A short summary of your submission (this will be visible with your submission)"
              value={formState.hackathonSummary}
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
            <div className="err">{errors.hackathonSummary}</div>
          </Form.Group>
          <div className="description">
            <Form.Group className="mb-3" controlId="hackathonDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write a long description of your project. You can describe your idea and approach here."
                value={formState.hackathonDescription}
                onChange={(e) => {
                  setFormState({ ...formState, [e.target.id]: e.target.value });
                }}
              />
              <div className="err">{errors.hackathonDescription}</div>
            </Form.Group>
            <div className="text-muted word-count">
              {formState.hackathonDescription.length}/ 3,000 characters
            </div>
          </div>

          <div className="image">
            <h5>Cover Image</h5>
            <p className="text-muted">Minimum resolution: 360px X 360px</p>
            <Form.Group className="mb-3" controlId="hackathonIcon">
              <Form.Control
                type="file"
                placeholder=""
                value={""}
                onChange={(e) => {
                  setFormState({ ...formState, [e.target.id]: e.target.value });
                }}
              />
              <div className="err">{errors.hackathonIcon}</div>
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="hackathonName">
            <Form.Label>Hackathon Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of the hackathon"
              value={formState.hackathonName}
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
            <div className="err">{errors.hackathonName}</div>
          </Form.Group>

          <div className="dates">
            <Form.Group className="mb-3" controlId="hackathonStartDate">
              <Form.Label>Hackathon Start Date</Form.Label>
              <Form.Control
                type="date"
                value={formState.hackathonStartDate}
                onChange={(e) => {
                  setFormState({ ...formState, [e.target.id]: e.target.value });
                }}
              />
              <div className="err">{errors.hackathonStartDate}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="hackathonEndDate">
              <Form.Label>Hackathon End Date</Form.Label>
              <Form.Control
                type="date"
                value={formState.hackathonEndDate}
                onChange={(e) => {
                  setFormState({ ...formState, [e.target.id]: e.target.value });
                }}
              />
              <div className="err">{errors.hackathonEndDate}</div>
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="hackathonGithubRepo">
            <Form.Label>Github Repository</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your submission’s public GitHub repository link"
              value={formState.hackathonGithubRepo}
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
            <div className="err">{errors.hackathonGithubRepo}</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="hackathonOtherLinks">
            <Form.Label>Other Links</Form.Label>
            <Form.Control
              type="text"
              placeholder="You can upload a video demo or URL of you demo app here."
              value={formState.hackathonOtherLinks}
              onChange={(e) => {
                setFormState({ ...formState, [e.target.id]: e.target.value });
              }}
            />
            <div className="err">{errors.hackathonOtherLinks}</div>
          </Form.Group>

          <Button variant="success" onClick={handleUpdate}>
            Save Submission
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditHackathon;
