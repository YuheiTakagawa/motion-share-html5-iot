
  //画面遷移
  var showPages={
    showMainPage: function() {
      mainPage.style.display = "";
      selectDevicePage.style.display = "none";
    },

    showselectDevicePage: function() {
      mainPage.style.display = "none";
      selectDevicePage.style.display = "";
    },
  };
