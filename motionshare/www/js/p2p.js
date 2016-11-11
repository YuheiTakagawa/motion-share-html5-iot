var PEERJS_ID = 'eikjpf55l9olmcxr';
var myId = String(Math.ceil( Math.random()*1000 + 100 ));
var peer = new Peer(myId, {key: PEERJS_ID});
var id = "";


var p2pConnect = function(conn) {
  //P2P送信
  peer = new Peer(myId, {key: PEERJS_ID});
  //ただデータを送る
  /*    conn.send({
  message: localStorage.getItem("imageData"),
  ids: [myId]
});
*/

//ボタンでデータを送る
/*
$('#modeStatus').click(function() {
conn.send({
message: localStorage.getItem("imageData"),
ids: [myId]
});
});
*/
//P2P受信
conn.on('data', function(data){
  var message = data.message;
  localStorage.setItem("imageData",message);

  $('.card-image').removeClass('loadingWidth');
  $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + message);
});
};

function p2pInitialize(){
  //alert(myId);
  localStorage.setItem('p2pMyId', myId);
  id = localStorage.getItem("p2pId");
  conn = peer.connect(id, {'serialization': 'binary-utf8'});
  conn.on('open', function(){
    p2pConnect(conn);
  });


  peer.on('connection', function(conn) {
    p2pConnect(conn);
  });
}


/*
$(function() {
var PEERJS_ID = 'eikjpf55l9olmcxr';
var myId = String(Math.ceil( Math.random()*1000 + 100 ));
var peer = new Peer(myId, {key: PEERJS_ID});
$('#myId').text(myId);

var inputMessage = function(id, message) {
$('#messageData').prepend($('<div/>').text(id + ': ' + message));
};

var connect = function(conn) {
$('.connected').prepend($('<div/>').text('ID: ' + conn.peer + 'と通信中'));


//P2P送信
$('#sendMessage').click(function() {
var text = $('#message').val();
$('#message').val('');
if(text === '') return;
$.each(peer.connections, function(_id, _conn) {
_conn[0].send({
message: text,
ids: [myId]
});
});
inputMessage(myId, text);
});

//P2P受信
conn.on('data', function(data){
var id = data.ids[0];
var ids = data.ids;
var message = data.message;
$.each(peer.connections, function(_id, _conn) {
if($.inArray(_id, ids) == -1) {
ids.push(myId);
_conn[0].send({
message: message,
ids: ids
});
}
});
inputMessage(id, message);
});
};



$('#connectButton').click(function() {
var id = $('#connect').val();
if(id === '') return;
var connectFlag = false;
$.each(peer.connections, function(_id) {
if(id == _id) connectFlag = true;
});
if(connectFlag) return;
var conn = peer.connect(id, {'serialization': 'binary-utf8'});
conn.on('open', function(){
connect(conn);
});
});

peer.on('connection', function(conn) {
connect(conn);
});
});
*/
