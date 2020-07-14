require('dotenv').config();
const knex = require('knex');

const db = knex({
  client:'pg',
  connection: process.env.DB_URL,
});

const getItemsContainingSearch = (searchTerm) => {
  const queryString = db
    .select()
    .from('shopping_list')
    .where('item_name','ILIKE',`%${searchTerm}%`)
  //     .toQuery();

  //   console.log(queryString);

    .then(result => {
      console.log(result);
    });
};

const getItemsPaginated = (pageNumber) => {
  const queryString = db
    .select()
    .from('shopping_list')
    .limit(6)
    .offset(pageNumber*6-1)
    // .toQuery();

  // console.log(queryString);

    .then(result => {
      console.log(result);
    });
};

const getItemsFromDaysAgo = (daysAgo) => {
  const queryString = db
    .select()
    .from('shopping_list')
    .where('date_added','>',db.raw(`now() - '?? days':: INTERVAL`, daysAgo))
    // .toQuery();

  // console.log(queryString);

    .then(result => {
      console.log(result);
    });
};

const totalCostPerCategory = () => {
  const queryString = db
    .select('category')
    .from('shopping_list')
    .sum('price as total')
    .groupBy('category')
    // .toQuery();

  // console.log(queryString);

    .then(result => {
      console.log(result);
    });
};

// getItemsContainingSearch('bacon');
getItemsPaginated(3);
// getItemsFromDaysAgo(10);
// totalCostPerCategory();
