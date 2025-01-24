import userSchema from "./user.model.js";


export async function addTodo(req,res){
    const {task}=req.body;
    console.log({task});
    
    await userSchema.create({task}).then(()=>{
        res.status(201).send({msg:"successfully created"})
    }).catch((error)=>{
        res.status(500).send({error})
    })
}

export async function getTodo(req,res){
    try {
        const detail = await userSchema.find();
        console.log(detail);
        
        res.status(200).send(detail);
    } catch (error) {
        res.status(400).send({ error });
    }
}

export async function deleteTodo(req, res) {
    const {_id } = req.params;
        await userSchema.deleteOne({_id})
        .then(()=>{
            res.status(200).send({msg:"successfully deleted"})
        }).catch((error)=>{
            res.status(500).send({error})
        })
        
   
}

export async function updateTodo(req,res){
    const {_id}=req.params;
    const {task}=req.body;
    // console.log({task});
    
    await userSchema.findByIdAndUpdate(_id,{task}).then(()=>{
        res.status(200).send({msg:"successfully updated!"})
    }).catch((error)=>{
        res.status(500).send({error})
    })
    
}
