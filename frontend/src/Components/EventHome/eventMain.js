import React from "react";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./carousel.css";
import headImage from "./headImage.jpeg";
import ceremony from "./ceremony.jpeg"
import youtube from "./youtube.jpeg"
import ModalExample from "../Modal/ModalExample";
import Image from 'react-bootstrap/Image';

const EventMain = () => {

    const userOperations = () => {
        const username = localStorage.getItem('username');
        if (username === 'gokbel.betul@metu.edu.tr') {
            return (
                <p><a className="btn btn-lg btn-primary" href="/manageEvent">Assign Jury Members</a></p>
            )
        } else if (username === 'emrezinal151@gmail.com') {
            return (
                <div className="d-flex flex-row justify-content-center">
                    <p><a className="btn btn-lg btn-secondary" href="/schedule">Schedule</a></p>
                    <p className="ml-1"><a className="btn btn-lg btn-primary" href="/groupInfo">Group Page</a></p>
                </div>
            )
        } else if (username === 'mahir.bastas@metu.edu.tr') {
            return (
                <p><a className="btn btn-lg btn-primary" href="/jurie">Jury Panel</a></p>
            )
        } else if (username !== "null" && username !== null) {
        }
    }

    return (
        <div>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={headImage} alt="Logo" width="80px" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>QUANTUM TURKEY EVENT</h1>
                                <p>Lets join an amazing hackathon !</p>
                                {userOperations()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container marketing">


                <div className="row" style={{color: "black"}}>
                    <div className="col-lg-4">   
                            <Image src="ismail.jpeg" alt="" width="140" height="140" roundedCircle />
                        <h4>Ismail Sahin</h4>
                        <p>Day 1 Speaker</p>
                    </div>

                    <div className="col-lg-4">
                    <Image src="emre.jpeg" alt="" width="140" height="140" roundedCircle />
                        <h4>Emre Zinal</h4>
                        <p>Day 2 Speaker</p>
                    </div>

                    <div className="col-lg-4">
                    <Image src="mahir.jpeg" alt="" width="140" height="140" roundedCircle />
                        <h4>Mahir Bastas</h4>
                        <p>Day 3 Speaker</p>
                    </div>

                </div>

                <hr className="featurette-divider"></hr>

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">We will be live on YouTube.</h2>
                        <p className="lead">You can follow event speakers who will be giving their amazing speeches easily.</p>
                        <p><a className="btn btn-primary" href="/livestream">Watch Livestream &raquo;</a></p>
                    </div>
                    <div className="col-md-5">
                        <img src={youtube}></img>
                    </div>
                </div>

                <hr className="featurette-divider"></hr>

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Don't forget to watch the award ceremony!</h2>
                        <p className="lead">At the end of the event, we will organize an award ceremony.</p>
                        <ModalExample></ModalExample>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={ceremony}></img>
                    </div>
                </div>

                <hr className="featurette-divider"></hr>
            </div>
            <footer className="container">
                <p className="float-end"><a href="#">Back to top</a></p>
                <p>&copy; 2020–2021 Company, Inc. &middot;</p>
            </footer>
        </div>
    );
};

export default EventMain;
