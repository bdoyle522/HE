import { useState, useCallback, useMemo } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { fetchRepos } from './api';
import { Search } from './components/Search';
import { Details } from './components/Details';
import { ALL } from './constants';

import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedRepo, setSelectedRow] = useState(null);
  const [searchVal, onChange] = useState('');
  const [resultsLoading, setResultsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(ALL);

  const history = useHistory();

  const onSearch = async (sort, sortOrder) => {
    setResultsLoading(true);
    const { results: repos, status } = await fetchRepos(
      searchVal,
      sort,
      sortOrder
    );
    setResultsLoading(false);
    if (status !== 200) {
      return alert('Your search has failed, please try again.');
    }
    setResults(repos);
    setFilteredResults(repos);
    setSelectedLanguage(ALL);
  };

  const onSelectRow = useCallback(
    (i) => {
      const selectedRow = results[i];
      setSelectedRow(selectedRow);
      history.push('/detail');
    },
    [setSelectedRow, results, history]
  );

  const languages = useMemo(() => {
    return results.reduce((langs, res) => {
      const { language } = res;
      if (!!language && !langs.includes(res.language)) {
        langs.push(language);
      }
      return langs;
    }, []);
  }, [results]);

  const onLanguageSwitch = (language) => {
    setSelectedLanguage(language);
    if (language === ALL) {
      return setFilteredResults(results);
    }
    setFilteredResults(
      results.filter((result) => result.language === language)
    );
  };

  const goBack = () => {
    history.goBack();
    setSelectedRow(null);
  };

  return (
    <main className="App">
      <Switch>
        <Route
          exact
          path="/detail"
          render={() => {
            if (!results.length) {
              return <Redirect to="" />;
            }
            return <Details selectedRepo={selectedRepo} goBack={goBack} />;
          }}
        ></Route>
        <Route exact path="/">
          <Search
            onSearch={onSearch}
            languages={languages}
            searchVal={searchVal}
            onChange={onChange}
            setSelectedLanguage={onLanguageSwitch}
            results={filteredResults}
            onSelectRow={onSelectRow}
            resultsLoading={resultsLoading}
            selectedLanguage={selectedLanguage}
          />
        </Route>
        <Redirect exact path="*" to="/" />
      </Switch>
    </main>
  );
}

export default App;