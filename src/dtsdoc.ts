/// <reference path="jquery.d.ts" />
/// <reference path="../Parsect/src/parsect.ts" />
/// <reference path="../Parsect/src/globals.ts" />
/// <reference path="../Parsect/src/type.ts" />
/// <reference path="../Parsect/src/parser.ts" />

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
		var result = DTSDoc.program.parse(new Source(sourceCode, 0));
		if(result.success){
			docs.append("<p>Parsing finished</p><p>Document generating...</p>");
			var global:DTSDoc.ASTModule = result.value;
			var members = global.members;
			documentContent = $('<div/>');

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

			docs.children().remove();
			docs.append(documentContent);

			var source = encodeURIComponent(documentContent.html());
			source = "<body>" + source;
			source = '<html><head><meta charset="utf-8"><style>' + cssText + '</style></head>' + source + "</html>";
			$('#downloadLink').attr('href', "data:text/html," + source);
		}else{
			var pos = result.source.getPosition();
			docs.append("<p>Parsing failed at line " + pos.line + ", column " + pos.column + ": \"" + result.source.source.slice(result.source.position, result.source.position + 128) +  "\"</p>");
		}
	}, 1);
}

genButton.click(()=>{
	generateDocuments();
});


$.ajax("style.css", {
	contentType: "text/plain",
	dataType: "text",
	success: (data)=>{
		cssText = data;
	}
});

//var sample = "sample.d.ts";
var sample = "../three.d.ts/three.d.ts";
$.ajax(sample, {
	contentType: "text/plain",
	dataType: "text",
	success: (data)=>{
		textarea.val(data);
		generateDocuments();
	}
});

function generateHierarchy(global:DTSDoc.ASTModule):JQuery{
	var section = $('<section/>');

	return section;
}