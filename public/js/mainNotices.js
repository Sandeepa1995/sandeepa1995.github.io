// /**
//  * Created by Damitha on 6/27/2017.
//  */
// // Get the modal
var modal = document.getElementById('newTypeModal');
// var numNot=0;
var indNum=0;
var indSent=0;
var indAuth=0;
var indAD=0;
var indADSent=0;
var indADAuth=0;
var indEvent=0;
var indEventSent=0;
var indEventAuth=0;
var indGenView=0;
var isgenView=false;
var intervalScope;

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


var arrayDetailNotices=[];
var arraySentNotices=[];
var arrayAuthNotices=[];
var arrayADNotices=[];
var arraySentADs=[];
var arrayAuthADs=[];
var arrayDetailEvents=[];
var arraySentEvents=[];
var arrayAuthEvents=[];
var arrayGenView=[];


function doNew() {
    if (document.getElementById("nTRBReg").checked)
    {
        location.href='crtRegular.html';
    }
    else if(document.getElementById("nTRBTemp").checked)
    {
        location.href='crtTemporary.html';
    }
    else if(document.getElementById("nTRBEvent").checked)
    {
        location.href='crtEvent.html';
    }
    else if(document.getElementById("nTRBAD").checked)
    {
        location.href='crtAdvertisement.html';
    }
}

// function loadList() {
//     var noticeItem =
//         <div class="item"> <div id="quillEdit">
//                 <h1 align="center"><u>Notice</u></h1><br>
//                 <p align="center">Main <strong>content</strong> of the intended notice</p><br><br>
//             <p align="right">Sender</p>
//                 <p><br></p>
//                 </div>
//
//                 <script>
//                 var quill = new Quill('#quillEdit', {
//                 modules : {
//                     toolbar: "false"
//                 },
//
//                 theme:'snow'
//                 });
//                 quill.enable(false);
//
//                 </script>
//         </div>;
//     document.getElementById("#carNotice").innerHTML+=noticeItem;
//
// }

// function loadList() {
//     var noticeItem = document.createElement("DIV");
//     noticeItem.setAttribute("class","item");
//     var noticeItemSub = document.createElement("DIV");
//     var notID = "quillEdit"+numNot.toString();
//     numNot+=1;
//     noticeItem.setAttribute("id",notID);
//     noticeItemSub.innerHTML = '<h1 align="center"><u>Notice</u></h1><br> <p align="center">Main <strong>content</strong> of the intended notice</p><br><br><p align="right">Sender</p><p><br></p>';
//     var quill = new Quill('#'+notID, {
//         modules : {
//             toolbar: "false"
//         },
//         theme:'snow'
//     });
//     quill.enable(false);
//     noticeItem.appendChild(noticeItemSub);
//     $("#carNotice").append(noticeItem);
// }

var socket=io();
socket.emit('getNCreator',{
    index:loggedID
});

socket.on('connect',function(){
    console.log('Connected aaa');
    // loadList();
});

function showPage() {
    document.getElementById("loaderDiv").style.display = "none";
    document.getElementById("showDiv").style.display = "block";
}

function showSearchPage() {
    document.getElementById("loaderDiv").style.display = "none";
    document.getElementById("showDiv").style.display = "block";
    document.getElementById("searchDiv").style.display="block";
}

function  refresh() {
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";

    arrayDetailNotices=[];
    indNum=0;
    document.getElementById("noticeDetailTable").innerHTML="";

    arraySentNotices=[];
    indSent=0;
    document.getElementById("sentDetailTable").innerHTML="";

    arrayAuthNotices=[];
    indAuth=0;
    document.getElementById("authDetailTable").innerHTML="";

    arrayADNotices=[];
    indAD=0;

    arraySentADs=[];
    indADSent=0;

    arrayAuthADs=[];
    indADAuth=0;

    arrayDetailEvents=[];
    indEvent=0;

    arraySentEvents=[];
    indEventSent=0;

    arrayAuthEvents=[];
    indEventAuth=0;

    arrayGenView=[];

    if(loggedID=="0000000"){
        socket.emit('refreshAuthNotices',{
            index:loggedID
        });
        // socket.emit('refreshADs',{
        //     index:loggedID
        // });
    }else{
        socket.emit('refreshNotices',{
            index:loggedID
        });
        // socket.emit('refreshADs',{
        //     index:loggedID
        // });
    }
    setTimeout(loadADs,500);
    setTimeout(sortBoth,500);
    setTimeout(sortGenView,500);
    setTimeout(showPage,600);
}

