import got from 'got';
import fs from 'fs';
import path from 'path';

let res = {
	mm_bg: "res/MainMenu/background.jpg",
	mm_title: "res/MainMenu/title.png",
	mm_role_0_png: "res/MainMenu/role_0.png",
	mm_role_1_png: "res/MainMenu/role_1.png",
	mm_role_2_png: "res/MainMenu/role_2.png",
	mm_role_0_plist: "res/MainMenu/role_0.plist",
	mm_role_1_plist: "res/MainMenu/role_1.plist",
	mm_role_2_plist: "res/MainMenu/role_2.plist",

	gp_sky_0: "res/GamePlay/sky/t_1.jpg",
	gp_sky_1: "res/GamePlay/sky/t_2.jpg",
	gp_sky_2: "res/GamePlay/sky/t_3.jpg",
	gp_sky_3: "res/GamePlay/sky/t_4.jpg",
	gp_sky_4: "res/GamePlay/sky/t_5.jpg",
	gp_ground_0: "res/GamePlay/ground/d_1.png",
	gp_ground_1: "res/GamePlay/ground/d_2.png",
	gp_main_0_png: "res/GamePlay/main_0.png",
	gp_main_1_png: "res/GamePlay/main_1.png",
	gp_main_2_png: "res/GamePlay/main_2.png",
	gp_main_0_plist: "res/GamePlay/main_0.plist",
	gp_main_1_plist: "res/GamePlay/main_1.plist",
	gp_main_2_plist: "res/GamePlay/main_2.plist"
};


const domain = 'http://www.22dm.com/act/h5/city/';
const localPath = './src/res_dl/';

let a = [];
Object.keys(res).forEach((element, index) => {
	a.push(res[element]);
});


console.log(a);
// let a = fs.readFileSync(path.join(localPath, 'project.json'));
// a = JSON.parse(a);
// a = a.jsList;
// console.log(a);

a.forEach((element, index) => {
	try {
		let path = domain + element;
		console.log(path);
		got.stream(path).pipe(fs.createWriteStream(localPath + element));
	} catch (error) {
		console.log(error);
	}
});