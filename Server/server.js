/**
 * Created by Damitha on 6/30/2017.
 */
const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/NoticesDB');

var Notice = mongoose.model('Notice',{
    title: {
        type : String,
        trim:true
    },
    state: {
        type : String,
        default:"new"
    },
    content: {

    },
    sender: {

    },
    receivers: {

    },
    type:{

    },
    exDate:{

    }
});

var Advertisement = mongoose.model('Advertisement',{
    title: {
        type : String,
        trim:true
    },
    state: {
        type : String,
        default:"new"
    },
    content: {

    },
    sender: {

    },
    receivers: {

    },
    exDate:{

    },
    type:{

    }
});

var Event = mongoose.model('Event',{
    title: {
        type : String,
        trim:true
    },
    state: {
        type : String,
        default:"new"
    },
    content: {

    },
    sender: {

    },
    receivers: {

    },
    exDate:{

    },
    type:{

    }
});

var User = mongoose.model('User',{
    iD : {
        type: String,
        required: true
    },
    name :{
        type: String
    },
    type : {
        type: String
    },
    batch : [{
        department :{

        },
        year : {

        }
    }],
    pW : {
        type:String,
        required: true
    },
    intended_ID : {

    },
    sent : {

    },
    w8nApproval:{

    },
    aD_ID:{

    },
    sent_AD : {

    },
    w8nApproval_AD:{

    },
    event_ID:{

    },
    sent_Event : {

    },
    w8nApproval_Event:{

    }
});

var Dropdown = mongoose.model('Dropdowns',{
    iD:{
      type: String
    },
    department:{

    },
    year:{

    }
});

var Authority = mongoose.model('Authority',{
    range:{
        type:String
    },
    authorizer:{
        type:String
    }
});


// var drop= new Dropdown({
//     iD: "noticeSelection",
//     department: {"CSE" : ["2016"]},
//     year:{"2016" : ["CSE"]}
//
// });
//
// drop.save();


// var Dean=new Authority({
//     range:'All',
//     authorizer:'0000000'
// });
//
// Dean.save();
//
// var CSEHoD=new Authority({
//     range:'CSE',
//     authorizer:'CSE0000'
// });
//
// CSEHoD.save();

const publicPath = path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

var today;



