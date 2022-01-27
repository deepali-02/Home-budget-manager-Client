const nodemailer=require('nodemailer')

const transpoter= nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:"dee@outlook.com",
        pass:"12345"
    }
    
})

const options={
    from:"dee@outlook.com",
    to:"deepali93.redekar@gmail.com",
    subject:"Checking nodemailer",
    text:"Wow! It worked"
}

transpoter.sendMail(options,function(error,info){
    if(error){
        console.log(error)
        return
    }
    console.log("Sent: " + info.response)
})