/**
 * ====================================================================
 * Hachiware_fs
 * 
 * An extended wrapper package for the file operation package "fs".
 * A package for getting file / directory information and copying / deleting in a deep hierarchy.
 * 
 * License : MIT License. 
 * Since   : 2021.12.21
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_fs
 * npm     : https://www.npmjs.com/package/hachiware_fs
 * 
 * ====================================================================
 */

var fs = require("fs");

/**
 * deepReadDir
 * @param {*} path 
 * @returns 
 */
fs.deepReadDir = function(path){

	var response = {
		file:[],
		dir:[],
	};

	var dirs = fs.readdirSync(path);

	for(var n = 0 ; n < dirs.length ; n++){
		var d_ = path + "/" + dirs[n];

		if(fs.statSync(d_).isFile()){
			response.file.push(d_);
		}
		else{
			response.dir.push(d_);

			var buff = this.deepReadDir(d_);

			for(var n2 = 0 ; n2 < buff.dir.length ; n2++){
				var d2_ = buff.dir[n2];
				response.dir.push(d2_);
			}
			for(var n2 = 0 ; n2 < buff.file.length ; n2++){
				var d2_ = buff.file[n2];
				response.file.push(d2_);
			}
		}
	}

	return response;
};

/**
 * deepCopy
 * @param {*} basePath 
 * @param {*} copyPath 
 * @param {*} option 
 */
fs.deepCopy = function(basePath, copyPath, option){

	if(!option){
		option = {};
	}

	var baseData = this.deepReadDir(basePath);

	if(!option.noMkdir){
		this.mkdirSync(copyPath);
		if(option.callbackMkdir){
			option.callbackMkdir(copyPath);
		}	
	}

	for(var n = 0 ; n < baseData.dir.length ; n++){
		var d_ = baseData.dir[n];
		var cpd_ = copyPath + "/" + d_.replace(basePath + "/","");
		this.mkdirSync(cpd_);
		if(option.callbackMkdir){
			option.callbackMkdir(cpd_);
		}
	}

	for(var n = 0 ; n < baseData.file.length ; n++){
		var f_ = baseData.file[n];
		var cpf_ = copyPath + "/" + f_.replace(basePath + "/","");
		this.copyFileSync(f_, cpf_);
		if(option.callbackCopyFile){
			option.callbackCopyFile(f_, cpf_);
		}
	}
};

/**
 * deepDelete
 * @param {*} deletePath 
 * @param {*} option 
 */
fs.deepDelete = function(deletePath, option){

	if(!option){
		option = {};
	}

	var baseData = this.deepReadDir(deletePath);

	baseData.dir.reverse();

	for(var n = 0 ; n < baseData.file.length ; n++){
		var f_ = baseData.file[n];
		this.unlinkSync(f_);

		if(option.callbackUnlink){
			option.callbackUnlink(f_);
		}
	}

	for(var n = 0 ; n < baseData.dir.length ; n++){
		var d_ = baseData.dir[n];
		this.rmdirSync(d_);

		if(option.callbackRmdir){
			option.callbackRmdir(d_);
		}
	}

	if(!option.noRmdir){
		this.rmdirSync(deletePath);
		if(option.callbackRmdir){
			option.callbackRmdir(deletePath);
		}
	}
	
};
module.exports = fs;
