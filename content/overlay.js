window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    authdismiss.init();
},false);

Components.utils.import("resource://gre/modules/Services.jsm");

var authdismiss = {
  init: function() {
    gBrowser.selectedBrowser.addEventListener("DOMWillOpenModalDialog", function (e)
	Services.obs.addObserver(function observer (subject, topic, data) {
		// hacky way to get dialog chrome window,
		// subject and data are both null here
		let window = Services.wm.getMostRecentWindow(null)
		  , document = window.document.documentElement
		  , button = document.getButton("cancel");
		if (button) {
			// we now sure that we got kind of dialog
			button.doCommand();
			Services.obs.removeObserver(observer, "xul-window-visible");
		}
	}, "xul-window-visible", false)
, true);
  }
};