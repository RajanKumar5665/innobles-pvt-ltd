/**
 * Paginate any Mongoose query safely. Enforces a max limit of 50.
 */
const paginate = async ({
  model,
  query = {},
  page = 1,
  limit = 10,
  sort = {},
  select = "",
  populate = [],
}) => {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Math.min(50, Number(limit) || 10));

  const [total, data] = await Promise.all([
    model.countDocuments(query),
    model
      .find(query)
      .select(select)
      .sort(sort)
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .populate(populate)
      .lean(),
  ]);

  return {
    data,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

export default paginate;
