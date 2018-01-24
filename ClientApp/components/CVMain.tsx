import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface CVMainDataState {
    data: CVOverview;
    loading: boolean;
}

export class CVMain extends React.Component<RouteComponentProps<{}>, CVMainDataState> {
    constructor() {
        super();
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

        return <div>
            <h1>dou.gs</h1>
            { contents }
        </div>;
    }

    private static renderCVOverview(data: CVOverview) {
        return <p>
            {data.overview}</p>;
    }
}

interface CVOverview {
    overview: string;
}
