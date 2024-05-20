// expresss for inmemory doctor database
//get - returnthe number of kidneys and number of healthy and unhealthy kidneys
//post - add new kidney
//put - replace unhealthy kidney with healthy kidney or vice versa
//delete - remove kidney 

const users=[{
    name:"john",
    kidneys:[{
        health:true
    },
    {
        health:false
    }]
}]
const express=require('express');
const app=express();
//implementation of get
app.get("/",function(request,response){
    const johnKidney=users[0].kidneys;
    const numberOfKidneys=johnKidney.length;
    let noOfHealthyKideneys=0;
    let noOfUnhealthyKidneys=0;
    for(let i=0;i<numberOfKidneys;i++){
        if(johnKidney[i].health==true){
            noOfHealthyKideneys++;
        }
        else if(johnKidney[i].health==false){
            noOfUnhealthyKidneys++;
        }
    }
    console.log("number of kideneys: "+numberOfKidneys);
    console.log("number of healthy kidneys: "+noOfHealthyKideneys);
    console.log("number of unhealthy kidneys: "+noOfUnhealthyKidneys);
    response.json({
        numberOfKidneys,
        noOfHealthyKideneys,
        noOfUnhealthyKidneys 
    })
})
app.use(express.json());
//post request user can post a new healthy or unhealth kidney
// to use post we send data in body 
app.post("/",function(req,res){
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        health:ishealthy
    })
    res.json({
        msg:"new kidney added"
    })
})

//put request change all unhealy kidneys to healthykidneys
app.put("/",function(req,res){
    if(checkBadKidneys()){
        for(let i=0;i<users[0].kidneys.length;i++){
            users[0].kidneys[i].health=true;
        }
        res.json({
            msg:"all kidneys are now healthy"
        })
    }else{
        res.status(411).json({
            msg:"you have no bad kidneys"
        })
    }
})

// delete request delete all unhealty kidneys
app.delete("/",function(req,res){
    if(checkBadKidneys()){
        const newkidneys=[];
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].health==true){
                newkidneys.push({
                    health:true
                })
            }
        
        }
        users[0].kidneys=newkidneys;
        res.json({
            msg:"all unhealthy kidneys are removed"
        })
    }else{
        res.status(411).json({
            msg:"you have no bad kidneys"
        })
    }
    
})
function checkBadKidneys(){
    let BadKidneys=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].health==false){
            BadKidneys=true;
        }
    }
    return BadKidneys;
}
app.listen(3000);