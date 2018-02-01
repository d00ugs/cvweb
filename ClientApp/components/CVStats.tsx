import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Container, Row, Col, Card, CardImg, CardImgOverlay, CardDeck, CardBody } from 'reactstrap';

interface CVStatsData {
    degree: number;
    years: number;
    sectors: number;

}

interface CVStatsDataState {
    data: CVStatsData;
    loading: boolean;
}

export class CVStats extends React.Component<{}, CVStatsDataState> {
    constructor() {
        super({});
        this.state = { loading: true, data: {degree: 0, years: 0, sectors: 0} };

        fetch('http://localhost:8080/api/stats')
            .then((response) => response.json() as Promise<CVStatsData>)
            .then(recv => {
                this.setState({ data: recv, loading: false});
            });
    }

    public render() {
        let contents = this.state.loading ? "" : CVStats.renderCVStats(this.state.data);
        return (
            <Card inverse>
                <CardImg src="/img/street.jpg" />
                <CardImgOverlay className="d-flex">
                    { contents }
                </CardImgOverlay>
           </Card>
        );
    }

    private static renderCVStats(data: CVStatsData) {
        return (
            <Container className="my-auto">
                <Row>
                    <Col className="text-center">
                        <h1>Statistics</h1>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs="8">
                        <Row>
                            <Col>
                                <div><h3>{data.degree}</h3><p>degree</p></div>
                            </Col>
                            <Col>
                                <div><h3>{data.years}</h3><p>years of experience</p></div>
                            </Col>
                            <Col>
                                <div><h3>{data.sectors}</h3><p>industry sectors</p></div>
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
                </Container>
         );
    }
}
