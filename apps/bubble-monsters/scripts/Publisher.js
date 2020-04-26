// ******************************
// Tingly Builder JavaScript file
// ******************************

//Publisher.js file Example. 
//Last Update: August 2018 
 
//First, let’s describe the game a bit. These are the variables 
//you should reference in your Booster API initialization in  
//your index.html //
var publisher = {
	
	gameName: "Bubble Monsters", 
	gameVersion: "1.0.6", 
	gameCategory: "Puzzle", 
	developerId: "0001",  //Provided by Booster 
	gameCode: "0001-bubble_mon", //Provided by Booster 
	tabIcon: "yahoo-menu-icon.png",
	gameAnalyticsId: "UA-80300038-45",
//Now, on to advertising settings.  Please leave these 
//placeholder values as-is when implementing.  
 
	adChannel: "channel01105",
	
	enableAds: true,  
	adFreq: "60",
	firstAd: "60",
	
	mobileRewardId : 4188,
	desktopRewardId : 4187,
   
	
 
//Controlling More Games behavior… 
	moreGames: false/*,
	moreGamesURL: "../../../../../../www.coolgames.com"*/
};



window.RewardedVideoConfig = {
	AdTech: {
		adtechZones: {
			mobile: "4103", //test id
			desktop: "4102" //test id
		}
	},
	HyperMx: {
		descriptor: {
			frameClass: "adFrame",
			adClass: "hypermx",
			width: 800,
			height: 540
		},
		distId: "80801205", //test id
		siteId: "coolgames"
	}
}

