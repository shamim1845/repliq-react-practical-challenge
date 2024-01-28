export class ApiFeatures {
  query: any;
  queryStr: any;
  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyWord = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword.trim(),
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyWord });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // prepare for filter with price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    let queryOptions = JSON.parse(queryStr);

    // prepare for filter with category
    for (const key in queryOptions) {
      if (key === "category") {
        let category = queryOptions[key];
        delete queryOptions[key];
        queryOptions["categories.category_slug"] = category;
      }
    }

    this.query = this.query.find(queryOptions);
    return this;
  }

  pagination(resultPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
