const {Order, ProductCart} = require("../models/order");

exports.getOrderById = (req,res,next,id)=>{
	Order.findById(id).populate("products.product","name price").exec((err,order)=>{
		if(err){
			res.status(400).json({error:"No Order foundd"})
		}
		req.order = order
		next()
	})
}



exports.createOrder = (req,res)=>{
	req.body.order.user = req.profile
	const order  = new Order(req.body.order)

	order.save((err,order)=>{
		if(err){
			res.status(400).json({error:"Failed to save order"})
		}
		res.json(order)
	})
}

exports.getAllOrders = (req,res)=>{
	Order.find().populate("user", "_id name email").exec((err,Orders)=>{
		if(err){
			res.status(400).json({error:"No orders found"})
		}
		res.json(orders)
	})
}

exports.getOrderStatus = (req,res)=>{
	 res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req,res)=>{
	Order.update({_id:req.body.orderId},{$set:{status:req.body.status}},(err,oder)=>{
		if(err){
			res.status(400).json({error : "Cannot update order Status"})
		}
		res.json(order)
	})

		
}