function sortGenView() {
    arrayGenView.sort(function(a,b){
        return new Date(a[0]) - new Date(b[0]);
    });
    console.log(arrayGenView);
}

socket.on('giveGenItem',(noticeDetails)=>{
    quillGenView.setContents(noticeDetails.content);
    //console.log((-((document.getElementById("quillGenView").offsetHeight)/2)));
    //console.log(document.getElementById("quillGenView").style.magrginTop);
    // setTimeout(document.getElementById("quillGenView").style.magrginTop= (-((document.getElementById("quillGenView").offsetHeight)/2)).toString(),100);
    //setTimeout(somminee,200);

    // setTimeout(console.log(document.getElementById("quillGenView").style.magrginTop),100);
});

function somminee() {
    document.getElementById("quillGenView").style.magrginTop= "-100px";
}

function genViewFunc() {
    indGenView=0;
    isgenView=true;
    getGenItem();
    intervalScope=setInterval(getGenItem, 15000);

    function getGenItem() {
        // if(!isgenView){
        //     clearInterval(intervalScope);
        //     console.log("Interval cleared")
        // }
        if (indGenView==arrayGenView.length){
            indGenView=0;
        }
        console.log(indGenView);
        socket.emit('getGenItem', {
            iD: arrayGenView[indGenView%arrayGenView.length][1],
            type: arrayGenView[indGenView%arrayGenView.length][2]
        });
        indGenView+=1;

    }

}

function genViewReset() {
    // isgenView=false;
    clearInterval(intervalScope);
}


socket.on('giveNCreator',(user)=>{
    if(user.typeO!="Student"){
        document.getElementById("createNewButton").setAttribute("style","display:block");
        if(user.typeO=="Dean"){
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(user.typeO=="HoD"){
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(user.typeO=="Reception"){
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(user.typeO=="Lecturer"){
            document.getElementById("nTRBAD").setAttribute("style","display:none");
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(user.typeO=="Rep"){
            document.getElementById("nTRBTemp").setAttribute("checked","checked");
            document.getElementById("nTRBReg").setAttribute("style","display:block");
            document.getElementById("nTRBAD").setAttribute("style","display:none");
            document.getElementById("nTRBEvent").setAttribute("style","display:none");
        }
    }

});

socket.on('loadNoticesList',function(noticeList){
    if(noticeList.intended!=undefined) {
        for (var indx = 0; indx < noticeList.intended.length; ++indx) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getNDetails', {
                iD: noticeList.intended[indx]
            });
        }
    }

    if(noticeList.sent!=undefined) {
        for (var indx2 = 0; indx2 < noticeList.sent.length; ++indx2) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getSDetails', {
                iD: noticeList.sent[indx2]
            });
        }
    }

    if(noticeList.aDs!=undefined) {
        for (var indx4 = 0; indx4 < noticeList.aDs.length; ++indx4) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getADDetails', {
                iD: noticeList.aDs[indx4]
            });
        }
    }

    if(noticeList.sentADs!=undefined) {
        for (var indx5 = 0; indx5 < noticeList.sentADs.length; ++indx5) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getADSDetails', {
                iD: noticeList.sentADs[indx5]
            });
        }
    }

    if(noticeList.events!=undefined) {
        for (var indx7 = 0; indx7 < noticeList.events.length; ++indx7) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getEventDetails', {
                iD: noticeList.events[indx7]
            });
        }
    }

    if(noticeList.sentEvents!=undefined) {
        for (var indx8 = 0; indx8 < noticeList.sentEvents.length; ++indx8) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getEventSDetails', {
                iD: noticeList.sentEvents[indx8]
            });
        }
    }

});

