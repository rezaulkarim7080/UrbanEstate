class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;

    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } :
            {};


        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        /// removing some fields for categoty 

        const removeFields = ["keyword", "page", "li,it"];
        removeFields.forEach(key => { delete queryCopy[key] });

        ///  filter for price and rating


        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;
        this.query = this.query.skip((currentPage - 1) * resultPerPage).limit(resultPerPage);

        return this;
    }
}

export default ApiFeatures;


