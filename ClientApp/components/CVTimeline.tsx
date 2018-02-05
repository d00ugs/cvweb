import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {
    Row,
    Col,
    CardTitle,
    CardText,
    CardColumns,
    CardSubtitle,
    CardBody,
    CardHeader,
    Card, 
} from 'reactstrap';
import * as FA from 'react-icons/lib/fa';

interface CVTimelineDataState {
    timeline: CVTimelineDefn[];
    loading: boolean;
}

interface CVTimelineDefn {
    title: string;
    subtitle: string;
    start_year: number;
    end_year: number;
}


export class CVTimeline extends React.Component<{}, CVTimelineDataState> {
    constructor() {
        super({});
        this.state = { timeline: [], loading: true };

        fetch('http://localhost:8080/api/timeline')
            .then((response) => response.json() as Promise<CVTimelineDefn[]>)
            .then(recv => { console.log(recv);
                this.setState({ timeline: recv, loading: false});
            });
    }

    public render() {
        let contents = this.state.loading? "Loading..." : this.renderCVTimeline(this.state.timeline);
        return (
            <Card>
                <CardHeader>Career</CardHeader>
                <CardBody>
                    {contents}
                </CardBody>
            </Card>
        );
    }

    private renderCard(item: CVTimelineDefn, index: number) {
        var card = (
            <Card key={index}>
                    <CardBody>
                        <CardTitle>
                            {item.title}
                        </CardTitle>
                        <CardSubtitle>
                            {item.subtitle}
                        </CardSubtitle>
                        <CardText>
                            {item.start_year}-{item.end_year ?  item.end_year : ""}
                        </CardText>
                    </CardBody>
                </Card>
        );
        var date = (
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardText>
                    {item.start_year}
                </CardText>
            </Card>
        );
        var left = <div></div>;
        var right = <div></div>;
        if(index % 2)
        {
            left = card;
            right = date;
        }
        else
        {
            right = card;
            left = date;
        }
        return (
            <Row>
                <Col>
                {left}
                </Col>
                <Col>
                </Col>
                <Col>
                {right}
                </Col>
            </Row>
        );
    }

    private renderCVTimeline(data: CVTimelineDefn[]) {
        var contents = data.map((item, index) => {
            return this.renderCard(item, index);
        });
       
        return (<div>{contents}</div>);
    }
}
