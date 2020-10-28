import React from 'react';
import SettingsFunctions from '../../../../modules/settingsFunctions';
import { toast } from 'react-toastify';
import Section from '../Section';
import Dropdown from '../Dropdown';
import CheckBox from '../Checkbox';

const searchEngines = require('../../../../modules/searchEngines.json');

export default class SearchSettings extends React.PureComponent {
  resetSearch() {
    localStorage.removeItem('customSearchEngine');
    document.getElementById('customSearchEngine').value = '';
    toast(this.props.toastLanguage.reset);
  }

  componentDidMount() {
    if (localStorage.getItem('searchEngine') === 'custom') {
      const input = document.getElementById('searchEngineInput');
      input.style.display = 'block';
      input.enabled = 'true';
      document.getElementById('customSearchEngine').value = localStorage.getItem('customSearchEngine');
    } else localStorage.removeItem('customSearchEngine');

    document.getElementById('searchEngine').value = localStorage.getItem('searchEngine');
  }

  render() {
    return (
      <React.Fragment>
        <Section title={this.props.language.searchbar.title} name='searchBar'>
          <ul>
            <Dropdown label={this.props.language.searchbar.search_engine}
              name='searchEngine'
              id='searchEngine'
              onChange={() => SettingsFunctions.setSearchEngine(document.getElementById('searchEngine').value)}
            >
              {searchEngines.map((engine) =>
                <option key={engine.name} className='choices' value={engine.settingsName}>{engine.name}</option>
              )}
              <option className='choices' value='custom'>Custom</option>
            </Dropdown>
          </ul>
          <ul id='searchEngineInput' style={{ display: 'none' }}>
            <p style={{ "marginTop": "0px" }}>{this.props.language.searchbar.custom} <span className='modalLink' onClick={() => this.resetSearch()}>{this.props.language.reset}</span></p>
            <input type='text' id='customSearchEngine'></input>
          </ul>
          <ul>
            <CheckBox name="suggestion" text={this.props.language.searchbar.show_suggestion} />
          </ul>
        </Section>
      </React.Fragment>
    );
  }
}