socket.on('searchNoticesList',function(noticeList){
    if(noticeList.intended!=undefined) {
        for (var indx = 0; indx < noticeList.intended.length; ++indx) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchNDetails', {
                iD: noticeList.intended[indx],
                search: noticeList.search
            });
        }
    }

    if(noticeList.sent!=undefined) {
        for (var indx2 = 0; indx2 < noticeList.sent.length; ++indx2) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchSDetails', {
                iD: noticeList.sent[indx2],
                search: noticeList.search
            });
        }
    }

    if(noticeList.aDs!=undefined) {
        for (var indx4 = 0; indx4 < noticeList.aDs.length; ++indx4) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchADDetails', {
                iD: noticeList.aDs[indx4],
                search: noticeList.search
            });
        }
    }

    if(noticeList.sentADs!=undefined) {
        for (var indx5 = 0; indx5 < noticeList.sentADs.length; ++indx5) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchADSDetails', {
                iD: noticeList.sentADs[indx5],
                search: noticeList.search
            });
        }
    }

    if(noticeList.events!=undefined) {
        for (var indx7 = 0; indx7 < noticeList.events.length; ++indx7) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchEventDetails', {
                iD: noticeList.events[indx7],
                search: noticeList.search
            });
        }
    }

    if(noticeList.sentEvents!=undefined) {
        for (var indx8 = 0; indx8 < noticeList.sentEvents.length; ++indx8) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchEventSDetails', {
                iD: noticeList.sentEvents[indx8],
                search: noticeList.search
            });
        }
    }

});

// socket.on('loadADList',function(noticeList){
//     for (var indx = 0; indx < noticeList.aDs.length; ++indx) {
//         //console.log(noticeList.intended[indx]);
//         socket.emit('getADDetails', {
//             iD: noticeList.aDs[indx]
//         });
//     }
// });

socket.on('loadAuthNoticesList',function(noticeList){
    //console.log(noticeList.toApprove);
    if(noticeList.intended!=undefined) {
        for (var indx = 0; indx < noticeList.intended.length; ++indx) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getNDetails', {
                iD: noticeList.intended[indx]
            });
        }
    }

    if(noticeList.sent!=undefined) {
        for (var indx2 = 0; indx2 < noticeList.sent.length; ++indx2) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getSDetails', {
                iD: noticeList.sent[indx2]
            });
        }
    }

    if(noticeList.toApprove!=undefined) {
        for (var indx3 = 0; indx3 < noticeList.toApprove.length; ++indx3) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('getADetails', {
                iD: noticeList.toApprove[indx3]
            });
        }
    }

    if(noticeList.aDs!=undefined) {
        for (var indx4 = 0; indx4 < noticeList.aDs.length; ++indx4) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getADDetails', {
                iD: noticeList.aDs[indx4]
            });
        }
    }

    if(noticeList.sentADs!=undefined) {
        for (var indx5 = 0; indx5 < noticeList.sentADs.length; ++indx5) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getADSDetails', {
                iD: noticeList.sentADs[indx5]
            });
        }
    }

    if(noticeList.toApproveAD!=undefined) {
        for (var indx6 = 0; indx6 < noticeList.toApproveAD.length; ++indx6) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('getADADetails', {
                iD: noticeList.toApproveAD[indx6]
            });
        }
    }

    if(noticeList.events!=undefined) {
        for (var indx7 = 0; indx7 < noticeList.events.length; ++indx7) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getEventDetails', {
                iD: noticeList.events[indx7]
            });
        }
    }

    if(noticeList.sentEvents!=undefined) {
        for (var indx8 = 0; indx8 < noticeList.sentEvents.length; ++indx8) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getEventSDetails', {
                iD: noticeList.sentEvents[indx8]
            });
        }
    }

    if(noticeList.toApproveEvent!=undefined) {
        for (var indx9 = 0; indx9 < noticeList.toApproveEvent.length; ++indx9) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('getEventADetails', {
                iD: noticeList.toApproveEvent[indx9]
            });
        }
    }
});

