/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../Parsect/src/parsect.ts" />
/// <reference path="../Parsect/src/globals.ts" />
/// <reference path="../Parsect/src/type.ts" />
/// <reference path="../Parsect/src/parser.ts" />

var fileInput  = <JQuery>$("#input_file"); 
var openButton = <JQuery>$("#button_open"); 
var genButton = <JQuery>$("#gen");
var textarea  = <JQuery>$("#source");
var docs      = <JQuery>$("#docs");

textarea.val("");

var documentContent:JQuery;
var cssText:string;

function generateDocuments(){
	docs.children().remove();
	docs.append("<p>Parsing...</p>");
	
	setTimeout(()=>{
		var sourceCode = textarea.val();
		var result = DTSDoc.pProgram.parse(new Source(sourceCode, 0));
		if(result.success){
			docs.append("<p>Parsing finished</p><p>Document generating...</p>");
			var program:DTSDoc.ASTProgram = result.value;
			var global:DTSDoc.ASTModule = program.global;
			var members = global.members;
			documentContent = $('<div/>');

			if(program.docs){
				documentContent.append($('<p>').html(program.docs.text));
			}

			documentContent.append($('<h2>Contents</h2>'));
			documentContent.append($('<ul class="contents"><li><a href="#members">Members</a></li><li><a href="#hierarchy">Class Hierarchy</a></li></ul>'));

			documentContent.append('<a name="members" />');
			documentContent.append('<h2>Members</h2>');		
			documentContent.append(members.map((m)=>m.toHTML()));

			documentContent.append($('<hr/>'));

			documentContent.append('<a name="hierarchy" />');
			documentContent.append('<h2>Class Hierarchy</h2>');
			documentContent.append(global.toHierarchyHTML());

			documentContent.append($('<hr/>'));

			documentContent.append($('<footer>Generated by <a href="https://github.com/kontan/dtsdoc">DTSDoc</a></footer>'));		

			var headerHTML = [
'<html>',
	'<head>',
		'<meta charset="utf-8">',
		'<style type="text/css">',
			cssText,
		'</style>',
		'<link rel="STYLESHEET" href="style.css" type="text/css"></link>',
	'</head>',
	'<body>'
].join('');
			var footerHTML = '</body></html>';

			docs.children().remove();
			docs.append(documentContent);


			//$('#downloadLink').attr('href', "data:text/html," + source);

			var _Blob:any = Blob;
			var requestFileSystem:any = window.requestFileSystem || window.webkitRequestFileSystem;
			
			var downloadBlob = new _Blob([headerHTML + documentContent.html() + footerHTML], { "type" : "text/html" });

			var tempFileName = "docs.html";

			
			requestFileSystem(window.TEMPORARY, downloadBlob.size, (fileSystem:FileSystem)=>{
				
				function createTempFile(){
					fileSystem.root.getFile(tempFileName, {create: true}, (fileEntry:FileEntry)=>{
						fileEntry.createWriter((fileWriter)=>{
		                    fileWriter.addEventListener('writeend', (e)=>{
		                    	$('#downloadLink').attr('href', fileEntry.toURL());
		                    });
		                    fileWriter.write(downloadBlob);
		                });
		            }, (error)=>{
		                throw error;
		            });
				}

				// 非同期処理の不具合？
				// 同じファイルを一時ファイルにするためにはファイルのサイズを調整しなければならないけど、
				// truncate の直後に write するとエラーになる。
				// (なぜかデバッガで一度止めるとエラーにならない。)
				// やむを得ないのでいったんファイルを消去して　ファイルを作り直す
				fileSystem.root.getFile(tempFileName, {}, (fileEntry:FileEntry)=>{
					fileEntry.remove(createTempFile);
				}, createTempFile);

			});


			//console.log(generateTypeList('lib.d.ts.html', global));
		}else{
			var pos = result.source.getPosition();
			var line = pos.line;
			var column = pos.column;
			var source = result.source.source.slice(result.source.position, result.source.position + 128);
			var err = result.errorMesssage;
			docs.append("<p>Parsing failed at line " + line + ", column " + column + ": \"" + source +  "\", " + err + "</p>");
		}
	}, 1);
}

genButton.click(()=>{
	generateDocuments();
});

fileInput.change(()=>{
	var input:HTMLInputElement = <HTMLInputElement>fileInput[0];
	var files = input.files;
	var reader:FileReader = new FileReader();
	reader.addEventListener('load', (e)=>{
		textarea.val(reader.result);
		generateDocuments();
	});
	reader.readAsText(files[0]);
});

openButton.click(()=>{
	fileInput.val(undefined);
	fileInput.trigger('click');
});


$.ajax("style.css", {
	contentType: "text/plain",
	dataType: "text",
	success: (data)=>{
		cssText = data;
	}
});

function loadSourceFile(url:string):void{
	$.ajax(url, {
		contentType: "text/plain",
		dataType: "text",
		success: (data)=>{
			textarea.val(data);
			generateDocuments();
		}
	});	
}


function generateHierarchy(global:DTSDoc.ASTModule):JQuery{
	var section = $('<section/>');

	return section;
}

interface TypeList{
	[name:string]:string;
}



function generateTypeList(path:string, global:DTSDoc.ASTModule):string{
	var list:TypeList = {};

	function generateTypeListFromModule(m:DTSDoc.ASTModule){
		list[m.name] = path + "#" + m.name;
		m.members.forEach(m=>{
			if(m instanceof DTSDoc.ASTInterface){
				list[m.name] = path + "#" + m.name;
			}else if(m instanceof DTSDoc.ASTClass){
				list[m.name] = path + "#" + m.name;
			}else if(m instanceof DTSDoc.ASTEnum){
				list[m.name] = path + "#" + m.name;
			}else if(m instanceof DTSDoc.ASTModule){
				generateTypeListFromModule(<DTSDoc.ASTModule>m);
			}
		});	
	}

	generateTypeListFromModule(global);

	return JSON.stringify(list);
}


// For testing
//loadSourceFile("../../three.d.ts/three.d.ts");
loadSourceFile("sample.d.ts");
