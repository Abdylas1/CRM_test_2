import { useSearchParams } from 'react-router-dom';

function useFilterSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('search') || '';
  const categoryValue = searchParams.get('category') || '';
  const sortByValue = searchParams.get('sortBy') || 'createdAt';
  const sortOrderValue = searchParams.get('sortOrder') || 'desc';
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('pageSize')) || 8;

  const updateSearchParams = (updates, callback) => {
    const newSearchParams = new URLSearchParams(searchParams);

    for (let key in updates) {
      const value = updates[key];
      if (callback(value)) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    }

    setSearchParams(newSearchParams, { replace: true });
  };

  return {
    searchValue,
    page,
    pageSize,
    categoryValue,
    updateSearchParams,
    sortByValue,
    sortOrderValue,
  };
}

export default useFilterSearchParams;
