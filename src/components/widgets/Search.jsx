import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';

const searchEngines = require('../../modules/searchEngines.json');

export default class Search extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      searchBar: true,
      searchEngine: {},
      voiceSearch: false,
      suggest: true,
    };
  }

  componentDidMount() {
    const custom = localStorage.getItem('customSearchEngine');
    const searchEngine = custom ?
      { url: custom } :
      searchEngines.find(i => i.settingsName === localStorage.getItem('searchEngine'));

    this.setState({
      searchBar: localStorage.getItem('searchBar') === 'true',
      searchEngine,
      voiceSearch: localStorage.getItem('voiceSearch') === 'true',
      suggest: searchEngine.suggestionUrl && localStorage.getItem('suggestion') === 'true'
    });
  }

  startSpeechRecognition() {
    const voiceSearch = new window.webkitSpeechRecognition();
    voiceSearch.start();
    voiceSearch.onresult = (event) => document.getElementById('searchtext').value = event.results[0][0].transcript;
    voiceSearch.onend = () => setTimeout(() => window.location.href = this.state.searchEngine.url + document.getElementById('searchtext').value, 1000);
  }

  render() {
    if (!this.state.searchBar) return null;

    const searchButton = () => {
      const value = document.getElementById('searchtext').value || 'mue fast';
      window.location.href = this.state.searchEngine.url + value;
    };

    const microphone = this.voiceSearch ?
      <MicIcon className='micIcon' onClick={() => this.startSpeechRecognition()} /> : null;

    return (
      <div id='searchBar' className='searchbar'>
        {microphone}
        <SearchIcon onClick={() => searchButton()} id='searchButton' />
        <input type='text' id='searchtext' className='searchtext'
          placeholder={this.props.language}
          onKeyPress={(event) => { if (event.key == "Enter") searchButton() }}
        />
      </div>
    );
  }
}