checkForExpirations();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User');

    socket.on('disconnect',()=>{
       console.log('User disconnected');
    });

    socket.on(('createMessage'),(message)=>{
        console.log('createMessage',message);
    });


    //Regular Notice Creation
    socket.on('createNotice',(newRegNotice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        var newNotice=new Notice({
            title:newRegNotice.title,
            state:"new",
            type:"Notice",
            content: newRegNotice.content,
            sender: newRegNotice.sender,
            receivers: newRegNotice.receivers
        });

        newNotice.save().then((doc)=>{
            //console.log(newRegNotice.senderID,newRegNotice.approver);
            updateUseronCreate(newRegNotice.receivers,doc._id);
            updateSenderonCreate(newRegNotice.senderID,doc._id);
            console.log(newRegNotice.approver);
            updateApproveronCreate(newRegNotice.approver,doc._id);
        },(e)=>{
            return console.log('Unable to insert - createNotice',e);
        });

        //mongoose.connection.close();

    });

    //Temporary Notice Creation
    socket.on('createTempNotice',(newRegNotice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);
        var newNotice=new Notice({
            title:newRegNotice.title,
            state:"new",
            type:"Temporary",
            content: newRegNotice.content,
            sender: newRegNotice.sender,
            receivers: newRegNotice.receivers,
            exDate: endDate
        });

        newNotice.save().then((doc)=>{
            //console.log(newRegNotice.senderID,newRegNotice.approver);
            updateUseronCreate(newRegNotice.receivers,doc._id);
            updateSenderonCreate(newRegNotice.senderID,doc._id);
            console.log(newRegNotice.approver);
            updateApproveronCreate(newRegNotice.approver,doc._id);
        },(e)=>{
            return console.log('Unable to insert - createNotice',e);
        });

        //mongoose.connection.close();

    });

    //Advertisement Creation
    socket.on('createAD',(newADNotice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        var newAD=new Advertisement({
            title:newADNotice.title,
            state:"new",
            type:"Advertisement",
            content: newADNotice.content,
            sender: newADNotice.sender,
            receivers: newADNotice.receivers,
            exDate:newADNotice.exDate
        });

        newAD.save().then((doc)=>{
            updateUseronADCreate(newADNotice.receivers,doc._id);
            updateSenderonADCreate(newADNotice.senderID,doc._id);
            updateApproveronADCreate(newADNotice.approver,doc._id);
        },(e)=>{
            return console.log('Unable to insert - createAD',e);
        });

        //mongoose.connection.close();

    });

    //Event Creation
    socket.on('createEvent',(newEventNotice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        var newEvent=new Event({
            title:newEventNotice.title,
            state:"new",
            type:"Event",
            content: newEventNotice.content,
            sender: newEventNotice.sender,
            receivers: newEventNotice.receivers,
            exDate:newEventNotice.exDate
        });

        newEvent.save().then((doc)=>{
            updateUseronEventCreate(newEventNotice.receivers,doc._id);
            updateSenderonEventCreate(newEventNotice.senderID,doc._id);
            updateApproveronEventCreate(newEventNotice.approver,doc._id);
        },(e)=>{
            return console.log('Unable to insert - createAD',e);
        });

        //mongoose.connection.close();

    });


    // Notice browsing related
    socket.on('refreshNotices',(user)=>{
        checkForExpirations();
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        //console.log('run');
        User.findOne({iD:user.index}).then((docs)=>{
            //console.log('runA');
            socket.emit('loadNoticesList',{
                intended: docs.intended_ID,
                sent: docs.sent,
                aDs: docs.aD_ID,
                sentADs:docs.sent_AD,
                events: docs.event_ID,
                sentEvents:docs.sent_Event
                //type: docs.type
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices',err);
        });

        //mongoose.connection.close();
    });

    socket.on('getNotifics',(user)=>{
        checkForExpirations();
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        //console.log('run');
        User.findOne({iD:user.index}).then((docs)=>{
            var notis=0;
            var auths=0;
            if(docs.intended_ID.length>0) {
                // console.log(docs.intended_ID);
                for (var indx = 0; indx < docs.intended_ID.length; ++indx) {
                    if (docs.intended_ID[indx].read == true) {
                        Notice.findOne({_id: ObjectID(docs.intended_ID[indx].iD)}).then((docs2)=>{
                            if(docs2.state=="approved"){
                                //console.log(docs2);
                                notis += 1;
                            }
                        }, (err)=>{
                            console.log('Unable to find notice',err);
                        });
                    }
                }
            }

            if(docs.event_ID.length>0) {
                // console.log(docs.event_ID);
                for (var indx2 = 0; indx2 < docs.event_ID.length; ++indx2) {
                    if (docs.event_ID[indx2].read == true) {
                        Event.findOne({_id: ObjectID(docs.event_ID[indx].iD)}).then((docs2)=>{
                            if(docs2.state=="approved"){
                                //console.log(docs2);
                                notis += 1;
                            }
                        }, (err)=>{
                            console.log('Unable to find notice',err);
                        });
                    }
                }
            }

            if(docs.w8nApproval.length>0) {
                // console.log(docs.w8nApproval);
                for (var indx3 = 0; indx3 < docs.w8nApproval.length; ++indx3) {
                    if (docs.w8nApproval[indx3].read == true) {
                        Notice.findOne({_id: ObjectID(docs.w8nApproval[indx3].iD)}).then((docs2)=>{
                            if(docs2.state=="new"){
                                //console.log(docs2);
                                auths += 1;
                            }
                        }, (err)=>{
                            console.log('Unable to find notice',err);
                        });
                    }
                }
            }

            if(docs.w8nApproval_Event.length>0) {
                // console.log(docs.w8nApproval_Event);
                for (var indx4 = 0; indx4 < docs.w8nApproval_Event.length; ++indx4) {
                    if (docs.w8nApproval_Event[indx4].read == true) {
                        Event.findOne({_id: ObjectID(docs.w8nApproval_Event[indx4].iD)}).then((docs2)=>{
                            if(docs2.state=="new"){
                                //console.log(docs2);
                                auths += 1;
                            }
                        }, (err)=>{
                            console.log('Unable to find notice',err);
                        });
                    }
                }
            }

            if(docs.w8nApproval_AD.length>0) {
                // console.log(docs.w8nApproval_AD);
                for (var indx5 = 0; indx5 < docs.w8nApproval_AD.length; ++indx5) {
                    if (docs.w8nApproval_AD[indx5].read == true) {
                        Advertisement.findOne({_id: ObjectID(docs.w8nApproval_AD[indx5].iD)}).then((docs2)=>{
                            if(docs2.state=="new"){
                                //console.log(docs2);
                                auths += 1;
                            }
                        }, (err)=>{
                            console.log('Unable to find notice',err);
                        });
                    }
                }
            }

            function giveNotifics(){
                socket.emit('giveNotifics',{
                    notiNum:notis,
                    authNum:auths
                });
                console.log(notis,auths);
            }

            setTimeout(giveNotifics,2000);


            //console.log(notis,auths);
            }, (err)=>{
            console.log('Unable to find intended and sent notices',err);
        });

        //mongoose.connection.close();
    });

    //Refresh Authorizable
    socket.on('searchAuthNotices',(user)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        //console.log('run');
        User.findOne({iD:user.index}).then((docs)=>{
            //console.log('runA');
            socket.emit('searchAuthNoticesList',{
                intended: docs.intended_ID,
                sent: docs.sent,
                toApprove:docs.w8nApproval,
                aDs: docs.aD_ID,
                sentADs:docs.sent_AD,
                toApproveAD:docs.w8nApproval_AD,
                events: docs.event_ID,
                sentEvents:docs.sent_Event,
                toApproveEvent:docs.w8nApproval_Event,
                search:user.search
                //type: docs.type
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });

        //mongoose.connection.close();
    });

    // Notice browsing related
    socket.on('searchNotices',(user)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        //console.log('run');
        User.findOne({iD:user.index}).then((docs)=>{
            //console.log('runA');
            socket.emit('searchNoticesList',{
                intended: docs.intended_ID,
                sent: docs.sent,
                aDs: docs.aD_ID,
                sentADs:docs.sent_AD,
                events: docs.event_ID,
                sentEvents:docs.sent_Event,
                search:user.search
                //type: docs.type
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices',err);
        });

        //mongoose.connection.close();
    });

    //Refresh Authorizable
    socket.on('refreshAuthNotices',(user)=>{
        checkForExpirations();
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        //console.log('run');
        User.findOne({iD:user.index}).then((docs)=>{
            //console.log('runA');
            socket.emit('loadAuthNoticesList',{
                intended: docs.intended_ID,
                sent: docs.sent,
                toApprove:docs.w8nApproval,
                aDs: docs.aD_ID,
                sentADs:docs.sent_AD,
                toApproveAD:docs.w8nApproval_AD,
                events: docs.event_ID,
                sentEvents:docs.sent_Event,
                toApproveEvent:docs.w8nApproval_Event
                //type: docs.type
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });

        //mongoose.connection.close();
    });

    //Inbox General View Content Getter
    socket.on('getGenItem',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        if((notice.type=="Notice")||(notice.type=="Temporary")) {
            Notice.findOne({_id: ObjectID(notice.iD)}).then((docs) => {
                //var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveGenItem', {
                    content:docs.content
                });
            }, (err) => {
                console.log('Unable to find notice', err);
            });
        }
        else if((notice.type=="Advertisement")) {
            Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs) => {
                //var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveGenItem', {
                    content:docs.content
                });
            }, (err) => {
                console.log('Unable to find notice', err);
            });
        }
        else if((notice.type=="Event")) {
            Event.findOne({_id: ObjectID(notice.iD)}).then((docs) => {
                //var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveGenItem', {
                    content:docs.content
                });
            }, (err) => {
                console.log('Unable to find notice', err);
            });
        }

        //mongoose.connection.close();
    });

    //Inbox list populator
    socket.on('getNDetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveNDetails',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                date:(dateN.toLocaleString()),
                state: docs.state,
                typeN: docs.type,
                read: notice.read
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

        //mongoose.connection.close();
    });


    //Search Inbox list populator
    socket.on('searchNDetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1)
            {
                socket.emit('giveNDetails', {
                    id: docs._id,
                    title: docs.title,
                    sender: docs.sender,
                    date: (dateN.toLocaleString()),
                    state: docs.state,
                    typeN: docs.type,
                    read: notice.read
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

        //mongoose.connection.close();
    });

    //Sent list populator
    socket.on('getSDetails',(notice)=>{
        //console.log("ABC");
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveSDetails',{
                id:docs._id,
                title:docs.title,
                date:(dateN.toLocaleString()),
                state: docs.state,
                typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

        //mongoose.connection.close();
    });

    //Search Sent list populator
    socket.on('searchSDetails',(notice)=>{
        //console.log("ABC");
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                socket.emit('giveSDetails', {
                    id: docs._id,
                    title: docs.title,
                    date: (dateN.toLocaleString()),
                    state: docs.state,
                    typeN: docs.type
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

        //mongoose.connection.close();
    });

    //Authoziation list populator
    socket.on('getADetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveADetails',{
                id:docs._id,
                title:docs.title,
                date:(dateN.toLocaleString()),
                typeN: docs.type,
                read: notice.read
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
        //mongoose.connection.close();

    });

    //Search Authoziation list populator
    socket.on('searchADetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=> {
            var dateN = dateFromObjectId(notice.iD);
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                socket.emit('giveADetails', {
                    id: docs._id,
                    title: docs.title,
                    date: (dateN.toLocaleString()),
                    typeN: docs.type,
                    read: notice.read
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
        //mongoose.connection.close();

    });

    //AD list populator
    socket.on('getADDetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            //console.log(docs.state,"a");
            var dateN =dateFromObjectId(notice.iD);
            if ((docs.state=="approved")||(docs.state=="new")) {
                //console.log(docs.state,"b");
                socket.emit('giveADDetails', {
                    id: docs._id,
                    date:(dateN.toLocaleString()),
                    typeN: docs.type,
                    exDate: docs.exDate
                });
            }
        }, (err)=>{
            console.log('Unable to find notice - getADDetails',err);
        });
        //mongoose.connection.close();

    });

    //Sent AD list populator
    socket.on('getADSDetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveADSDetails',{
                id:docs._id,
                title:docs.title,
                date:(dateN.toLocaleString()),
                state: docs.state,
                typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
        //mongoose.connection.close();
    });

    //Search Sent AD list populator
    socket.on('searchADSDetails',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=> {
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveADSDetails', {
                    id: docs._id,
                    title: docs.title,
                    date: (dateN.toLocaleString()),
                    state: docs.state,
                    typeN: docs.type
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
        //mongoose.connection.close();
    });

    //Authoziation AD list populator
    socket.on('getADADetails',(notice)=>{

        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveADADetails',{
                id:docs._id,
                title:docs.title,
                date:(dateN.toLocaleString()),
                typeN: docs.type,
                read: notice.read
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Search Authoziation AD list populator
    socket.on('searchADADetails',(notice)=>{
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=> {
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveADADetails', {
                    id: docs._id,
                    title: docs.title,
                    date: (dateN.toLocaleString()),
                    typeN: docs.type,
                    read: notice.read
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Inbox Event populator
    socket.on('getEventDetails',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveEventDetails',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                date:(dateN.toLocaleString()),
                state: docs.state,
                typeN: docs.type,
                exDate: docs.exDate,
                read: notice.read
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Search Inbox Event populator
    socket.on('searchEventDetails',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                var dateN =dateFromObjectId(notice.iD);
                socket.emit('giveEventDetails',{
                    id:docs._id,
                    title:docs.title,
                    sender:docs.sender,
                    date:(dateN.toLocaleString()),
                    state: docs.state,
                    typeN: docs.type,
                    read: notice.read
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Sent Event list populator
    socket.on('getEventSDetails',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveEventSDetails',{
                id:docs._id,
                title:docs.title,
                date:(dateN.toLocaleString()),
                state: docs.state,
                typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Search Sent Event list populator
    socket.on('searchEventSDetails',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=> {
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveEventSDetails', {
                    id: docs._id,
                    title: docs.title,
                    date: (dateN.toLocaleString()),
                    state: docs.state,
                    typeN: docs.type
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Authoziation Event list populator
    socket.on('getEventADetails',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveEventADetails',{
                id:docs._id,
                title:docs.title,
                date:(dateN.toLocaleString()),
                typeN: docs.type,
                read: notice.read
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Search Authoziation Event list populator
    socket.on('searchEventADetails',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=> {
            if((JSON.stringify(docs).toLowerCase().search(notice.search.toLowerCase()))!=-1){
                var dateN = dateFromObjectId(notice.iD);
                socket.emit('giveEventADetails', {
                    id: docs._id,
                    title: docs.title,
                    date: (dateN.toLocaleString()),
                    typeN: docs.type,
                    read: notice.read
                });
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Inbox detail obtainer
    socket.on('getNoticeDis',(notice)=>{
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveNoticeDis',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                date:dateN.toLocaleString(),
                content:docs.content,
                typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    socket.on('readNoticeDis',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        User.findOne({iD:notice.user}).then((docs)=>{
            for (var indx = 0; indx < docs.intended_ID.length; ++indx){
                var notce = docs.intended_ID[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(notice.iD).toString())&&(notce.read.toString()=="true")){
                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $pull:{
                            intended_ID: {iD:ObjectID(notice.iD),read:true}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });

                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $push:{
                            intended_ID: {iD:ObjectID(notice.iD),read:false}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });
                }

            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

    });

    socket.on('readAuthDis',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        User.findOne({iD:notice.user}).then((docs)=>{
            for (var indx = 0; indx < docs.w8nApproval.length; ++indx){
                var notce = docs.w8nApproval[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(notice.iD).toString())&&(notce.read.toString()=="true")){
                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $pull:{
                            w8nApproval: {iD:ObjectID(notice.iD),read:true}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });

                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $push:{
                            w8nApproval: {iD:ObjectID(notice.iD),read:false}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });
                }

            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

    });

    socket.on('readAuthADDis',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        User.findOne({iD:notice.user}).then((docs)=>{
            for (var indx = 0; indx < docs.w8nApproval_AD.length; ++indx){
                var notce = docs.w8nApproval_AD[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(notice.iD).toString())&&(notce.read.toString()=="true")){
                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $pull:{
                            w8nApproval_AD: {iD:ObjectID(notice.iD),read:true}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });

                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $push:{
                            w8nApproval_AD: {iD:ObjectID(notice.iD),read:false}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });
                }

            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

    });

    socket.on('readEventDis',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        User.findOne({iD:notice.user}).then((docs)=>{
            for (var indx = 0; indx < docs.event_ID.length; ++indx){
                var notce = docs.event_ID[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(notice.iD).toString())&&(notce.read.toString()=="true")){
                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $pull:{
                            event_ID: {iD:ObjectID(notice.iD),read:true}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });

                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $push:{
                            event_ID: {iD:ObjectID(notice.iD),read:false}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });
                }

            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

    });

    socket.on('readAuthEventDis',(notice)=>{
        //mongoose.connect('mongodb://localhost:27017/NoticesDB');
        User.findOne({iD:notice.user}).then((docs)=>{
            for (var indx = 0; indx < docs.w8nApproval_Event.length; ++indx){
                var notce = docs.w8nApproval_Event[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(notice.iD).toString())&&(notce.read.toString()=="true")){
                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $pull:{
                            w8nApproval_Event: {iD:ObjectID(notice.iD),read:true}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });

                    User.findOneAndUpdate({
                        iD:notice.user,
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    },{
                        $push:{
                            w8nApproval_Event: {iD:ObjectID(notice.iD),read:false}
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('updateApproveronCreate Error', e);
                        }
                    });
                }

            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

    });

    //Sent detail obtainer(Also used for obtaining Authorizing Details)
    socket.on('getSentDis',(notice)=>{
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveSentDis',{
                id:docs._id,
                title:docs.title,
                receivers:docs.receivers,
                date:dateN.toLocaleString(),
                content:docs.content,
                typeN: docs.type,
                state:docs.state
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Advertisement content obtainer
    socket.on('getADDis',(notice)=>{
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            socket.emit('giveADDis',{
                content:docs.content,
                indxAD:notice.ind//,
                //typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Advertisement Event content obtainer
    socket.on('getEventADDis',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            socket.emit('giveADDis',{
                content:docs.content,
                indxAD:notice.ind//,
                //typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Sent AD detail obtainer(Also used for obtaining Authorizing AD Details)
    socket.on('getSentADDis',(notice)=>{
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveSentDis',{
                id:docs._id,
                title:docs.title,
                receivers:docs.receivers,
                date:dateN.toLocaleString(),
                content:docs.content,
                typeN: docs.type,
                state:docs.state
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Inbox detail obtainer for Events
    socket.on('getEventDis',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveNoticeDis',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                date:dateN.toLocaleString(),
                content:docs.content,
                typeN: docs.type
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Sent detail obtainer(Also used for obtaining Authorizing Details)
    socket.on('getSentEventDis',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            var dateN =dateFromObjectId(notice.iD);
            socket.emit('giveSentDis',{
                id:docs._id,
                title:docs.title,
                receivers:docs.receivers,
                date:dateN.toLocaleString(),
                content:docs.content,
                typeN: docs.type,
                state:docs.state
            });
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Authorize notice
    socket.on('authApprove',(notice)=>{
        Notice.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"approved"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update notice', e);
            }
        });
    });

    //Disapprove notice
    socket.on('authDisapprove',(notice)=>{
        Notice.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"disapproved"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update notice', e);
            }
        });
    });

    //Authorize AD
    socket.on('authADApprove',(notice)=>{
        Advertisement.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"approved"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update AD', e);
            }
        });
    });

    //Disapprove AD
    socket.on('authADDisapprove',(notice)=>{
        Advertisement.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"disapproved"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update AD', e);
            }
        });
    });

    //Authorize Event
    socket.on('authEventApprove',(notice)=>{
        Event.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"approved"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update Event', e);
            }
        });
    });

    //Disapprove Event
    socket.on('authEventDisapprove',(notice)=>{
        Event.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"disapproved"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update Event', e);
            }
        });
    });

    //Remove Notice
    socket.on('removeSentNotice',(notice)=>{
        Notice.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"removed"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update notice', e);
            }
        });
    });

    //Remove AD
    socket.on('removeSentAD',(notice)=>{
        Advertisement.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"removed"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update notice', e);
            }
        });
    });

    //Remove Event
    socket.on('removeSentEvent',(notice)=>{
        Event.findOneAndUpdate({
            _id:ObjectID(notice.iD)
        },{
            $set:{
                state:"removed"
            }
        },{
            overwrite:true
        },(e)=>{
            if(e) {
                console.log('Unable to update Event', e);
            }
        });
    });

    //Remove Authorization handled notice
    socket.on('removeNoticeAprvl',(item)=>{
        // User.findOneAndUpdate({
        //     iD:item.iD
        // },{
        //     $pull:{
        //         w8nApproval: ObjectID(item.noticeiD)
        //     }
        // },{
        //     overwrite:true
        // },(e)=>{
        //     if(e) {
        //         console.log('Unable to remove auth notice', e);
        //     }
        // });

        User.findOne({iD:item.iD}).then((docs)=>{
            for (var indx = 0; indx < docs.w8nApproval.length; ++indx){
                var notce = docs.w8nApproval[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(item.noticeiD).toString())&&(notce.read.toString()=="true")) {
                    User.findOneAndUpdate({
                        iD: item.iD
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    }, {
                        $pull: {
                            w8nApproval: {iD: ObjectID(item.noticeiD), read: true}
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to remove auth notice', e);
                        }
                    });
                }

                else if((notce.iD.toString()==ObjectID(item.noticeiD).toString())&&(notce.read.toString()=="false")) {
                    User.findOneAndUpdate({
                        iD: item.iD
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    }, {
                        $pull: {
                            w8nApproval: {iD: ObjectID(item.noticeiD), read: false}
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to remove auth notice', e);
                        }
                    });
                }
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Remove Authorization handled AD
    socket.on('removeADAprvl',(item)=>{
        // User.findOneAndUpdate({
        //     iD:item.iD
        // },{
        //     $pull:{
        //         w8nApproval_AD: ObjectID(item.noticeiD)
        //     }
        // },{
        //     overwrite:true
        // },(e)=>{
        //     if(e) {
        //         console.log('Unable to remove auth notice', e);
        //     }
        // });
        User.findOne({iD:item.iD}).then((docs)=>{
            for (var indx = 0; indx < docs.w8nApproval_AD.length; ++indx){
                var notce = docs.w8nApproval_AD[indx];
                //console.log(notce.iD.toString(),ObjectID(docs.iD).toString());
                if((notce.iD.toString()==ObjectID(item.noticeiD).toString())&&(notce.read.toString()=="true")) {
                    User.findOneAndUpdate({
                        iD: item.iD
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    }, {
                        $pull: {
                            w8nApproval_AD: {iD: ObjectID(item.noticeiD), read: true}
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to remove auth notice', e);
                        }
                    });
                }

                else if((notce.iD.toString()==ObjectID(item.noticeiD).toString())&&(notce.read.toString()=="false")) {
                    User.findOneAndUpdate({
                        iD: item.iD
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    }, {
                        $pull: {
                            w8nApproval_AD: {iD: ObjectID(item.noticeiD), read: false}
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to remove auth notice', e);
                        }
                    });
                }
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });
    });

    //Remove Authorization handled Event
    socket.on('removeEventAprvl',(item)=>{
        // User.findOneAndUpdate({
        //     iD:item.iD
        // },{
        //     $pull:{
        //         w8nApproval_Event: ObjectID(item.noticeiD)
        //     }
        // },{
        //     overwrite:true
        // },(e)=>{
        //     if(e) {
        //         console.log('Unable to remove auth notice', e);
        //     }
        // });
        User.findOne({iD:item.iD}).then((docs)=>{
            for (var indx = 0; indx < docs.w8nApproval_Event.length; ++indx){
                var notce = docs.w8nApproval_Event[indx];
                //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
                if((notce.iD.toString()==ObjectID(item.noticeiD).toString())&&(notce.read.toString()=="true")) {
                    User.findOneAndUpdate({
                        iD: item.iD
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    }, {
                        $pull: {
                            w8nApproval_Event: {iD: ObjectID(item.noticeiD), read: true}
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to remove auth notice', e);
                        }
                    });
                }

                else if((notce.iD.toString()==ObjectID(item.noticeiD).toString())&&(notce.read.toString()=="false")) {
                    User.findOneAndUpdate({
                        iD: item.iD
                        // 'intended_ID.iD': ObjectID(notice.iD)
                    }, {
                        $pull: {
                            w8nApproval_Event: {iD: ObjectID(item.noticeiD), read: false}
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to remove auth notice', e);
                        }
                    });
                }
            }
        }, (err)=>{
            console.log('Unable to find notice',err);
        });

    });

    //Get Creator for new notice
    socket.on('getNCreator',(user)=>{
        User.findOne({iD:user.index}).then((docs)=>{
            socket.emit('giveNCreator',{
                name: docs.name,
                typeO: docs.type,
                batch:docs.batch
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });
    });

    // //Notice Creation Target Loaders
    // socket.on('loadAllUsers',(user)=>{
    //     User.find().then((docs)=>{
    //         socket.emit('giveAllUsers',
    //             docs
    //         );
    //     }, (err)=>{
    //         console.log('Unable to find intended and sent notices -Authorizable',err);
    //     });
    // });

    //Notice Creation Target Loaders
    socket.on('loadAllUsers',(user)=>{
        User.find().then((docs)=>{
            Authority.findOne({range:"All"}).then((doc)=>{
                socket.emit('giveAllUsers',{
                    users:docs,
                    authorizer:doc.authorizer
                });
            }, (err)=>{
                console.log('Unable to find intended and sent notices -Authorizable',err);
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });
    });

    //Load by Department
    socket.on('loadUsersDept',(dept)=>{
        User.find({'batch.department':dept}).then((docs)=>{
            //console.log(docs);
            Authority.findOne({range:dept}).then((doc)=>{
                socket.emit('giveAllUsers',{
                    users:docs,
                    authorizer:doc.authorizer
                });
            }, (err)=>{
                console.log('Unable to find intended and sent notices -Authorizable',err);
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });
    });

    //Load by Batch
    socket.on('loadUsersBatch',(batch)=>{
        User.find({'batch.year':batch}).then((docs)=>{
            Authority.findOne({range:"All"}).then((doc)=>{
                socket.emit('giveAllUsers',{
                    users:docs,
                    authorizer:doc.authorizer
                });
            }, (err)=>{
                console.log('Unable to find intended and sent notices -Authorizable',err);
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });
    });

    //Load by Department and Batch
    socket.on('loadUsersDept&Batch',(trgt)=>{
        //console.log(trgt);
        User.find({'batch.department':trgt.dept,'batch.year':trgt.yar}).then((docs)=>{
            Authority.findOne({range:trgt.dept}).then((doc)=>{
                socket.emit('giveAllUsers',{
                    users:docs,
                    authorizer:doc.authorizer
                });
            }, (err)=>{
                console.log('Unable to find intended and sent notices -Authorizable',err);
            });
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });
    });

    //Notice Creation Target List Loader
    socket.on('getSelectionLst',(list)=>{
        Dropdown.findOne({iD:list.iD}).then((docs)=>{
            socket.emit('giveSelectionList', {
                departments: docs.department,
                years: docs.year
            });
        }, (err)=>{
            console.log('Unable to find dropdown selections',err);
        });
    });

    //Get details for editing a notice
    socket.on('getEditNotice',(notice)=>{
        Notice.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            socket.emit('giveEditDetails',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                content: docs.content,
                receivers: docs.receivers,
                state:docs.state
            });

        }, (err)=>{
            console.log('Unable to find data to edit notice -Authorizable',err);
        });
    });

    //Edit Notice
    socket.on('editNotice',(editRegNotice)=>{
        Notice.findOneAndUpdate({
            _id:ObjectID(editRegNotice.iD)
        },{
            $set:{
                title: editRegNotice.title,
                content: editRegNotice.content,
                state:"new"
            }
        },{
            overwrite:true
        },(e,doc)=>{
            if(editRegNotice.state!="new") {
                updateApproveronCreate(doc.approver, doc._id);
            }
            if(e) {
                console.log('Unable to remove auth notice', e);
            }
        });
    });

    //Get details for editing a AD
    socket.on('getEditAD',(notice)=>{
        Advertisement.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            socket.emit('giveEditADDetails',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                content: docs.content,
                receivers: docs.receivers,
                exDate:docs.exDate,
                state:docs.state
            });

        }, (err)=>{
            console.log('Unable to find data to edit notice -Authorizable',err);
        });
    });

    //Edit AD
    socket.on('editAD',(editRegNotice)=>{
        console.log("editAD");
        Advertisement.findOneAndUpdate({
            _id:ObjectID(editRegNotice.iD)
        },{
            $set:{
                title: editRegNotice.title,
                content: editRegNotice.content,
                state:"new",
                exDate:editRegNotice.exDate
            }
        },{
            overwrite:true
        },(e,doc)=>{
            if(editRegNotice.state!="new") {
                updateApproveronCreate(doc.approver, doc._id);
            }
            if(e) {
                console.log('Unable to remove auth notice', e);
            }
        });
    });

    //Get details for editing a Event
    socket.on('getEditEvent',(notice)=>{
        Event.findOne({_id: ObjectID(notice.iD)}).then((docs)=>{
            socket.emit('giveEditEventDetails',{
                id:docs._id,
                title:docs.title,
                sender:docs.sender,
                content: docs.content,
                receivers: docs.receivers,
                exDate:docs.exDate,
                state:docs.state
            });

        }, (err)=>{
            console.log('Unable to find data to edit notice -EventEdit',err);
        });
    });

    //Edit Event
    socket.on('editEvent',(editRegNotice)=>{
        console.log("editEvent");
        Event.findOneAndUpdate({
            _id:ObjectID(editRegNotice.iD)
        },{
            $set:{
                title: editRegNotice.title,
                content: editRegNotice.content,
                state:"new",
                exDate:editRegNotice.exDate
            }
        },{
            overwrite:true
        },(e,doc)=>{
            if(editRegNotice.state!="new") {
                updateApproveronCreate(doc.approver, doc._id);
            }
            if(e) {
                console.log('Unable to edit notice -EventEdit', e);
            }
        });
    });
});

server.listen(port,()=>{
    console.log('Server is up');
}) ;

function updateUseronCreate(receivers,noticeID) {
    for (var indx1 = 0; indx1 < receivers.length; ++indx1) {
        var recei=receivers[indx1];
        updateSeparteUsers(recei,noticeID);
    }

}

function updateSeparteUsers(recei,noticeID) {
    //console.log(recei,ObjectID(noticeID),'updateSeparteUsers');
    User.findOneAndUpdate({
        iD:recei
    },{
        $push:{
            intended_ID: {iD:ObjectID(noticeID),read:true}
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('Unable to remove auth notice', e);
        }
    });
}

function updateUseronADCreate(receivers,noticeID) {
    for (var indx1 = 0; indx1 < receivers.length; ++indx1) {
        var recei=receivers[indx1];
        updateADSeparteUsers(recei,noticeID);
    }

}

function updateADSeparteUsers(recei,noticeID) {
    //console.log(recei,ObjectID(noticeID),'updateADSeparteUsers');
    User.findOneAndUpdate({
        iD:recei
    },{
        $push:{
            aD_ID: ObjectID(noticeID)
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateADSeparteUsers Error', e);
        }
    });
}

function updateUseronEventCreate(receivers,noticeID) {
    for (var indx1 = 0; indx1 < receivers.length; ++indx1) {
        var recei=receivers[indx1];
        updateEventSeparteUsers(recei,noticeID);
    }

}

function updateEventSeparteUsers(recei,noticeID) {
    //console.log(recei,ObjectID(noticeID),'updateADSeparteUsers');
    User.findOneAndUpdate({
        iD:recei
    },{
        $push:{
            event_ID: {iD:ObjectID(noticeID),read:true}
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateADSeparteUsers Error', e);
        }
    });
}

function updateSenderonCreate(senderID,noticeID) {
    //console.log(senderID,ObjectID(noticeID),'updateSenderonCreate');
    User.findOneAndUpdate({
        iD:senderID
    },{
        $push:{
            sent: ObjectID(noticeID)
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateSenderonCreate Error', e);
        }
    });
}

function updateSenderonADCreate(senderID,noticeID) {
    //console.log(senderID,ObjectID(noticeID),'updateSenderonCreate');
    User.findOneAndUpdate({
        iD:senderID
    },{
        $push:{
            sent_AD: ObjectID(noticeID)
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateSenderonCreate Error', e);
        }
    });
}

function updateSenderonEventCreate(senderID,noticeID) {
    //console.log(senderID,ObjectID(noticeID),'updateSenderonCreate');
    User.findOneAndUpdate({
        iD:senderID
    },{
        $push:{
            sent_Event: ObjectID(noticeID)
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateSenderonCreate Error', e);
        }
    });
}


function updateApproveronCreate(approverID,noticeID) {
    //console.log(approverID,ObjectID(noticeID),'updateApproveronCreate');
    User.findOneAndUpdate({
        iD:approverID
    },{
        $push:{
            w8nApproval: {iD:ObjectID(noticeID),read:true}
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateApproveronCreate Error', e);
        }
    });
}

function updateApproveronADCreate(approverID,noticeID) {
    //console.log(approverID,ObjectID(noticeID),'updateApproveronCreate');
    User.findOneAndUpdate({
        iD:approverID
    },{
        $push:{
            w8nApproval_AD: {iD:ObjectID(noticeID),read:true}
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateApproveronCreate Error', e);
        }
    });
}

function updateApproveronEventCreate(approverID,noticeID) {
    //console.log(approverID,ObjectID(noticeID),'updateApproveronCreate');
    User.findOneAndUpdate({
        iD:approverID
    },{
        $push:{
            w8nApproval_Event: {iD:ObjectID(noticeID),read:true}
        }
    },{
        overwrite:true
    },(e)=>{
        if(e) {
            console.log('updateApproveronCreate Error', e);
        }
    });
}


function checkForExpirations() {
    var nowDate = Date.parse(new Date());
    if(today!=nowDate){
        //console.log("Just started");
        today=nowDate;
        //console.log(today);
        Notice.find().then((docs)=>{
            for (var indx = 0; indx < docs.length; ++indx) {
                var chDate = Date.parse(docs[indx].exDate);
                if ((chDate.toString()!="NaN")&&(today>chDate)&&(docs[indx].state!="expired")){
                    console.log(docs[indx]._id,'Notice');
                    Notice.findOneAndUpdate({
                        _id:docs[indx]._id
                    },{
                        $set:{
                            state:"expired"
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('Unable to update notice', e);
                        }
                    });
                }
                //console.log(Date.parse(docs[indx].exDate));
            }

        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });

        Advertisement.find().then((docs)=>{
            for (var indx = 0; indx < docs.length; ++indx) {
                var chDate = Date.parse(docs[indx].exDate);
                if ((chDate.toString()!="NaN")&&(today>chDate)&&(docs[indx].state!="expired")){
                    console.log(docs[indx]._id,'AD');
                    Advertisement.findOneAndUpdate({
                        _id:docs[indx]._id
                    },{
                        $set:{
                            state:"expired"
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('Unable to update notice', e);
                        }
                    });
                }
                //console.log(Date.parse(docs[indx].exDate));
            }
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });

        Event.find().then((docs)=>{
            for (var indx = 0; indx < docs.length; ++indx) {
                var chDate = Date.parse(docs[indx].exDate);
                if ((chDate.toString()!="NaN")&&(today>chDate)&&(docs[indx].state!="expired")){
                    console.log(docs[indx]._id,'Event');
                    Event.findOneAndUpdate({
                        _id:docs[indx]._id
                    },{
                        $set:{
                            state:"expired"
                        }
                    },{
                        overwrite:true
                    },(e)=>{
                        if(e) {
                            console.log('Unable to update notice', e);
                        }
                    });
                }
                //console.log(Date.parse(docs[indx].exDate));
            }
        }, (err)=>{
            console.log('Unable to find intended and sent notices -Authorizable',err);
        });
    }
    else {
        console.log("Still the same day");
    }
}

