$(function () {
  //置き換え
  $("[data-i18n]").each(function () {
    var t = $(this);
    if (t.prop("tagName") == "INPUT") {
      t.val(chrome.i18n.getMessage(t.data("i18n")));
    } else {
      t.text(chrome.i18n.getMessage(t.data("i18n")));
    }
  });

  var tc_options = {
    tc_begintime: "09:00",
    tc_breaktime: "1",
    tc_linkicon: "false",
    tc_taskbar: "true",
    tc_calender: "false",
    tc_todoist_api_token: "",
  };

  //セーブボタンが押されたら、chrome.storageに保存
  $("#save").click(function () {
    tc_options.tc_begintime = $("input[name=begintime]").val();
    tc_options.tc_breaktime = $("input[name=breaktime]").val();
    if ($("input[name=linkicon_checkbox]").prop("checked")) {
      tc_options.tc_linkicon = "true";
    } else {
      tc_options.tc_linkicon = "false";
    }
    if ($("input[name=taskbar_checkbox]").prop("checked")) {
      tc_options.tc_taskbar = "true";
    } else {
      tc_options.tc_taskbar = "false";
    }
    if ($("input[name=calender_checkbox]").prop("checked")) {
      tc_options.tc_calender = "true";
    } else {
      tc_options.tc_calender = "false";
    }
    tc_options.tc_todoist_api_token = $("input[name=todoist_api_token]").val();
    chrome.storage.sync.set(tc_options, function () {});
  });

  //オプション画面の初期値を設定
  chrome.storage.sync.get(tc_options, function (options) {
    //休憩時間がhh:mm形式の場合
    var brtime = options.tc_breaktime.match(
      /^(0?[0-9]|1[0-9]|2[0-4]):(0?[0-9]|[1-5][0-9])$/
    );
    if (brtime)
      options.tc_breaktime =
        Math.round((parseFloat(brtime[1]) + parseFloat(brtime[2]) / 60) * 100) /
        100;

    if (options.tc_begintime)
      $("input[name=begintime]").val([options.tc_begintime]);
    if (options.tc_breaktime)
      $("input[name=breaktime]").val([options.tc_breaktime]);
    if (options.tc_linkicon == "true") {
      $("input[name=linkicon_checkbox]").prop("checked", true);
    } else {
      $("input[name=linkicon_checkbox]").prop("checked", false);
    }
    if (options.tc_taskbar == "true") {
      $("input[name=taskbar_checkbox]").prop("checked", true);
    } else {
      $("input[name=taskbar_checkbox]").prop("checked", false);
    }
    if (options.tc_calender == "true") {
      $("input[name=calender_checkbox]").prop("checked", true);
    } else {
      $("input[name=calender_checkbox]").prop("checked", false);
    }
    if (options.tc_todoist_api_token)
      $("input[name=todoist_api_token]").val([options.tc_todoist_api_token]);
  });
});
