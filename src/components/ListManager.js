import Lists from './Lists';
import Items from './Items';

const ListManager = ({ lists, setLists, loading }) => {
  const getActiveList = () => {
    let activeList = lists.find((list) => list.active);
    if (!activeList) {
      activeList = lists[0];
      setActiveList(activeList.id);
    }
    return activeList;
  };

  const setActiveList = (id) => {
    const data = lists.map((list) =>
      list.id === id ? { ...list, active: true } : { ...list, active: false }
    );
    setLists(data);
  };

  const saveList = (updatedList) => {
    const data = lists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    setLists(data);
  };

  if (loading) return null;
  return (
    <>
      <Lists
        lists={lists}
        setLists={setLists}
        saveList={saveList}
        setActiveList={setActiveList}
      />
      <Items list={getActiveList()} saveList={saveList} />
    </>
  );
};

export default ListManager;
