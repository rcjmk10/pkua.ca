	$(document).ready(function () {
	    $('.rootSectionMenu').each(function () {
	        $(this).pShadow({
	            type: 'middle',
	            depth: 10,
	            strength: 5
	        });
	    });
	    // $('.slotContainer,.ContentSlot,.rootSectionMenu').each(function(){ $(this).pShadow();});
	    fnResizeImageBasedOnWrapperWidth();
	    //fnStartGeoLocation();
	});
	var LOCAL_GEO_POSITION = new Object;

	function fnCreateGeoLocationMapView(pLat, pLong) {

	}

	function fnRunGeoLocationFromSlot(pSlotId) {
	    if (!pSlotId || pSlotId == "") return;
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function (position) {
	            fnUpdateSessionGeoLocation(position);
	        }, function (error) {
	            $("slotMsgs_" + pSlotId).html("Failed to get location from your browser");
	        });

	        navigator.geolocation.watchPosition(function (position) {
	            fnUpdateSessionGeoLocation(position);
	        });
	    } else {
	        $("slotMsgs_" + pSlotId).html("Your browser does not support location serice, or you did not enable the service. Please refresh browser window to try again.");
	    }
	}

	function fnStartGeoLocation() {
	    if (navigator.geolocation) {


	        navigator.geolocation.getCurrentPosition(function (position) {
	            fnUpdateSessionGeoLocation(position);
	        });

	        navigator.geolocation.watchPosition(function (position) {
	            fnUpdateSessionGeoLocation(position);
	        });
	    } else {

	    }

	}

	function calculateDistance(lat1, lon1, lat2, lon2) {
	    var R = 6371; // km
	    var dLat = (lat2 - lat1).toRad();
	    var dLon = (lon2 - lon1).toRad();
	    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
	        Math.sin(dLon / 2) * Math.sin(dLon / 2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    var d = R * c;
	    return d;
	}
	Number.prototype.toRad = function () {
	    return this * Math.PI / 180;
	}

	function fnUpdateSessionGeoLocation(position) {
	    if (position && position.coords) {

	        LOCAL_GEO_POSITION.latitude = position.coords.latitude;
	        LOCAL_GEO_POSITION.longitude = position.coords.longitude;


	        $.ajax({
	            type: "post",
	            data: {
	                l1: position.coords.latitude,
	                l2: position.coords.longitude
	            },
	            url: "/d74b100caf00fea6b2a86cc88613d8c318bccc98"
	        });
	    }
	}

	function fnGetValidatedEmail(pEmailAddr) {
	    if (!pEmailAddr || pEmailAddr == "")
	        return "";
	    var filter = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
	    var localMatched = pEmailAddr.match(filter);
	    if (!localMatched || localMatched.length == 0)
	        return "";
	    return localMatched[0];
	}
	$EMAILOBJ_ORIG_VALUES = {};

	function fnSaveEmailObjInitValue(pTextObj) {
	    $EMAILOBJ_ORIG_VALUES[pTextObj] = pTextObj.value;
	}

	function fnValidateEmailObj(pTextObj) {
	    if (!pTextObj || !pTextObj.value) {
	        pTextObj.style.backgroundColor = "#efeeb1";
	        pTextObj.focus();
	        alert("Missing email address!");
	        return false;
	    }

	    var str = pTextObj.value;
	    if (!str || str == "") {
	        pTextObj.style.backgroundColor = "#efeeb1";
	        pTextObj.focus();
	        alert("Missing email address!");
	        return false;
	    }

	    var strArray = str.split(/\;/g);
	    if (strArray == null || strArray.length == 0)
	        return false;

	    var newStr = "";
	    for (var i = 0; i < strArray.length; i++) {
	        var localNewEmlStr = fnGetValidatedEmail(strArray[i]);
	        if (localNewEmlStr && localNewEmlStr.indexOf("@") > -1) {
	            if (newStr == "")
	                newStr = localNewEmlStr;
	            else
	                newStr += ";" + localNewEmlStr;
	        }

	    }
	    if (newStr == str) {
	        pTextObj.style.backgroundColor = "";

	        return true;
	    }

	    alert("Your input contains some invalid emails!");
	    pTextObj.style.backgroundColor = "#efeeb1";
	    pTextObj.focus();
	    if (newStr.indexOf("@") == -1) {
	        if ($EMAILOBJ_ORIG_VALUES[pTextObj] && $EMAILOBJ_ORIG_VALUES[pTextObj].indexOf("@") > -1) {
	            newStr = $EMAILOBJ_ORIG_VALUES[pTextObj];
	        }
	    }
	    pTextObj.value = newStr;
	    return false;

	}

	function fnGetValidatedWebSiteName(pSiteName) {
	    if (!pSiteName || pSiteName == "" || pSiteName.indexOf(".") == -1)
	        return "";
	    var filter = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
	    var localMatched = pSiteName.match(filter);
	    if (!localMatched || localMatched.length == 0)
	        return "";
	    return localMatched[0];
	}

	function fnResizeImageBasedOnWrapperWidth(pWidth) {
	    if (!pWidth || pWidth == 0) {
	        pWidth = $("#pageBodyWrapper").width() - 50;
	    }

	    if (pWidth < 0) {
	        return;
	    }
	    var localRatio = 1;
	    $('img').each(function () {
	        if ($(this).width() > pWidth) {
	            if ($(this).attr('name') != "PORTAL_BANNER_IMAGE")

	            {
	                localRatio = $(this).height() / $(this).width();
	                $(this).width(pWidth);
	                $(this).height($(this).width() * localRatio);
	            }
	        }



	    });

	}

	function fnSlot(pPageUUID, pSlotUID, pParams, pEvenObj) {
	    if (!pSlotUID || !pPageUUID || pSlotUID == "" || pPageUUID == "") return;
	    if (pEvenObj && pEvenObj.form) {
	        pParams = $(pEvenObj.form).serialize()
	    }
	    $("#slot" + pSlotUID).html("Loading...");
	    $.post("/slot", pParams,

	    function (result) {
	        $("#slot" + pSlotUID).html(result);

	    });
	}
 
	function fnEnableSpinner(pComID)
	{
		
		var localObj=document.getElementById(pComID);
		if (localObj)
		{
			try{
				localObj.innerHTML="<img src=\"/st030/icons/ajax-loader.gif\" border=\"0\" alt=\"Loading...\">";
			}catch(e3){}
		}
	}
	function fnDisableSpinner(pComID)
	{
		
		var localObj=document.getElementById(pComID);
		if (localObj)
		{
			try{
				localObj.innerHTML=" ";
			}catch(e3){}
		}
	}
	function fnLoginEmailBoxOnClick(pTextObj, pEvent) {
	    if (pTextObj.value == "Your Email") pTextObj.value = "";

	}

	function fnLoginEmailBoxKeydown(pTextObj, pEvent, pSlotID) {
	    var keyCode = ('which' in pEvent) ? pEvent.which : pEvent.keyCode;
	    if (pTextObj.value == "Your Email") pTextObj.value = "";

	    if (pSlotID && pSlotID != '') {
	        clearInterval($('#slide' + pSlotID).data('interval'));
	    }
	    if (keyCode == 13) {

	        var localEmail = fnGetValidatedEmail(pTextObj.value);
	        if (!localEmail || localEmail == "") {

	            alert("Invalid 1111email address, please correct and submit again.");
	            pTextObj.focus();
	            return;
	        }


	        pTextObj.form.Passwd.focus();

	    }

	}

	function fnLoginPasswordBoxOnClick(pTextObj, pEvent) {
	    if (pTextObj.value == "Choose a password") {
	        pTextObj.value = "";
	        pTextObj.type = "password";
	    };

	}

	function fnLoginPasswordBoxKeydown(pTextObj, pEvent) {
	    var keyCode = ('which' in pEvent) ? pEvent.which : pEvent.keyCode;
	    if (pTextObj.value == "Choose a password") {
	        pTextObj.value = "";
	        $(pTextObj).attr('type', 'password');
	    }
	    if (keyCode == 13) {
	        if (pTextObj.value != "" && $.trim(pTextObj.value) != "" && pTextObj.value.length > 5) {
	            pTextObj.form.PasswdConfirm.value = pTextObj.value;

	            pTextObj.form.submit();
	        }
	    }

	}

	function fnSubmitSignupForm(pFormObj) {
	    if (!pFormObj) return;
	    if (pFormObj.Email.value == "" || pFormObj.Email.value.indexOf("@") == -1) {
	        pFormObj.Email.focus();
	        return;
	    }

	    var localEmail = fnGetValidatedEmail(pFormObj.Email.value);
	    if (!localEmail || localEmail == "") {

	        alert("Invalid email address, please correct and submit again.");
	        pFormObj.Email.focus();
	        return;
	    }
	    //alert(pFormObj.Passwd.value.length);
	    if (pFormObj.Passwd.value == "") {
	        pFormObj.Passwd.focus();
	        return;
	    }

	    pFormObj.PasswdConfirm.value = pFormObj.Passwd.value;
	    //alert(pFormObj.PasswdConfirm.value);
	    pFormObj.submit();
	}


	function fnNewsLetterEmailBoxOnClick(pTextObj, pEvent) {
	    if (pTextObj.value == "Your Email Here") pTextObj.value = "";

	}

	function fnNewsLetterEmailBoxKeydown(pTextObj, pEvent) {
	    var keyCode = ('which' in pEvent) ? pEvent.which : pEvent.keyCode;
	    if (pTextObj.value == "Your Email Here") pTextObj.value = "";
	    if (keyCode == 13) {

	        var localEmail = fnGetValidatedEmail(pTextObj.value);
	        fnSubmitNewsLetterEmailSignup(localEmail);


	    }

	}

	function fnSubmitNewsLetterEmailSignup(pEmailAddr) {


	    if (!pEmailAddr || pEmailAddr == "" || pEmailAddr.indexOf("@") == -1) {

	        alert("Invalid email address, please correct and submit again.");
	        pTextObj.focus();
	        return;
	    }

	    $.post("/d81b46a5a316dc541c68a6b497f721acf662506f", {
	        newsletteremail: pEmailAddr
	    },

	    function (result) {
	        $("#newsLetterSignupBox").html("Thank You!");
	    });



	}

	function fnSetMaskImage(pObj, pImgSrc) {
	    if (!pObj)
	        return;
	    if (!pImgSrc || pImgSrc == "") {
	        pImgSrc = "/st030/icons/space.gif";
	    }

	    var localLastChild = pObj.lastChild;
	    if (localLastChild != null) {
	        if (localLastChild.nodeName == "IMG") {

	            return;
	        }
	    }
	    var localFirstChild = pObj.firstChild;

	    var localImg = document.createElement("img");
	    if (!localImg) {
	        return;
	    }
	    localImg.src = pImgSrc;

	    localImg.style.width = pObj.offsetWidth + "px";
	    localImg.style.height = pObj.offsetHeight + "px";

	    localImg.style.position = 'absolute';


	    var curleft = 0;
	    var curtop = 0;
	    if (pObj.offsetParent) {
	        var localObj = pObj.offsetParent;
	        do {
	            curleft += localObj.offsetLeft;
	            curtop += localObj.offsetTop;
	        } while (localObj = localObj.offsetParent);
	        curleft += pObj.offsetLeft;
	        curtop += pObj.offsetTop;
	    }
	    localImg.style.top = curtop + "px";
	    localImg.style.left = curleft + "px";

	    pObj.appendChild(localImg);

	}

	function newWindow(address) {
	    var win = window.open(address);
	    win.focus();
	}


	function fnUpdateResourceRating(pResUUID, pNewScore, pRatingObjID) {
	    if (pNewScore == null) {
	        pNewScore = -1;
	    }
	    // alert("pResUUID="+pResUUID+",pNewScore="+pNewScore );
	    if (!pResUUID || pResUUID == "" || !pNewScore || pNewScore == "" || pNewScore == 0)
	        return;
	    if (!pRatingObjID || pRatingObjID == "") {
	        pRatingObjID = pResUUID;
	    }
	    $.ajax({
	        type: "post",
	        data: {
	            ratingtype: '',
	            comment: '',
	            ratingrequesttype: 'update',
	            resuuid: pResUUID,
	            rvalue: pNewScore,
	            htmlobjuuid: pRatingObjID
	        },
	        url: "/de8f1a7f8db54066d9ce99a9bddbaee25e4fcbb2",
	        dataType: "script"
	    });
	}

	function fnQueryResourceRating(pResUUID, pRatingObjUUID) {

	    // alert("pResUUID="+pResUUID );
	    if (!pResUUID || pResUUID == "")
	        return;

	    if (!pRatingObjUUID || pRatingObjUUID == "") {
	        pRatingObjUUID = pResUUID;
	    }
	    $.ajax({
	        type: "post",
	        data: {
	            ratingtype: '',
	            comment: '',
	            ratingrequesttype: 'query',
	            resuuid: pResUUID,
	            htmlobjuuid: pRatingObjUUID
	        },
	        url: "/de8f1a7f8db54066d9ce99a9bddbaee25e4fcbb2",
	        dataType: "script"
	    });
	}

	function fnUpdateRatingScore(pResourceID, pType, pResourceObjID, pNewValue, pReadonly, pPath) {
	    //if (!pReadonly)
	    // alert(pResourceObjID+"="+pNewValue+" for "+pResourceID);
	    if (!pPath) {
	        pPath = "/st020/rating/img";
	    }
	    if (!pResourceObjID || pResourceObjID == "")
	        return;
	    if (!pNewValue) {
	        pNewValue = 0;
	    }
	    if ('a983922f5413d5c6f9868039db7e2c8bfdb9bb38' == pResourceObjID) {
	        alert(pType + pResourceObjID + "=" + $('#' + pType + pResourceObjID).html());
	    }
	    $('#' + pType + pResourceObjID).raty({
	        readOnly: pReadonly,
	        score: pNewValue,
	        path: pPath,
	        click: function (pScore, evt) {
	            fnUpdateResourceRating(pResourceID, pScore, pResourceObjID);
	        }
	    });
	}

	function fnViewUserList(pObjID, pResUUID) {
	    if (!pResUUID || pResUUID == "") return;
	    if (!pObjID || pObjID == "") return;

	    $.post("/cef6a5bf8ed49de01ce5aa12e1620758670e9d53", {
	        resuuid: pResUUID,
	        formid: pObjID,
	    },

	    function (result) {
	        $("#MyList" + pObjID).html(result);
	    });
	}


	function fnInitSwitchablePasswordField(pID) {
	    if (!pID || pID == null || pID == "") return;

	    $('#' + pID + 'FakeText').show();
	    $('#' + pID + 'Base').hide();

	    $('#' + pID + 'FakeText').focus(function () {
	        $('#' + pID + 'FakeText').hide();
	        $('#' + pID + 'Base').show();
	        $('#' + pID + 'Base').focus();
	    });
	    $('#' + pID + 'Base').blur(function () {
	        if ($('#' + pID + 'Base').val() == '') {
	            $('#' + pID + 'FakeText').show();
	            $('#' + pID + 'Base').hide();
	        }
	    });

	}

	function fnUpdateUserList(pObjID, pResUUID, pEventObj) {

	    if (!pEventObj) return;
	    var localEventForm = pEventObj.form;
	    if (!localEventForm) return;
	    if (!pResUUID || pResUUID == "") return;
	    if (!pObjID || pObjID == "") return;

	    $.post("/cef6a5bf8ed49de01ce5aa12e1620758670e9d53", $(localEventForm).serialize(),

	    function (result) {
	        $("#MyList" + pObjID).html(result);
	    });
	}

	function fnEditUserList(pObjID, pResUUID, pEventObj) {
	    if (!pResUUID || pResUUID == "") return;
	    if (!pObjID || pObjID == "") return;

	    $.post("/cef6a5bf8ed49de01ce5aa12e1620758670e9d53", {
	        resuuid: pResUUID,
	        userlistrequesttype: "edit",
	        formid: pObjID
	    },

	    function (result) {

	        $("#MyList" + pObjID).html(result);
	    });
	}

	function fnEnableCustUserList(pEventObj, pEvent) {
	    var keyCode = ('which' in pEvent) ? pEvent.which : pEvent.keyCode;

	    if (keyCode == 13) {
	        return;
	    }
	    $(pEventObj).parents("form:first").find("#CustListNameOption").each(function () {
	        $(this).attr("checked", true);
	    });

	}

	function fnDeleteUserList(pListName) {
	    if (!pListName || pListName == "") return;
	    if (!confirm("Are you sure to delete the list: " + pListName + "?")) {
	        return;
	    }

	    $.ajax({
	        type: "post",
	        data: {
	            listname: pListName,
	            userlistrequesttype: "delete"
	        },
	        url: "/cef6a5bf8ed49de01ce5aa12e1620758670e9d53",
	        dataType: "script"
	    });

	}

	function fnResetSitePage() {
	    top.location.href = "/";
	}


	function getTimeStamp() {
	    var localDate = new Date();
	    return localDate.getMilliseconds();
	}

	function fnSendContentViaEmail(pTitle, pEUUID, pRUUID, pWidth, pHeight, pHtmlObjID) {
	    fnAjaxDialog(pTitle, "/7fd49df7c37c6aecbdc143e48495ade28c1cbea9?_sc2fat=025bc7fde3bade09c0868fc034057fe915069f1f&entityuuid=" + pEUUID + "&resuuid=" + pRUUID, pWidth, pHeight, pHtmlObjID);
	}

	function fnSubmitEmlContentForm(pEventObj) {
	    if (!pEventObj) return;

	    var localForm = pEventObj.form;
	    if (!localForm) return;



	    if (!fnValidateEmailObj(localForm.xt_emls)) {
	        return;
	    }
	    if (!fnValidateEmailObj(localForm.xt_eml0)) {
	        return;
	    }


	    $.ajax({
	        type: "post",
	        data: $(localForm).serialize(),
	        url: "/7fd49df7c37c6aecbdc143e48495ade28c1cbea9",
	        dataType: "script"
	    });
	    localForm.style.display = "none";
	}

	function closePopupDialog(pEventObj, pHtmlObjID) {
	    if (!pHtmlObjID || pHtmlObjID == "") {
	        pHtmlObjID = "PageContentDlgDivObj";
	    }

	    $("#" + pHtmlObjID).dialog("close");
	}

	function fnAjaxDialog(pTitle, pURL, pWidth, pHeight, pHtmlObjID, pCallbackFunc) {
	    if (!pHeight || pHeight < 100) {
	        pHeight = $(window).height() - 150;
	    }
	    if (!pWidth || pWidth < 100) {
	        pWidth = $(window).width() - 300;
	    }
	    if (pHeight < 300) {
	        pHeight = 300;
	    }
	    if (pWidth < 400) {
	        pWidth = 400;
	    }

	    pURL = addURLQueryTimeSeqNum(pURL);
		if (pURL.indexOf("_dialogcallflag=")==-1)
		{
			pURL+="&_dialogcallflag=1";
		}
	    //prompt(pURL,pURL);

	    if (!pTitle || pTitle == null) {
	        pTitle = "";
	    }
	    var dialogOpts = {
	        title: pTitle,
	        modal: true,
	        bgiframe: true,
	        autoOpen: true,
	       // height: pHeight,
	        width: pWidth,
	        draggable: true,
			autoResize:true,
	        resizeable: true,
			position:['center',10],
			minHeight: 'auto',
			maxheight:($(window).height() - 150),
	        closeOnEscape: true,
	        close: pCallbackFunc
	        /* buttons : {

							'Close' : {
								text : 'Close',
								click : function() {
													$(this).dialog('close');
													}
									}
							}
							*/
	    };

	    var localHtmlObj = null;
	    if (!pHtmlObjID || pHtmlObjID == "") {
	        pHtmlObjID = "PageContentDlgDivObj";
	    }

	    if (pHtmlObjID && pHtmlObjID != "") {
	        localHtmlObj = $("#" + pHtmlObjID);
	    }

	    if (localHtmlObj == null || localHtmlObj == undefined || $(localHtmlObj).attr("id") == null) {

	        localHtmlObj = $('<div id="' + pHtmlObjID + '"/>');
	        $(localHtmlObj).appendTo('body');
	    }
	    $(localHtmlObj).bind('dialogclose', function (event, ui) {
	        $(event.target).empty().remove();
	    });
	    $(localHtmlObj)
	        .load(pURL)
	        .dialog(dialogOpts);
	    return true;
	}

	function fnNewsLetterEmailBoxSubmitForm() {

	    var localEmail = fnGetValidatedEmail($('#newslettersignuptext').val());
	    if (!localEmail || localEmail == "") {

	        alert("Invalid email address, please correct and submit again.");

	        return;
	    }

	    $.post("/d81b46a5a316dc541c68a6b497f721acf662506f", {
	        newsletteremail: localEmail
	    },

	    function (result) {
	        $("#newsLetterSignupBox").html("Thank You!");
	    });



	}
	function CKupdate(){
	try
	{
		for ( instance in CKEDITOR.instances )
			CKEDITOR.instances[instance].updateElement();
			}catch(e){}
	}
	function fnUpdateSlot(pFormId, pRenderTargetId, pParams, pEventObj) {


	    var localForm = null;
	    if (pEventObj) {
	        localForm = pEventObj.form;
	    }
	    if (pFormId) {
	        localForm = $("#" + pFormId);
	    }

	    if (pRenderTargetId) {
	        pParams = pParams + "&_xttra=" + pRenderTargetId;
	    }
		CKupdate();
	    if (localForm && localForm != null) {
	        pParams = pParams + "&" + $(localForm).serialize();
	    }
	    //pParams=pParams+"&_reqtmsp="+getTimeStamp();
	    pParams = addURLQueryTimeSeqNum(pParams, true);
	    //alert(pParams);
	   fnEnableSpinner(pRenderTargetId);
	    $.post("/slot", pParams,

	    function (result) {
			fnDisableSpinner(pRenderTargetId);
	        if (pRenderTargetId && pRenderTargetId != "") {
				 
	            $("#" + pRenderTargetId).html(result);
	        } else {
	            if (result && result != "") {
					if (result.indexOf("<script>")>-1)
					{
						result = result.replace(/<script>(.*)<\/script>/, "$1"); 
						 //alert(result);
						eval(result);
					}
					else
					{
						result=result.replace(/<li>/,"\n");
						alert(result);
					}
	            }
	        }
	    });
	}

	function fnTryLogin() {
	    alert("try login");
	}

	function addURLQueryTimeSeqNum(pURL, isParam) {
	    if (!pURL) {
	        pURL = "";
	    }

	    var localTimeSeq = getTimeInMill();
	    var localQueryAppendix = "_rseqid=" + getTimeInMill();

	    if (pURL.indexOf("_rseqid=") > -1) {
	        pURL = pURL.replace("_rseqid=", localQueryAppendix);
	    } else {
	        if (isParam || pURL.indexOf("?") > -1) {
	            pURL += "&" + localQueryAppendix;
	        } else {
	            pURL += "?" + localQueryAppendix;
	        }
	    }
	    return pURL;
	}

	function getTimeInMill() {
	    var localDate = new Date();
	    return localDate.getTime();
	}

	function fnColorBoxPage(pURL, pwidth, pheight, pCallback) {

	    if (!pheight || pheight == -1) {
	        pheight = $(window).height() - 50;
	    }
	    if (!pwidth || pwidth == -1) {
	        pwidth = $(window).width() - 50;
	    }

	    if (pheight < 500) {
	        pheight = 500;
	    }
	    if (pwidth < 600) {
	        pwidth = 600;
	    }
	    if (!pCallback) {
	        pCallback = function () {};
	    }

	    pURL = addURLQueryTimeSeqNum(pURL);

	    $.colorbox({
	        href: pURL,
	        opacity: 0.3,
	        escKey: true,
	        width: pwidth,
	        height: pheight,
	        onClosed: pCallback

	    });

	}
	function fnSendMemberEmail(pTitle,pType,pRcuUUID,pEventEnrollUUID,pWidth, pHeight, pHtmlObjID) {
	    fnAjaxDialog(pTitle, "/ed69393612dde4f7a0ee6780f8fcb5afa1fd3dff?_sc2fat=025bc7fde3bade09c0868fc034057fe915069f1f&emltype="+pType+"&rcvuuid="+encodeURIComponent(pRcuUUID)+"&eventenrolluuid="+pEventEnrollUUID, pWidth, pHeight, pHtmlObjID);
	}
	function fnSubmitEmlMemberForm(pEventObj) {
	    if (!pEventObj) return;

	    var localForm = pEventObj.form;
	    if (!localForm) return;


 
	    if (!fnValidateEmailObj(localForm.xt_eml0)) {
	        return;
	    }


	    $.ajax({
	        type: "post",
	        data: $(localForm).serialize(),
	        url: "/ed69393612dde4f7a0ee6780f8fcb5afa1fd3dff",
	        dataType: "script"
	    });
	    localForm.style.display = "none";
	}

	function fnActivateAjaxSpinner(pObj) {
	    if (pObj) {

	        $(pObj).parent().find(".ajaxSpinner").show();

	    }
	}

	function fnStopAjaxSpinner() {

	    $(".ajaxSpinner").hide();

	}

	function closeDialog(pID) {
	    if (!pID || pID == "") {

	        return;
	    }
	    var localDialogContainer = $("#" + pID);
	    if (!localDialogContainer) {

	        return;
	    }
	    try {

	        $(localDialogContainer).dialog('close');
	        $(localDialogContainer).closest('.ui-dialog-content').dialog('close');
	    } catch (e) {
	        alert("Error: " + e);
	    }
	}
	function fnLoginSuccessCallBack(pTarget)
	{
		if (!pTarget || pTarget=="") {pTarget="/";} 
		 
		top.location.href=pTarget;
	}
	
	function fnLogContentAccess(pResourceUUID,pCategory,pActionType) {
	    if (!pResourceUUID) return;

	     

	    $.ajax({
	        type: "post",
	        data: {
	            logresuuid: pResourceUUID,
	            logtype: pActionType,
	            logcategory: pCategory 
	        },
	        url: "/acc5498cfea76a252ceeb742de3b7d78f6268923",
	        dataType: "script"
	    });
	     
	}
	