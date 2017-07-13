/**
 * Created by Damitha on 7/5/2017.
 */
/**
 * Created by Damitha on 6/27/2017.
 */

var socket=io();
var thiseidtuser;
var targeteditgrp=[];
var alledittargets=[];
var checkEditNum=0;
var noticeID = sessionStorage.getItem('editID');
var targetEditGrp;

function showSpeci() {
    document.getElementById("specificOptions").style.display='block';
}

function hideSpeci() {
    document.getElementById("specificOptions").style.display='none';
}

function finishEdit() {
    if(confirm('Do you want to finalize the notice?'))
    {
        var newTitile = document.getElementById("inputEditTitle").value;
        var newContent = quilledt.getContents();

        socket.emit('editNotice',{
            title: newTitile,
            content: newContent,
            iD:noticeID,
            approver:sessionStorage.getItem('approverID')
        });
        location.href='mainNotices.html';
    }
}

function genText(){
    document.getElementById("typeText").innerHTML="Make a General Notice";
}

function spcText(){
    document.getElementById("typeText").innerHTML="Make a Specific Notice";
}

function doType() {
    if (document.getElementById("cbType").checked)
    {
        spcText();
        showSpeci()
    }
    else
    {
        genText();
        hideSpeci()
    }

}

function  getCreator() {
    socket.emit('getNCreator',{
        index:loggedEditID
    });
}

socket.on('giveNCreator',(user)=>{
    console.log('Got User',user);
    thiseidtuser=user;

});

function  getEdtNotice() {
    socket.emit('getEditNotice',{
        iD: noticeID
    });
}

socket.on('giveEditDetails',(notice)=>{
    console.log('Got notice',notice);
    var editTitle = notice.title;
    // $("#inputEditTitle").append(editTitle);
    document.getElementById('inputEditTitle').value= editTitle;
    quilledt.setContents(notice.content);
    targetEditGrp=notice.receivers;
    // for (var indx = 0; indx < alledittargets.length; ++indx) {
    //     if (notice.receivers.indexOf(alledittargets[indx])==-1){
    //
    //     }
    // }
});

function loadAll() {
    socket.emit('loadAllUsers');
}

socket.on('giveAllUsers',(list)=>{
    console.log("All users",list);
    for (var indx = 0; indx < list.length; ++indx) {
        var userDetails=list[indx];
        console.log(list[indx].iD);
        targeteditgrp.push(userDetails.iD);
        alledittargets.push(userDetails.iD);
        //var toAdd = '<div class="checkbox"><label><input type="checkbox" name="optionsCheckboxes" checked>'+list[indx].iD +' - ' +list[indx].name+ '</label></div>';
        var toADD = "<tr onclick='selectRow(this,"+checkEditNum+")' data-toggle='modal' data-target='#displayModal' style='cursor: pointer'><td><input onclick='flipCheck(this,"+checkEditNum+")' type='checkbox' name='optionsCheckboxes' class='checkbox' checked></td><td>"+userDetails.iD+"</td><td>"+userDetails.name+"</td> <td>"+userDetails.batch[0].department+"</td><td>"+userDetails.batch[0].year+"</td><td>"+userDetails.type+"</td></tr>";
        checkEditNum+=1;
        $("#checkGrp").append(toADD);
        console.log(targeteditgrp);
        //checkGrp
        //$("#checkGrp").append(toAdd);
        //document.getElementById('checkGrp').innerHTML+=toADD;

    }
});

function selectRow(row,id)
{
    var firstInput = row.getElementsByTagName('input')[0];
    flipCheck(firstInput,id);
    //console.log(alledittargets[id]);
}

function flipCheck(firstInput,id) {
    firstInput.checked = !firstInput.checked;
    doTarget(alledittargets[id]);
}

function doTarget(inex){
    if (targeteditgrp.indexOf(inex)==-1){
        targeteditgrp.push(inex);
    }
    else{
        targeteditgrp.splice(targeteditgrp.indexOf(inex),1);
    }
    console.log(targeteditgrp);
}


