const TeamList = () => {
    const globalState = useContext(AppContext);
    const [teams, setTeams] = useState([]);
    const [filterField, setFilterField] = useState('name');
    const [filterValue, setFilterValue] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('ASC');
  
    useEffect(() => {
      globalState.team.getAll(globalState, globalState.user.data.id, {
        filterField,
        filterValue,
        sortField,
        sortOrder,
      });
      globalState.team.emitter.addListener('GET_TEAMS_SUCCESS', () => {
        setTeams(globalState.team.data);
      });
    }, [filterField, filterValue, sortField, sortOrder]);
  
    return (
      <div>
        <h1>Teams</h1>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
        />
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="name">Name</option>
          <option value="createdAt">Created At</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <ul>
          {teams.map(team => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
      </div>
    );
  };