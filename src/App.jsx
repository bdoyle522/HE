import { useState, useCallback, useMemo } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { fetchRepos } from './api';
import { Search } from './components/Search';
import { Details } from './components/Details';
import { ALL, OK } from './constants';

import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchVal, onChange] = useState('');
  const [previousSearchVal, setPreviousSearchVal] = useState('');
  const [selectedRepo, setSelectedRow] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(ALL);

  const history = useHistory();

  const onSearch = async (sort, sortOrder) => {
    setResultsLoading(true);
    const valueToSearch = !sort && !sortOrder ? searchVal : previousSearchVal;
    const { results: repos, status } = await fetchRepos(
      valueToSearch,
      sort,
      sortOrder
    );
    setResultsLoading(false);
    if (status !== OK) {
      // returning so that previous results are left showing,
      // as opposed to clearing everything
      return alert('Your search has failed, please try again.');
    }
    setResults(repos);
    setFilteredResults(repos);
    setPreviousSearchVal(valueToSearch);
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
