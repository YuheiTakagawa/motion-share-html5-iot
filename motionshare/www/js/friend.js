var friend={
  //初期化
  initialize:function(){
    var myContact = JSON.parse(localStorage.contact);
    var myId= myContact.Id;
    //サーバにidを渡して友達リストを要求
    //socket.emit("",myId);
    //サーバから友達リストを受け取る
    //socket.on("",this.makeFriend);
    var friendTest=[
      ["Mike","23444111"],
      ["Yuki","00000001"]
    ];
    this.makeFriend(friendTest);
    this.bindEvents();
  },

  //友達リストを作成
  makeFriend:function(friends){
    friends.forEach(function(friend){
      var friendName = friend[0];
      var friendId = friend[1];
      var listItem = document.createElement('li');
      var nameSpan = "<span class='cyan-text listTitle'>"+friendName+"</span>";
      var idSpan = "<p class='text-col listAbout'>"+friendId+"</p>";
      var deleteSpan = "<a class='secondary-content badge'><i class='fa fa-cyan fa-close list-close'></i></a>";

      var html = "<a>"+ nameSpan+idSpan+deleteSpan+"</a>";
      listItem.innerHTML = html;

      $(listItem).val(friendId);
      $(listItem).addClass("collection-item avatar list-li");
      $("#friendLists").append(listItem);
    });
  },

  //イベントの管理
  bindEvents: function() {
    $(function(){
      $("#friendLists").on("click",".badge", friend.deleteFriend);
    });
  },

  //友達リストから指定したフレンドを削除する
  deleteFriend:function(e){
    if(confirm("delete this friend?")==1){
    //JSONで扱う処理 インデックスの変更とJSONからの削除
    var friendId=$(this).parent().val();
    $(this).parent().remove();
    //サーバに削除要求
    //socket.emit("",friendId);
    e.stopPropagation();
  }
  }
};