socket.on('searchAuthNoticesList',function(noticeList){
    //console.log(noticeList.toApprove);
    if(noticeList.intended!=undefined) {
        for (var indx = 0; indx < noticeList.intended.length; ++indx) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchNDetails', {
                iD: noticeList.intended[indx],
                search: noticeList.search
            });
        }
    }

    if(noticeList.sent!=undefined) {
        for (var indx2 = 0; indx2 < noticeList.sent.length; ++indx2) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchSDetails', {
                iD: noticeList.sent[indx2],
                search: noticeList.search
            });
        }
    }

    if(noticeList.toApprove!=undefined) {
        for (var indx3 = 0; indx3 < noticeList.toApprove.length; ++indx3) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('searchADetails', {
                iD: noticeList.toApprove[indx3],
                search: noticeList.search
            });
        }
    }

    if(noticeList.aDs!=undefined) {
        for (var indx4 = 0; indx4 < noticeList.aDs.length; ++indx4) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchADDetails', {
                iD: noticeList.aDs[indx4],
                search: noticeList.search
            });
        }
    }

    if(noticeList.sentADs!=undefined) {
        for (var indx5 = 0; indx5 < noticeList.sentADs.length; ++indx5) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchADSDetails', {
                iD: noticeList.sentADs[indx5],
                search: noticeList.search
            });
        }
    }

    if(noticeList.toApproveAD!=undefined) {
        for (var indx6 = 0; indx6 < noticeList.toApproveAD.length; ++indx6) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('searchADADetails', {
                iD: noticeList.toApproveAD[indx6],
                search: noticeList.search
            });
        }
    }

    if(noticeList.events!=undefined) {
        for (var indx7 = 0; indx7 < noticeList.events.length; ++indx7) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchEventDetails', {
                iD: noticeList.events[indx7],
                search: noticeList.search
            });
        }
    }

    if(noticeList.sentEvents!=undefined) {
        for (var indx8 = 0; indx8 < noticeList.sentEvents.length; ++indx8) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchEventSDetails', {
                iD: noticeList.sentEvents[indx8],
                search: noticeList.search
            });
        }
    }

    if(noticeList.toApproveEvent!=undefined) {
        for (var indx9 = 0; indx9 < noticeList.toApproveEvent.length; ++indx9) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('searchEventADetails', {
                iD: noticeList.toApproveEvent[indx9],
                search: noticeList.search
            });
        }
    }
});

socket.on('giveNDetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    if (noticeDetails.state =="approved"){
        var noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer' onclick='clickDetail("+indNum+")'><td>"+noticeDetails.sender+"</td><td>"+noticeDetails.title+"</td> <td>"+noticeDetails.typeN+"</td><td>"+noticeDetails.date+"</td> </tr>";
        $("#noticeDetailTable").append(noticeDetailItem);
        indNum+=1;
        arrayDetailNotices.push(noticeDetails.id);
        arrayGenView.push([noticeDetails.date,noticeDetails.id,noticeDetails.typeN]);
    }
});

socket.on('giveSDetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    if ((noticeDetails.state !="removed")&&(noticeDetails.state !="disapproved")) {
        if (noticeDetails.state =="approved") {
            var noticeDetailItem = "<tr style='cursor: pointer'><td>" + noticeDetails.title + "</td><td>" + noticeDetails.typeN + "</td> <td>" + noticeDetails.date + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentDetail(" + indSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEdit(" + indSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='noticeRemove(" + indSent + ")'>Remove</button></td></tr>";
        }
        else {
            var noticeDetailItem = "<tr style='cursor: pointer'><td>" + noticeDetails.title + "</td><td>" + noticeDetails.typeN + "</td> <td>" + noticeDetails.date + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentDetail(" + indSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEdit(" + indSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='noticeRemove(" + indSent + ")'>Remove</button></td></tr>";
        }
        $("#sentDetailTable").append(noticeDetailItem);
        indSent += 1;
        arraySentNotices.push(noticeDetails.id);
    }
});

