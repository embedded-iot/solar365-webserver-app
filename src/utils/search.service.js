const getSearchOptions = (keyword = '', searchByFields = []) => {
  const searchOptions = [];
  searchByFields.forEach((key) => {
    searchOptions.push({
      // eslint-disable-next-line security/detect-non-literal-regexp
      [key]: new RegExp(keyword, 'i'),
    });
  });
  return {
    $or: searchOptions,
  };
};

module.exports = {
  getSearchOptions,
};
