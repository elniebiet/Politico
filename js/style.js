window.onload = function(){
	const nav = document.getElementById("headernav");
	const toggle = document.querySelector('.toggle-menu'); 
	//nav.style.display = "none";

	toggle.addEventListener("click", () => {
		console.log("clicked");
		if(nav.style.display == "none")
			nav.style.display = "block";
		else 
			nav.style.display = "none";
	});

	
}