socket.on('giveADetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    var noticeDetailItem = "<tr style='cursor: pointer' ><td>"+noticeDetails.title+"</td> <td>" + noticeDetails.typeN + "</td><td>"+noticeDetails.date+"</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthDetail("+indAuth+")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveNotice("+indAuth+")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveNotice("+indAuth+")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
    $("#authDetailTable").append(noticeDetailItem);
    indAuth+=1;
    arrayAuthNotices.push(noticeDetails.id);
});

//Populate AD array
socket.on('giveADDetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    arrayADNotices.push([noticeDetails.id,"AD"]);
    arrayGenView.push([noticeDetails.date,noticeDetails.id,noticeDetails.typeN]);
    if ((Date.parse(noticeDetails.exDate)-(new Date()))<604800000){
        arrayADNotices.push([noticeDetails.id,"AD"]);
    }
    //console.log(noticeDetails.id,'giveADDetails');
});

//Populate Sent ADs
socket.on('giveADSDetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    if ((noticeDetails.state !="removed")&&(noticeDetails.state !="disapproved")) {
        if (noticeDetails.state =="approved") {
            var noticeDetailItem = "<tr style='cursor: pointer'><td>" + noticeDetails.title + "</td><td>" + noticeDetails.typeN + "</td> <td>" + noticeDetails.date + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentADDetail(" + indADSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditAD(" + indADSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='aDRemove(" + indADSent + ")'>Remove</button></td></tr>";
        }
        else {
            var noticeDetailItem = "<tr style='cursor: pointer'><td>" + noticeDetails.title + "</td><td>" + noticeDetails.typeN + "</td> <td>" + noticeDetails.date + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentADDetail(" + indADSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditAD(" + indADSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='aDRemove(" + indADSent + ")'>Remove</button></td></tr>";
        }
        $("#sentDetailTable").append(noticeDetailItem);
        indADSent += 1;
        arraySentADs.push(noticeDetails.id);
        //console.log(arraySentADs);
    }
});

//Populate Auth ADs
socket.on('giveADADetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    var noticeDetailItem = "<tr style='cursor: pointer' ><td>"+noticeDetails.title+"</td> <td>" + noticeDetails.typeN + "</td><td>"+noticeDetails.date+"</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthADDetail("+indADAuth+")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveAD("+indADAuth+")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveAD("+indADAuth+")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
    indADAuth+=1;
    $("#authDetailTable").append(noticeDetailItem);
    arrayAuthADs.push(noticeDetails.id);
});

//Populate inbox Events
socket.on('giveEventDetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    if ((noticeDetails.state =="approved")||(noticeDetails.state =="new")){
        var noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer' onclick='clickEventDetail("+indEvent+")'><td>"+noticeDetails.sender+"</td><td>"+noticeDetails.title+"</td> <td>"+noticeDetails.typeN+"</td><td>"+noticeDetails.date+"</td> </tr>";
        $("#noticeDetailTable").append(noticeDetailItem);
        indEvent+=1;
        arrayDetailEvents.push(noticeDetails.id);
        arrayADNotices.push([noticeDetails.id,"Event"]);
        arrayGenView.push([noticeDetails.date,noticeDetails.id,noticeDetails.typeN]);
        if ((Date.parse(noticeDetails.exDate)-(new Date()))<604800000){
            arrayADNotices.push([noticeDetails.id,"Event"]);
        }
    }
});
//
//Populate Sent Events
socket.on('giveEventSDetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    if ((noticeDetails.state !="removed")&&(noticeDetails.state !="disapproved")) {
        if (noticeDetails.state =="approved") {
            var noticeDetailItem = "<tr style='cursor: pointer'><td>" + noticeDetails.title + "</td><td>" + noticeDetails.typeN + "</td> <td>" + noticeDetails.date + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentEventDetail(" + indEventSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditEvent(" + indEventSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='eventRemove(" + indEventSent + ")'>Remove</button></td></tr>";
        }
        else {
            var noticeDetailItem = "<tr style='cursor: pointer'><td>" + noticeDetails.title + "</td><td>" + noticeDetails.typeN + "</td> <td>" + noticeDetails.date + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentEventDetail(" + indEventSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditEvent(" + indEventSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='eventRemove(" + indEventSent + ")'>Remove</button></td></tr>";
        }
        $("#sentDetailTable").append(noticeDetailItem);
        indEventSent += 1;
        arraySentEvents.push(noticeDetails.id);
    }
});

