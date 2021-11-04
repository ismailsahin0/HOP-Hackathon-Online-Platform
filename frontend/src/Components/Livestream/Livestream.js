import React, { Component } from "react";
import { Container, Row } from 'reactstrap';
import "./Livestream.css";


class Livestream extends Component {
    constructor() {
        super();
        this.state = {
            videoUrl: 'http://www.youtube.com/embed/lJ7Wr-KTikU',
            videoDescription: 'Today we will start with the basics of Quantum Computing.',
            speakers: [{ speaker: 'Emre Zinal', topic: 'Topic 1' },
            { speaker: 'Mahir Bastas', topic: 'Topic 2' },
            { speaker: 'Betul Gokbel', topic: 'Topic 3' },
            { speaker: 'Ismail Sahin', topic: 'Topic 4' }
            ],
            extraNotes: ''
        };
        // this.fetchLivestreamData();
    }

    /* fetchLivestreamData() {
         const response = (async()=> await axios ({
             url: "https://cat-fact.herokuapp.com/facts",
             method: "GET"
         });
         this.setState({
             videoUrl: response.data.videoUrl,
             videoDescription: response.data.videoDescription,
             speakers: response.data.speakers,
             extraNotes: response.data.extraNotes,
         });
     }
     */


    videoContent() {
        return (
            <div style={{ height: "100%;" }}>
                <h3 style={{fontWeight: 'bold'}}>
                    Video Description:
                </h3>
                <em>{this.state.videoDescription}</em>
                <hr />
                <h3 style={{fontWeight: 'bold', marginTop: '16px;' }}>Speakers in this video:</h3>
                {this.state.speakers.map(s => {
                    return (
                        <p><b>{s.speaker}:</b>{s.topic}</p>
                    )
                })}
                <p>{this.state.extraNotes}</p>
                <hr />
                <h3 style={{fontWeight: 'bold'}}>Other Videos:</h3>
                <ul>
                    <li><a href="#">Day 2 Livestream</a></li>
                    <li><a href="#">Day 3 Livestream</a></li>
                </ul>
            </div>

        );
    }
    render() {
        return (
            <Container className="content-main">
                <h2 id="video-title">Watch Event Livestream</h2>
                <hr />
                <Row>
                    <div id="player-container">
                        <iframe title="youtube-stream" id="player" type="text/html" width="640" height="390"
                            src={this.state.videoUrl + '?enablejsapi=1&origin=http://example.com'}
                            frameBorder="0"></iframe>
                    </div>
                    <div id="video-description">
                        {this.videoContent()}
                    </div>
                </Row>
            </Container>
        );
    }
}

export default Livestream;
