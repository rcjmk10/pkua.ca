$(window).load(function() 
		{
			
			//reset content index images
				var localMaxWidth=100;
				var localMaxHeight=200;
			 
		    var localRatio=1;
		    $('.ConentSlotRecordImageTd>img').each(function()
		    {
		    	if ($(this).width()>localMaxWidth)
		    	{
		    		localRatio=localMaxWidth/$(this).width();
		    		var localheight=$(this).height();
		    	
		    		$(this).width(localMaxWidth);
		    		
		    		$(this).height(localheight*localRatio);
		    		 
		    	}
		    	if ($(this).height()>localMaxHeight)
		    	{
		    		localRatio=localMaxHeight/$(this).height();
		    		var localWidth=$(this).width();
		    	
		    		$(this).height(localMaxHeight);
		    		
		    		$(this).width(localWidth*localRatio);
		    		 
		    	}
		    	 
		     
		        
		    });
		    
		    //reset content detailed images
				var localMaxWidth=200;
				var localMaxHeight=400;
			 
		    var localRatio=1;
		    $('.ConentSlotRecordContentImageTd>img').each(function()
		    {
		    	if ($(this).width()>localMaxWidth)
		    	{
		    		localRatio=localMaxWidth/$(this).width();
		    		var localheight=$(this).height();
		    	
		    		$(this).width(localMaxWidth);
		    		
		    		$(this).height(localheight*localRatio);
		    		 
		    	}
		    	if ($(this).height()>localMaxHeight)
		    	{
		    		localRatio=localMaxHeight/$(this).height();
		    		var localWidth=$(this).width();
		    	
		    		$(this).height(localMaxHeight);
		    		
		    		$(this).width(localWidth*localRatio);
		    		 
		    	}
		    	 
		     
		        
		    });
		    
		    
		    
		});
		
		function fnChangeLanguage(pLangcode, pURL)
		{
			if (!pURL) {pURL=window.location.href};
			fnPost2URL(pURL,{"_d0u0l":pLangcode},"post");

		}
		function fnPost2URL(path, parameters) 
		{
		    var form = $('<form></form>');
		
		    form.attr("method", "post");
		    form.attr("action", path);
		
		    $.each(parameters, function(key, value) {
		        var field = $('<input></input>');
		
		        field.attr("type", "hidden");
		        field.attr("name", key);
		        field.attr("value", value);
		
		        form.append(field);
		    });
		
		    // The form needs to be apart of the document in
		    // order for us to be able to submit it.
		    $(document.body).append(form);
		    form.submit();
		}
		 
 function fnGetValidatedEmail(pEmailAddr)
	{
		if (!pEmailAddr || pEmailAddr=="")
			return "";
		var filter=/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
		var localMatched=pEmailAddr.match(filter);
		if (!localMatched || localMatched.length==0)
			return "";
		return 	localMatched[0];
	}
	function fnGetValidatedWebSiteName(pSiteName)
	{
		if (!pSiteName || pSiteName=="" || pSiteName.indexOf(".")==-1)
			return "";
		var filter=/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
		var localMatched=pSiteName.match(filter);
		if (!localMatched || localMatched.length==0)
			return "";
		return 	localMatched[0];
	}
	