//Populate Auth Events
socket.on('giveEventADetails',(noticeDetails)=>{
    //console.log(noticeDetails);
    var noticeDetailItem = "<tr style='cursor: pointer' ><td>"+noticeDetails.title+"</td> <td>" + noticeDetails.typeN + "</td><td>"+noticeDetails.date+"</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthEventDetail("+indEventAuth+")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveEvent("+indEventAuth+")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveEvent("+indEventAuth+")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
    $("#authDetailTable").append(noticeDetailItem);
    indEventAuth+=1;
    arrayAuthEvents.push(noticeDetails.id);
});

function loadADs() {
    if (arrayADNotices.length>5){
        for (var indx = 0; indx < 5; ++indx){
            var rand=Math.floor((Math.random() * (arrayADNotices.length)));
            //console.log(arrayADNotices[rand],'getADDis');
            if (arrayADNotices[rand][1]=="AD") {
                socket.emit('getADDis', {
                    iD: arrayADNotices[rand][0],
                    ind: indx
                });
            }
            else{
                socket.emit('getEventADDis', {
                    iD: arrayADNotices[rand][0],
                    ind: indx
                });
            }
            arrayADNotices.splice(rand,1);
        }
    }
    else if(arrayADNotices.length>0) {
        for (var indx = 0; indx < 5; ++indx){
            //console.log(arrayADNotices[(indx%arrayADNotices.length)],'getADDis');
            if (arrayADNotices[(indx%(arrayADNotices.length))][1]=="AD") {
                socket.emit('getADDis', {
                    iD: arrayADNotices[(indx % (arrayADNotices.length))][0],
                    ind: indx
                });
            }
            else{
                socket.emit('getEventADDis', {
                    iD: arrayADNotices[(indx % (arrayADNotices.length))][0],
                    ind: indx
                });
            }
        }
    }
}

function gotoEdit(ind) {
    if(confirm('Do you want to edit the notice?'))
    {
        location.href='editRegular.html';
        sessionStorage.setItem('editID',arraySentNotices[ind]);
    }
}

function gotoEditAD(ind) {
    if(confirm('Do you want to edit the Advertisement?'))
    {
        //console.log(arraySentADs[ind]);
        sessionStorage.setItem('editID',arraySentADs[ind]);
        location.href='editAdvertisement.html';

    }
}

function gotoEditEvent(ind) {
    if(confirm('Do you want to edit the Event?'))
    {
        //console.log(arraySentADs[ind]);
        sessionStorage.setItem('editID',arraySentEvents[ind]);
        location.href='editEvent.html';
    }
}

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});


socket.on('newNotice',function(notice) {
    console.log('New Notice has Arrived!',notice);
    // location.href='index.html';
});

function clickDetail(ind) {
    //console.log(arrayDetailNotices[ind]);
    socket.emit('getNoticeDis',{
        iD:arrayDetailNotices[ind]
    });
}

function clickEventDetail(ind) {
    //console.log(arrayDetailNotices[ind]);
    socket.emit('getEventDis',{
        iD:arrayDetailEvents[ind]
    });
}

function noticeRemove(ind) {
    if(confirm('Do you want to remove the notice?')) {
        socket.emit('removeSentNotice', {
            iD: arraySentNotices[ind]
        });
        socket.emit('removeNoticeAprvl',{
            noticeiD:arraySentNotices[ind],
            iD:sessionStorage.getItem('approverID')
        });
        refresh();
    }
}

function aDRemove(ind) {
    if(confirm('Do you want to remove the Advertisement?')) {
        socket.emit('removeSentAD', {
            iD: arraySentADs[ind]
        });
        socket.emit('removeADAprvl',{
            noticeiD:arraySentADs[ind],
            iD:sessionStorage.getItem('approverID')
        });
        refresh();
    }
}

