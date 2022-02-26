const Category = require('../models/category')

exports.getCategoryById = (req,res,next,id)=>{

	Category.findById(id).exec((err,cate)=>{
		if(err){
			return res.status(400).json({
				error : "No Category Found"
			})
		}
		req.category = cate
		next()
	})

}

exports.createCategory = (req,res)=>{
	const category = new Category(req.body);
	category.save((error,category)=>{
		if(error){
			return res.status(400).json({error: "Unable to Save"})
		}
		res.json({category})
	})
}


exports.getCategory = (req, res)=>{
	// 
	return res.json(req.category)
}

exports.getAllCategory = (req,res)=>{
	Category.find().exec((error,items)=>{
		if(error){
			return res.status(400).json({error: "No Category Found"})
		}
		res.json(items)
	})
}

exports.updateCategory = (req,res)=>{
	const category =req.category
	category.name =req.body.name

	category.save((error, updatedCategory)=>{
		if(error){
			return res.status(400).json({error: "Failed to update Category"})
		}

		res.json({updatedCategory})
	})
}

 
exports.deleteCategory = (req,res)=>{
	const category = req.category

	category.remove((error,category)=>{
		if(error){
			return res.status(400).json({error: "Failed to Delete Category"})
		}
		res.json({message: "Successfully Deleted"})
	})
}

