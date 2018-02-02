import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {
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
    description: string;
    icon: string;
    icon_colour: string;
}


export class CVTimeline extends React.Component<{}, CVTimelineDataState> {
    constructor() {
        super({});
        this.state = { timeline: [], loading: true };

        fetch('http://localhost:8080/api/skills')
            .then((response) => response.json() as Promise<CVTimelineDefn[]>)
            .then(recv => {
                this.setState({ timeline: recv, loading: false});
            });
    }

    public render() {
        let contents = this.state.loading? "Loading..." : this.renderCVStats(this.state.timeline);
        return (
            <Card>
                <CardHeader>Skills</CardHeader>
                <CardBody>
                    {contents}
                </CardBody>
            </Card>
        );
    }

    private renderIcon(item :CVTimelineDefn)
    {
        var colour = item.icon_colour;
        var icon = <div></div>;
        switch(item.icon)
        {
            case "fa-heart-o" :
                icon = <FA.FaHeartO color={colour} />
            break;
            case "fa-barcode" :
                icon = <FA.FaBarcode color={colour} />
            break;
            case "fa-briefcase" :
                icon = <FA.FaBriefcase color={colour} />
            break;
            case "fa-compass" :
                icon = <FA.FaCompass color={colour} />
            break;
            case "fa-windows" :
                icon = <FA.FaWindows color={colour} />
            break;
            case "fa-tripadvisor" :
                icon = <FA.FaTripadvisor color={colour} />
            break;
        }
        return icon;
    }

    private renderCard(item: CVTimelineDefn, index: number) {
        var icon = this.renderIcon(item);
        return (
                <Card key={index}>
                    <CardBody>
                        <CardTitle className="text-center display-2">
                            {icon}
                        </CardTitle>
                        <CardSubtitle>
                            {item.title}
                        </CardSubtitle>
                        <CardText>
                            {item.description}
                        </CardText>
                    </CardBody>
                </Card>
        );
    }

    private renderCVStats(data: CVTimelineDefn[]) {
        var contents = data.map((item, index) => {
            return this.renderCard(item, index);
        });
       
        return (<CardColumns>{contents}</CardColumns>);
    }
}