function eventRemove(ind) {
    if(confirm('Do you want to remove the Event?')) {
        socket.emit('removeSentEvent', {
            iD: arraySentEvents[ind]
        });
        socket.emit('removeEventAprvl',{
            noticeiD:arraySentEvents[ind],
            iD:sessionStorage.getItem('approverID')
        });
        refresh();
    }
}

function clickSentDetail(ind) {

    //console.log(arrayDetailNotices[ind]);
    socket.emit('getSentDis',{
        iD:arraySentNotices[ind]
    });
}

function clickSentADDetail(ind) {
    //console.log(arraySentADs[ind]);
    socket.emit('getSentADDis',{
        iD:arraySentADs[ind]
    });
}

function clickSentEventDetail(ind) {
    //console.log(arraySentADs[ind]);
    socket.emit('getSentEventDis',{
        iD:arraySentEvents[ind]
    });
}

function clickAuthDetail(ind) {
    //console.log(arrayDetailNotices[ind]);
    socket.emit('getSentDis',{
        iD:arrayAuthNotices[ind]
    });
}

function clickAuthADDetail(ind) {
    //console.log(arraySentADs[ind]);
    socket.emit('getSentADDis',{
        iD:arrayAuthADs[ind]
    });
}

function clickAuthEventDetail(ind) {
    //console.log(arraySentADs[ind]);
    socket.emit('getSentEventDis',{
        iD:arrayAuthEvents[ind]
    });
}

//Regular Notice Approval
function approveNotice(ind) {
    if(confirm("Confirm approval of this Notice?")) {
        socket.emit('authApprove', {
            iD: arrayAuthNotices[ind]
        });
        removeFromApproval(ind);
    }
}

function diapproveNotice(ind){
    if(confirm("Confirm disapproval of this Notice?")) {
        socket.emit('authDisapprove', {
            iD: arrayAuthNotices[ind]
        });
        removeFromApproval(ind);
    }
}

function removeFromApproval(ind){
    socket.emit('removeNoticeAprvl',{
        noticeiD:arrayAuthNotices[ind],
        iD:sessionStorage.getItem('approverID')
    });
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    setTimeout(refresh,500);
}

//Advertisement Approval
function approveAD(ind) {
    if(confirm("Confirm approval of this Advertisement?")) {
        socket.emit('authADApprove', {
            iD: arrayAuthADs[ind]
        });
        removeFromApprovalAD(ind);
    }
}

function diapproveAD(ind){
    if(confirm("Confirm disapproval of this Advertisement?")) {
        socket.emit('authADDisapprove', {
            iD: arrayAuthADs[ind]
        });
        removeFromApprovalAD(ind);
    }
}

function removeFromApprovalAD(ind){
    socket.emit('removeADAprvl',{
        noticeiD:arrayAuthADs[ind],
        iD:sessionStorage.getItem('approverID')
    });
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    setTimeout(refresh,500);
}

//Event Approval
function approveEvent(ind) {
    if(confirm("Confirm approval of this Event?")) {
        socket.emit('authEventApprove', {
            iD: arrayAuthEvents[ind]
        });
        removeFromApprovalEvent(ind);
    }
}

function diapproveEvent(ind){
    if(confirm("Confirm disapproval of this Event?")) {
        socket.emit('authEventDisapprove', {
            iD: arrayAuthEvents[ind]
        });
        removeFromApprovalEvent(ind);
    }
}

function removeFromApprovalEvent(ind){
    socket.emit('removeEventAprvl',{
        noticeiD:arrayAuthEvents[ind],
        iD:sessionStorage.getItem('approverID')
    });
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    setTimeout(refresh,500);
}



