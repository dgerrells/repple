import React from 'react';
import Store from 'store';
import { IconButton } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// Client ID and API key from the Developer Console
const CLIENT_ID =
  '1073462666302-u2qqpvukdupoqmc0pv83u9rp6pofv058.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4'
];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const API_URL = 'https://apis.google.com/js/api.js?onload=onGapiLoad';

class Sheets extends React.Component {
  componentDidMount() {
    if (window.gapi) {
      return;
    }
    const gapiScript = document.createElement('script');
    gapiScript.src = API_URL;
    window.onGapiLoad = this.onGapiLoad;
    document.body.appendChild(gapiScript);
  }

  onGapiLoad = () => {
    const gapi = window.gapi;
    gapi.load('client:auth2', this.initClient);
    this.setState({
      gapi
    });
  };

  initClient = async () => {
    const { gapi } = this.state;
    await gapi.client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    });
    this.setState({
      auth: gapi.auth2.getAuthInstance()
    });
  };

  createSheet = async () => {
    const { workouts, completedSets } = this.props;
    const sheetBody = {
      properties: {
        title: 'Workout Log'
      },
      sheets: [
        {
          properties: {
            title: 'Completed Sets'
          },
          data: [
            {
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Workout' } },
                    { userEnteredValue: { stringValue: 'Set Number' } },
                    { userEnteredValue: { stringValue: 'weight' } },
                    { userEnteredValue: { stringValue: 'Completed On' } }
                  ]
                },
                ...completedSets.map(set => {
                  return {
                    values: [
                      { userEnteredValue: { stringValue: set.workout.name } },
                      { userEnteredValue: { numberValue: set.value } },
                      { userEnteredValue: { numberValue: set.weight || 0 } },
                      { userEnteredValue: { numberValue: set.created } }
                    ]
                  };
                })
              ]
            }
          ]
        },
        {
          properties: {
            title: 'Workouts'
          },
          data: [
            {
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Workout Name' } },
                    { userEnteredValue: { stringValue: 'Created' } }
                  ]
                },
                ...workouts.map(workout => {
                  return {
                    values: [
                      { userEnteredValue: { stringValue: workout.name } },
                      { userEnteredValue: { numberValue: workout.created } }
                    ]
                  };
                })
              ]
            }
          ]
        }
      ]
    };
    let res;
    try {
      res = await window.gapi.client.sheets.spreadsheets.create({}, sheetBody);
    } catch (e) {
      alert(JSON.stringify(e));
    }

    if (!res.result.spreadsheetId) {
      return;
    }
    Store.set('sheetMeta', {
      id: res.result.spreadsheetId,
      url: res.result.spreadsheetUrl
    });
    window.open(res.result.spreadsheetUrl);
  };

  updateSheet = async () => {};

  login = async () => {
    const { auth } = this.state;
    if (!auth.isSignedIn.get()) {
      alert('Logging in');
      await auth.signIn();
    }
    this.createSheet();
  };

  render() {
    return (
      <IconButton onClick={this.login}>
        <CloudUploadIcon />
      </IconButton>
    );
  }
}

export default Sheets;
