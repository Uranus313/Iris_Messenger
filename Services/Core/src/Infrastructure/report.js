import { ReportModel } from "../Domain/Report.js";

export async function saveReport(reportCreate){
    const result = {};
    const report = new ReportModel(reportCreate);
    const response = await report.save();
    result.response = response.toJSON();
    return result;
}

export async function getReports({id , searchParams ,limit , floor ,textSearch,sort , desc , seeDeleted }){
    const result = {};
    
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await ReportModel.find({_id : id}).findOne();
        if(result.response){
            result.response = result.response.toJSON();
        }
        return result;
    }else{
        if (!seeDeleted) {
            searchParams = {
                ...searchParams,
                $or: [
                    { deleted: { $exists: false } }, // Field does not exist
                    { deleted: null },              // Field is null
                    { deleted: false }              // Field is explicitly false
                ]
            };
        }
        let data = null;
        let hasMore = false;
        if(!limit){
            limit = 20;
        }
        if(textSearch && textSearch != ''){
            data = await ReportModel.find({...searchParams,reason:{
                $regex: textSearch,
                $options: 'i'
            } }).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ReportModel.countDocuments({...searchParams,lastName:{
                $regex: textSearch,
                $options: 'i'
            } });
            hasMore = count > (Number(limit) + Number(floor));
            // console.log(hasMore)
        }else{
            data = await ReportModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ReportModel.countDocuments(searchParams);
            // console.log(count);
            // console.log(limit+floor);
            
            hasMore = count > (Number(limit) + Number(floor));
            console.log(hasMore)
        }
        for (let index = 0; index < data.length; index++) {
            data[index] = data[index].toJSON();
            delete data[index].password;
        }
        result.response = {
            data: data,
            hasMore: hasMore
        }
        return result;
    }
}


export async function deleteReport(id){
    const result = {};
    result.response = await ReportModel.deleteOne({_id : id});
    return result;
}


export async function softDeleteReport(id){
    const result = {};
    const response = await ReportModel.findByIdAndUpdate(id,{$set :{
      isDeleted: true,
      deletedAt: Date.now()
    }},{new : true});
      result.response = response.toJSON();
    return result;
  }
  


export async function updateReport(id,reportUpdate ){
    const result = {};
    
    const response = await ReportModel.findByIdAndUpdate(id,{$set :reportUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

