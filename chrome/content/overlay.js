var AUTOAUTH = {
	strings : {
		_backup : null,
		_main : null,

		initStrings : function () {
			if (!this._backup) { this._backup = document.getElementById("autoauth-backup-bundle"); }
			if (!this._main) { this._main = document.getElementById("autoauth-bundle"); }
		},

		getString : function (key) {
			this.initStrings();

			var rv = "";

			try {
				rv = this._main.getString(key);
			} catch (e) {
			}

			if (!rv) {
				try {
					rv = this._backup.getString(key);
				} catch (e) {
				}
			}

			return rv;
		},

		getFormattedString : function (key, args) {
			this.initStrings();

			var rv = "";

			try {
				rv = this._main.getFormattedString(key, args);
			} catch (e) {
			}

			if (!rv) {
				try {
					rv = this._backup.getFormattedString(key, args);
				} catch (e) {
				}
			}

			return rv;
		}
	},
	
	prefs : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.autoAuth."),

	load : function () {
		//setInterval(clearPopup(), 1000);
		alert('test3');

		var browser = document.querySelector("iframe[mozbrowser]");

		browser.addEventListener("mozbrowsershowmodalprompt", function( event ) {
		  console.log("Asking for prompt:" + JSON.stringify(event.detail));
		  alert('test');
		});

		browser.addEventListener("DOMWillOpenModalDialog", function( event ) {
		  console.log("Asking for prompt:" + JSON.stringify(event.type));
		  alert('test2');
		});
	}
};

function clearPopup () {
		alert('loaded');
		removeEventListener("load", AUTOAUTH.load, false);
		
		try {
			var args = window.arguments[0].QueryInterface(Ci.nsIWritablePropertyBag2).QueryInterface(Ci.nsIWritablePropertyBag);
			var authKey = args.getProperty("text");
			
			if (args.getProperty("promptType") != "promptUserAndPass") {
				return;
			}
		} catch (e) {
			// Firefox < 4
			var args = window.arguments[0].QueryInterface(Ci.nsIDialogParamBlock);
			var authKey = args.GetString(0);
						
			if (args.GetInt(3) != 2 || args.GetInt(4) == 1) {
				return;
			}
		}
		
		if ((document.getElementById("loginTextbox").getAttribute("value") != '') && (document.getElementById("password1Textbox").getAttribute("value") != '')){			
			if (typeof commonDialogOnAccept != 'undefined') {
				commonDialogOnAccept();
			}
			else {
				document.getElementById("commonDialog").acceptDialog();
			}
			
			window.close();
		}
	}