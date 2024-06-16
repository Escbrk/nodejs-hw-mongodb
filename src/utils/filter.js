const parseTypeFilter = (unknown) => {
  if (['work', 'home', 'personal'].includes(unknown)) return unknown;
};

const parseBoolenFilter = (unknown) => {
  if (!['true', 'false'].includes(unknown)) return;

  return unknown === 'true' ? true : false;
};

export const parseFilters = (query) => {
  return {
    type: parseTypeFilter(query.type),
    favourite: parseBoolenFilter(query.favourite),
  };
};
