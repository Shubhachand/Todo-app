import {Todo} from "../models/Todo.js";
export const createTodo = async(req,res)=>{
    try{
        const {title, description} = req.body;

        if(!title || !description){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const todo = new Todo({
            title,
            description,
            userId: req.id, 
        });
        // console.log();
        await todo.save();
        return res.status(201).json({ success: true, msg: "Todo created successfully"});
    }catch(error){
        console.error(`Error: ${error.message}`);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}, "_id title description userId");

        if (!todos || todos.length === 0) {
            return res.status(404).json({ msg: "No todos found" });
        }

        console.log("Fetched Todos:", todos); // Debugging
        return res.status(200).json({ todos });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const updateTodo = async(req,res)=>{
    try{
        const todoId = req.params.todoId.trim();
        const {title, description} = req.body;
    const todo =   await Todo.findByIdAndUpdate(todoId, {title, description}, {new: true});
       
        return res.status(200).json({msg: "Todo updated successfully"});

    }catch(error){
        console.error(`Error: ${error.message}`);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

export const deleteTodo = async(req,res)=>{
 try {
    const todoId = req.params.todoId.trim();
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({msg: "Todo deleted successfully"});
 } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({msg: "Internal Server Error"});
 }   
}