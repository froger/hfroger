import notion from './notion-cli.mjs';

const notionTable = async (selectFilter) => {
  let results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE,
      filter: {
        property: "Type",
        select: {
          equals: selectFilter,
        },
      },
      "sorts": [
        {
            "property": "priority",
            "direction": "ascending"
        }
      ],
      start_cursor: startCursor,
      page_size: 50,
    });

    results = [...results, ...response.results];
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }
  return results.map(({ id, properties, object }) => ({object, id, ...properties}));
};

export default notionTable;
