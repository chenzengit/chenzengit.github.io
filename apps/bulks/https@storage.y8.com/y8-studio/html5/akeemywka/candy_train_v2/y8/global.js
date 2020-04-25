function showNextAd()
{	
	console.log('Showing Ads')
	try {
		console.log('Is adBLockDetected?')
		if(adBlockDetected === false)
		{
			console.log(adBlockDetected)
		}
    }
    catch (e) {
		console.log('true')
        console.log(e + ' Error Showing Ads')
        showMessage()
    }
	if(adBlockDetected === false){playAds();}
}

function getVal()
{
	//console.log('getVal')
	return isAdCompleted;
}

function showMessage()
{
	isAdCompleted = 3;
}