/**
 * Created by Damitha on 6/27/2017.
 */

var socket=io();
var thisuser;
var targetgrp=[];
var alltargets=[];
var checkNum=0;

function showSpeci() {
    document.getElementById("specificOptions").style.display='block';
}

function hideSpeci() {
    document.getElementById("specificOptions").style.display='none';
}

function finish() {
    if(confirm('Do you want to finalize the notice?'))
    {
        var newTitile = document.getElementById("inputTitle").value;
        var newContent = quill.getContents();

        socket.emit('createNotice',{
            title: newTitile,
            content: newContent,
            sender:thisuser.name,
            senderID: loggedID,
            receivers: targetgrp,
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
        index:loggedID
    });
}

socket.on('giveNCreator',(user)=>{
    thisuser=user;
    var position = user.name+'\n'+user.typeO +' - '+user.batch[0].department +' '+ user.batch[0].year;
    quill.setText( 'Notice\nMain content of the intended notice.\n'+ position );
    quill.formatLine(1, 2, {'align': 'center', 'header':'h1' , 'bold':'bold'});
    quill.formatText(0, 6, {'underline': true,'bold':true});
    quill.formatLine(1, 2, 'underline',true);
    quill.formatText(11, 9, {'bold':true});
    quill.formatLine(8, 9, {'align': 'center'});
    quill.formatLine(quill.getLength()- position.length - 1, quill.getLength()-1-1, {'align': 'right'});
    //console.log(quill.getLength()-position.length);

});

function setTitle() {
    var position = thisuser.name + '\n' + thisuser.typeO + ' - ' + thisuser.batch[0].department + ' ' + thisuser.batch[0].year;
    if (((quill.getLength()-position.length) == 45)&&quill.getText().slice(0,6)=="Notice")
    {
        quill.setText(document.getElementById("inputTitle").value + '\nMain content of the intended notice.\n' + position);
        quill.formatLine(1, 0, {'align': 'center', 'header': 'h1'});
        quill.formatText(document.getElementById("inputTitle").value.length+5, 9, {'bold':true});
        quill.formatText(0, document.getElementById("inputTitle").value.length, {'underline': true, 'bold': true});
        quill.formatLine(1, document.getElementById("inputTitle").value.length + 1, {'align': 'center'});
        quill.formatLine(quill.getLength() - position.length - 1, quill.getLength() - 1 - 1, {'align': 'right'});
    }
}

socket.on('giveAllUsers',(list)=>{
    //console.log("All users",list.users);
    //console.log("Auth",list.authorizer);
    sessionStorage.setItem('approverID',list.authorizer);
    for (var indx = 0; indx < list.users.length; ++indx) {
        var userDetails=list.users[indx];
        alltargets.push(userDetails.iD);
        if (userDetails.iD==loggedID){
            var toADD = "<tr onclick='selectRow(this,"+checkNum+")' data-toggle='modal' data-target='#displayModal' style='cursor: pointer'><td><input onclick='flipCheck(this,"+checkNum+")' type='checkbox' name='optionsCheckboxes' class='checkbox'></td><td>"+userDetails.iD+"</td><td>"+userDetails.name+"</td> <td>"+userDetails.batch[0].department+"</td><td>"+userDetails.batch[0].year+"</td><td>"+userDetails.type+"</td></tr>";
        }
        else {
            targetgrp.push(userDetails.iD);
            var toADD = "<tr onclick='selectRow(this," + checkNum + ")' data-toggle='modal' data-target='#displayModal' style='cursor: pointer'><td><input onclick='flipCheck(this," + checkNum + ")' type='checkbox' name='optionsCheckboxes' class='checkbox' checked></td><td>" + userDetails.iD + "</td><td>" + userDetails.name + "</td> <td>" + userDetails.batch[0].department + "</td><td>" + userDetails.batch[0].year + "</td><td>" + userDetails.type + "</td></tr>";
        }
        checkNum+=1;
        $("#checkGrp").append(toADD);
    }
});

function selectRow(row,id)
{
    var firstInput = row.getElementsByTagName('input')[0];
    flipCheck(firstInput,id);
    //console.log(alltargets[id]);
}

function flipCheck(firstInput,id) {
    firstInput.checked = !firstInput.checked;
    doTarget(alltargets[id]);
}

function doTarget(inex){
    if (targetgrp.indexOf(inex)==-1){
        targetgrp.push(inex);
    }
    else{
        targetgrp.splice(targetgrp.indexOf(inex),1);
    }
    console.log(targetgrp);
}

function getSelectionList() {
    socket.emit('getSelectionLst',{
        iD:"noticeSelection"
    });
}

socket.on('giveSelectionList',(listItems)=>{
    //console.log(listItems);
    //console.log(listItems.departments);
    for (var indx = 0; indx < listItems.departments.length; ++indx) {
        var deptListItem = '<option>'+listItems.departments[indx]+'</option>';
        $("#crtRegularDepartment").append(deptListItem);
        //console.log(listItems.departments[indx]);
    }

    for (var indx2 = 0; indx2 < listItems.years.length; ++indx2) {
        var batchListItem = '<option>'+listItems.years[indx2]+'</option>';
        $("#crtRegularBatch").append(batchListItem);
        //console.log(listItems.years[indx2]);
    }
});

function loadAll() {
    document.getElementById('checkGrp').innerHTML="";
    targetgrp=[];
    alltargets=[];
    checkNum=0;
    socket.emit('loadAllUsers');
    setTimeout(sortTbl,500);
    setTimeout(showChoice,600);
}


function onListChange() {
    document.getElementById("loaderBody").style.display = "block";
    document.getElementById("selectionBody").style.display = "none";
    var eD=document.getElementById("crtRegularDepartment");
    var eB=document.getElementById("crtRegularBatch");
    var eDval=eD.options[eD.selectedIndex].value;
    var eBval=eB.options[eB.selectedIndex].value
    if ((eBval=="All")&&(eDval=="All")){
        console.log("All");
        loadAll();
    }
    else if (eBval=="All") {
        document.getElementById('checkGrp').innerHTML="";
        targetgrp=[];
        alltargets=[];
        checkNum=0;
        socket.emit('loadUsersDept',eDval);
        setTimeout(sortTbl,500);
    }
    else if(eDval=="All") {
        document.getElementById('checkGrp').innerHTML="";
        targetgrp=[];
        alltargets=[];
        checkNum=0;
        socket.emit('loadUsersBatch',eBval);
        setTimeout(sortTbl,500);
    }
    else {
        document.getElementById('checkGrp').innerHTML="";
        targetgrp=[];
        alltargets=[];
        checkNum=0;
        socket.emit('loadUsersDept&Batch',{dept:eDval,yar:eBval});
        setTimeout(sortTbl,500);
        //console.log(eD.options[eD.selectedIndex].value+" "+eB.options[eB.selectedIndex].value);
    }
    setTimeout(showChoice,600);
}


function sortSelecTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeSelectionTbl");
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

function showChoice() {
    document.getElementById("loaderBody").style.display = "none";
    document.getElementById("selectionBody").style.display = "block";
}
