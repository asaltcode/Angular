class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search = () => {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : null;
        if(keyword === null){
            return this.query = [];  
        };
        this.query.find({...keyword});
        return this;
    }
}

export default APIFeatures;