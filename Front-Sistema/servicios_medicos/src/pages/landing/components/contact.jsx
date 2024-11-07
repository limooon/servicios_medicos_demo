import { useState } from "react";
import emailjs from "emailjs-com";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        e.target,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id="contact">
      <div className="container">
        <div className="section-title text-center">
          <h2>Get In Touch</h2>
          <p>
            Please fill out the form below to send us an email and we will get
            back to you as soon as possible.
          </p>
        </div>

        <div className="row">
          <div className="col-md-8 mx-auto col-lg-6">
            <form name="sentMessage" validate onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                />
                <p className="help-block text-danger"></p>
              </div>

              <div className="form-group mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
                <p className="help-block text-danger"></p>
              </div>

              <div className="form-group mb-3">
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Message"
                  required
                  onChange={handleChange}
                ></textarea>
                <p className="help-block text-danger"></p>
              </div>

              <button type="submit" className="btn btn-custom btn-lg">
                Send Message
              </button>
            </form>
          </div>
          <div className="col-md-4">
            <h3>Contact Info</h3>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address:{" "}
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone:{" "}
                </span>
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email:{" "}
                </span>
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="social text-center">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href={props.data ? props.data.facebook : "/"}>
                  <i className="bi bi-facebook fs-2"></i>{" "}
                  {/* Icono de Facebook */}
                </a>
              </li>
              <li className="list-inline-item">
                <a href={props.data ? props.data.twitter : "/"}>
                  <i className="bi bi-twitter fs-2"></i>{" "}
                  {/* Icono de Twitter */}
                </a>
              </li>
              <li className="list-inline-item">
                <a href={props.data ? props.data.youtube : "/"}>
                  <i className="bi bi-youtube fs-2"></i>{" "}
                  {/* Icono de YouTube */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