socket.on('giveNoticeDis',(noticeDetails)=>{
    document.getElementById('noticeTitle').innerHTML="Title : ";
    document.getElementById('noticeSender').innerHTML="Sender : ";
    document.getElementById('noticeDate').innerHTML="Date : ";
    document.getElementById('noticeType').innerHTML="Type : ";
    //console.log(noticeDetails);
    quillD.setContents(noticeDetails.content);
    notTitle=noticeDetails.title;
    $("#noticeTitle").append(notTitle);
    notSender=noticeDetails.sender;
    $("#noticeSender").append(notSender);
    notDate=noticeDetails.date;
    //console.log(new Date(notDate));
    $("#noticeDate").append(notDate);
    notType=noticeDetails.typeN;
    $("#noticeType").append(notType);
});

socket.on('giveSentDis',(noticeDetails)=>{
    document.getElementById('noticeTitle').innerHTML="Title : ";
    document.getElementById('noticeSender').innerHTML="Receivers : ";
    document.getElementById('noticeDate').innerHTML="Date : ";
    document.getElementById('noticeType').innerHTML="Type : ";
    //console.log(noticeDetails);
    quillD.setContents(noticeDetails.content);
    notTitle=noticeDetails.title;
    $("#noticeTitle").append(notTitle);
    notReceviers=noticeDetails.receivers.join(' , ');
    $("#noticeSender").append(notReceviers);
    notDate=noticeDetails.date;
    $("#noticeDate").append(notDate);
    notType=noticeDetails.typeN;
    $("#noticeType").append(notType);[]
});

socket.on('giveADDis',(noticeDetails)=>{
    //console.log(noticeDetails.indxAD);
    if(noticeDetails.indxAD==0){
        quill0.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==1){
        quill1.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==2){
        quill2.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==3){
        quill3.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==4){
        quill4.setContents(noticeDetails.content);
    }
});




function sortNTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortNDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortFNDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "desc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function sortSTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sentTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function sortSDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sentTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortFSDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sentTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "desc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortATable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("authTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function sortADateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("authTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortFADateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("authTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "desc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function searchView() {
    document.getElementById("searchDiv").style.display="block";
    document.getElementById("caroselDiv").style.display="none";
    document.getElementById("buttonDiv").style.display="none";
}

function normalView() {
    document.getElementById("searchDiv").style.display="none";
    document.getElementById("caroselDiv").style.display="block";
    document.getElementById("buttonDiv").style.display="block";
    refresh();
}

function searchNotice() {
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    document.getElementById("searchDiv").style.display="none";

    arrayDetailNotices = [];
    indNum = 0;
    document.getElementById("noticeDetailTable").innerHTML = "";

    arraySentNotices = [];
    indSent = 0;
    document.getElementById("sentDetailTable").innerHTML = "";

    arrayAuthNotices = [];
    indAuth = 0;
    document.getElementById("authDetailTable").innerHTML = "";

    arrayADNotices = [];
    indAD = 0;

    arraySentADs = [];
    indADSent = 0;

    arrayAuthADs = [];
    indADAuth = 0;

    arrayDetailEvents = [];
    indEvent = 0;

    arraySentEvents = [];
    indEventSent = 0;

    arrayAuthEvents = [];
    indEventAuth = 0;

    arrayGenView=[];

    if (document.getElementById("searchInput").value != "") {
        if (loggedID == "0000000") {
            socket.emit('searchAuthNotices', {
                index: loggedID,
                search: document.getElementById("searchInput").value
            });
            // socket.emit('refreshADs',{
            //     index:loggedID
            // });
        } else {
            socket.emit('searchNotices', {
                index: loggedID,
                search: document.getElementById("searchInput").value
            });
            // socket.emit('refreshADs',{
            //     index:loggedID
            // });
        }
    }
    else {
        if(loggedID=="0000000"){
            socket.emit('refreshAuthNotices',{
                index:loggedID
            });
            // socket.emit('refreshADs',{
            //     index:loggedID
            // });
        }else{
            socket.emit('refreshNotices',{
                index:loggedID
            });
            // socket.emit('refreshADs',{
            //     index:loggedID
            // });
        }

    }
    setTimeout(loadADs, 500);
    setTimeout(sortBoth, 500);
    setTimeout(sortGenView,500);
    setTimeout(showSearchPage, 600);

}



