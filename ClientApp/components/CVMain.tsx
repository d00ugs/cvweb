import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardTitle, CardText, Button } from 'reactstrap';

interface CVMainDataState {
    data: CVOverview;
    loading: boolean;
}

interface CVOverview {
    overview: string;
}

export class CVMain extends React.Component<{}, CVMainDataState> {
    constructor() {
        super({});
        this.state = { data: {overview: ''}, loading: true };

        fetch('http://localhost:8080/api/cv/overview')
            .then((response) => response.json() as Promise<CVOverview>)
            .then(recv => {
                this.setState({ data: recv, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CVMain.renderCVOverview(this.state.data);

        return (
            <Card>
                { contents }
            </Card>
        );
    }

    private static renderCVOverview(data: CVOverview) {
        return (<CardText>{data.overview}</CardText>);
    }
}
