import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface CVMainDataState {
    overview: CVOverview;
    loading: boolean;
}

export class CVMain extends React.Component<RouteComponentProps<{}>, CVMainDataState> {
    constructor() {
        super();
        this.state = { overview: {summary : ''}, loading: true };

        fetch('http://localhost:8080/api/cv/overview')
            .then(response => response.json() as Promise<string>)
            .then(data => {
                this.setState({ overview: {summary : data}, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CVMain.renderCVOverview(this.state.overview);

        return <div>
            <h1>dou.gs</h1>
            { contents }
        </div>;
    }

    private static renderCVOverview(overview: CVOverview) {
        return <p>
            {overview.summary}</p>;
    }
}

interface CVOverview {
    summary: string;
}
