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

interface CVSkillsDataState {
    skills: CVSkillDefn[];
    loading: boolean;
}

interface CVSkillDefn {
    title: string;
    description: string;
    icon: string;
    icon_colour: string;
}


export class CVSkills extends React.Component<{}, CVSkillsDataState> {
    constructor() {
        super({});
        this.state = { skills: [], loading: true };

        fetch('http://localhost:8080/api/skills')
            .then((response) => response.json() as Promise<CVSkillDefn[]>)
            .then(recv => {
                this.setState({ skills: recv, loading: false});
            });
    }

    public render() {
        let contents = this.state.loading? "Loading..." : this.renderCVStats(this.state.skills);
        return (
            <Card>
                <CardHeader>Skills</CardHeader>
                <CardBody>
                    {contents}
                </CardBody>
            </Card>
        );
    }

    private renderIcon(item :CVSkillDefn)
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

    private renderCard(item: CVSkillDefn, index: number) {
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

    private renderCVStats(data: CVSkillDefn[]) {
        var contents = data.map((item, index) => {
            return this.renderCard(item, index);
        });
       
        return (<CardColumns>{contents}</CardColumns>);
    }
}
