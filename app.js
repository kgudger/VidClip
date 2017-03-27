function sendData() {
	var fpath = document.getElementById("file-in");
	var outp = document.getElementById("file-out");
	fpath = fpath.files[0] ;
	if ( ( typeof fpath === 'undefined' ) ||
		 ( fpath.path === "" ) ) {
		alert("Inputfile is not defined");
		return;
	}
	if ( outp.value === "" ) {
		alert("Outputfile must be defined.");
		return;
	}
	fpath = fpath.path ;
	outp  = outp.value ;
	var exec = require('child_process').exec;
	var stime = document.getElementById("start-in").value ;
	var etime = document.getElementById("end-in").value;
	if ( etime == "Other" ) 
		etime = document.getElementById("otime2").value;
	var txt = '-i "' + fpath + '" -acodec copy -vcodec copy ' 
	txt += "-ss " + stime + " -t " + etime + ' "' + outp + '"' ;
	exec('ffmpeg ' + txt, function(error, stdout, stderr) {
		var ffout = document.getElementById("ffoutput");
		ffout.innerHTML = "stdout: " + stdout;
		ffout.innerHTML += "<br>stderr: " + stderr;
		if (error !== null) {
			console.log('exec error: ' + error);
			alert("Fail - check log");
		}
		else {
			console.log('success');
			alert("Success!");
		}
	});
//	var ffmpeg = spawn('ffmpeg', [txt]);
}

function inFile(){
    var x = document.getElementById("file-in");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ".</strong> ";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "input: " + file.name ;
                }
                if ('size' in file) {
                    txt += "; size: " + file.size + " bytes <br>";
                }
            }
        }
    } 
    else {
        if (x.value != "") {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("demo").innerHTML = txt;
}

function startdisp() {
	var txt = document.getElementById("start-in").value ;
	txt = "Start at " + txt + " seconds" ;
    document.getElementById("starttime").innerHTML = txt;
}

function endTime() {
	var et = document.getElementById("end-in") ;
	if ( et.value == "Other" ) {
		var ot = document.getElementById("otherTime") ;
		var otime = document.createElement("input");
		otime.setAttribute("id", "otime2");
		otime.setAttribute("onchange", "enddisp()");
		ot.appendChild(otime);
	} else {
		var outid = document.getElementById('otime2');
		if ( outid )
			outid.parentNode.removeChild(outid);
		outid = document.getElementById('etime')
		if ( outid )
			outid.innerHTML = "";
	}
}	

function enddisp() {
	if ( txt = document.getElementById("otime2") ) {
		var ttxt = txt.value ;
		ttxt = "Ends after " + ttxt ;
		document.getElementById("etime").innerHTML = ttxt;
	}
}

function outFile() {
	var of = document.getElementById("file-out")
	var ofo = document.getElementById("ofilename")
	ofo.innerHTML = "Output File is " + of.value ;
}
