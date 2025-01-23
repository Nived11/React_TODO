import userSchema from "./user.model.js";


export async function addUser(req,res){
    const {name,email,phone}=req.body;
    console.log({name,email,phone});
    
    await userSchema.create({name,email,phone}).then(()=>{
        res.status(200).send({msg:"successfully created"})
    }).catch((error)=>{
        res.status(500).send({error})
    })
}

export async function getUser(req,res){
    try {
        const detail = await userSchema.find();
        console.log(detail);
        
        res.status(200).send(detail);
    } catch (error) {
        res.status(400).send({ error });
    }
}

export async function deleteDetails(req, res) {
    const {_id } = req.params;
        await userSchema.deleteOne({_id})
        .then(()=>{
            res.status(200).send({msg:"successfully deleted"})
        }).catch((error)=>{
            res.status(500).send({error})
        })
        
   
}

export async function updateDetail(req,res){
    const {_id}=req.params;
    const {name,email,phone}=req.body;
    // console.log({name,email,phone});
    
    await userSchema.findByIdAndUpdate(_id,{name,email,phone}).then(()=>{
        res.status(200).send({msg:"successfully updated!"})
    }).catch((error)=>{
        res.status(500).send({error})
    })
    
}
