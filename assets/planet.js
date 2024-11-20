export default {
	base: require("./planet/planet-bg.png"), // Faceless planet
	faces: {
		angry: require("./planet/face-angry.png"),
		happy: require("./planet/face-happy.png"),
		sad: require("./planet/face-sad.png"),
		neutral: require("./planet/face-neutral.png"),
	},
};

/*

Steps to get these images easily:

1) Import the images into a variable
> import PlanetImages from "@/assets/planet"

2) Use the images from the object that you get
> <Image source={PlanetImages.base} />
> <Image source={PlanetImages.faces.angry} />
> etc...

*/
